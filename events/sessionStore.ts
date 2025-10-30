import { Redis } from 'ioredis';
import clearCard from "../servises/clearCard"
const redis = new Redis({
   port: 14702,
   host: 'redis-14702.c232.us-east-1-2.ec2.redns.redis-cloud.com',
password: 'hxEVPWvJIkIYl857JQgYlaUMhCR46b45',
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