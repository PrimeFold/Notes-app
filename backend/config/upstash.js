import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from 'dotenv'

dotenv.config()

//creates a rate limiter , allows 10 requests per 20 seconds 
const rateLimit = new Ratelimit({

    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5,"10 s")
})

export default rateLimit;