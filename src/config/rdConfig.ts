import { Redis } from 'ioredis';
const redis = new Redis({
    port:19078,
   host: 'redis-19078.c81.us-east-1-2.ec2.cloud.redislabs.com',
password: 'N0MGMwNTgsoRP7SuOTWLBAKhEkmAmUVR',
  username: "default",
  db: 0, // Defaults to 0
});
redis.on('error', err => console.log('Redis Client Error', err));

export default redis;