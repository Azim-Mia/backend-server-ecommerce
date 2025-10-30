import { Redis } from 'ioredis';
const redis = new Redis({
    port: 14702,
   host: 'redis-14702.c232.us-east-1-2.ec2.redns.redis-cloud.com',
password: 'hxEVPWvJIkIYl857JQgYlaUMhCR46b45',
  username: "default",
  db: 0, // Defaults to 0
});
redis.on('error', err => console.log('Redis Client Error', err));

export default redis;