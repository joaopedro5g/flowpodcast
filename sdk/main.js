const { app, BrowserWindow } = require('electron');

const path = require('path');

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      autoplayPolicy: false,
    }
  });
  window.loadFile(path.resolve(__dirname, 'src', 'index.html'));
}

app.on('ready', createWindow);