import redis from 'redis';
import { promisify } from 'util';
 
const client = redis.createClient();

client.on('error', err => {
  console.log(err);
})