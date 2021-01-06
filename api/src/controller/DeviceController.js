import redis from 'redis';
 
const client = redis.createClient();

client.on('error', err => {
  console.log(err);
})

import jsonwebtoken from 'jsonwebtoken';

export default class EpisodeController {
  async index(req,res) {
    const { token } = req.query;
    try {
      const { id } = await jsonwebtoken.decode(token);
      client.get(id, (e,data) => {
        if(e) return;
        return res.json(data ? JSON.parse(data) : {});
      })
    } catch (e) {
      return res.send({error: true});
    }
  }
}