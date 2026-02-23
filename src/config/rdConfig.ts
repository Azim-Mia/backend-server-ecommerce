import { Redis } from 'ioredis';
const redis = new Redis({
    port: 18220,
   host: 'redis-18220.c9.us-east-1-2.ec2.cloud.redislabs.com',
password: '7CWoSoDChpau6AadRInAt23iSzA1IDdo',
  username: "default",
  db: 0, // Defaults to 0
});
redis.on('error', err => console.log('Redis Client Error', err));

export default redis;