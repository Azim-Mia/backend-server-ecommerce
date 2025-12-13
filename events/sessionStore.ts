import { Redis } from 'ioredis';
import clearCard from "../servises/clearCard"
const redis = new Redis({
   port: 18239,
   host: 'redis-18239.crce220.us-east-1-4.ec2.cloud.redislabs.com',
password: 'FUUWA6JWHzU5jFL9GAekM2JR0wWfKsvg',
  username: "default",
  db: 0, // Defaults to 0
});
const CHENAL_KEY ='__keyevent@0__:expired';
redis.config('SET', 'notify-keyspace-events','Ex');
redis.subscribe(CHENAL_KEY);
redis.on('message', async(ch, message)=>{
  if(ch == CHENAL_KEY){
    console.log('expired key : ' + message);
  const cardKey = message.split(":").pop();
  if(!cardKey) return;
  clearCard(cardKey);
  }
})
/*this file use root file app */