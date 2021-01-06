require("dotenv").config();
import express from "express";
import http from "http";
import socketIo from "socket.io";

import redis from "redis";
 
const client = redis.createClient();

import jwt from "jsonwebtoken";

import routes from "./routes";

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: "*" });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

async function socketMiddleware(socket, next) {
  const { type, name } = socket.handshake.query;
  const { token } = socket.handshake.auth;
  try {
    const { id, scopes } = jwt.verify(token, process.env.KEY_JWT);
    if (type === "controller") {
      console.log(`UM CONTROLE CONECTADO ${socket.id} ${id}`);
      socket.join(`control-${id}`);
    } else {
      if(scopes.includes('floow-connect')) {
        console.log(`UM SOM CONECTADO ${socket.id} ${id} (${name})`);
        socket.to(`control-${id}`).emit("new-device", { id: socket.id, name });
        socket.join(`sound-${id}`);
        client.get(id, (e,data) => {
          if(e) return;
          if(data !== null) {
            const dataArr = data !== null ? JSON.parse(data) : [];
            const format = JSON.stringify([...dataArr, { id: socket.id, name }]);
            client.set(id, format);
          } else {
            client.set(id, JSON.stringify([{ id: socket.id, name }]));
          }
        });
      } else {
        socket.disconnect();
      }
    }
    next();
  } catch (e) {
    socket.disconnect();
  }
}

io.use(socketMiddleware)
  .of("/")
  .on("connection", (socket) => {
    const { name, type } = socket.handshake.query;
    const { token } = socket.handshake.auth;
    const { id } = jwt.verify(token, process.env.KEY_JWT);
    socket.to(`sound-${id}`).on("disconnect", (_) => {
      socket
        .to(`control-${id}`)
        .broadcast.emit("device-disconnect", { id: socket.id, name });
    });
    socket.to(`control-${id}`).on("play", (data) => {
      socket.
            to(data.id)
            .broadcast.emit("play", { ...data, id: undefined });
    });
    socket.to(`control-${id}`).on("pp", (data) => {
      socket
        .to(data.id)
        .broadcast.emit("pp", { ...data, id: undefined, controlId: socket.id });
    });
    socket.to(`sound-${id}`).on("sync", (data) => {
      socket
        .to(data.control)
        .broadcast.emit("sync", { ...data, control: undefined });
    });
    socket.to(`sound-${id}`).on("waiting", (data) => {
      socket
        .to(data.control)
        .broadcast.emit("waiting", { ...data, control: undefined });
    });
    socket.to(`control-${id}`).on("seeking", (data) => {
      socket
        .to(data.id)
        .broadcast.emit("seeking", {
          ...data,
          id: undefined,
          controlId: socket.id,
        });
    });
    socket.to(`control-${id}`).on("volume", (data) => {
      socket.to(data.id).broadcast.emit("volume", { ...data, id: undefined });
    });
    socket.on("disconnect", _ => {
      console.log("SOM DISCONECTADO");
      client.get(id, (e,data) => {
        if(e) return;
        if(data !== null) {
          const dataArr = data !== null ? JSON.parse(data) : [];
          const format = JSON.stringify([...dataArr, { id: socket.id, name }]);
          let devices = [];
          dataArr.map(device => {
            if(socket.id !== device.id) {
              // client.set(id, [...devices]);
              devices.push(device);
            }
          })
          setTimeout(() => {
            client.set(id, JSON.stringify(devices));
          }, 400);
        }
      });
    });
  });

server.listen(3333, (_) => {
  console.log("SERVIDOR ABERTO");
});
