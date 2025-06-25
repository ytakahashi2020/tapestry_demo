import { SocialFi } from 'socialfi'

const TAPESTRY_API_KEY = process.env.TAPESTRY_API_KEY

if (!TAPESTRY_API_KEY) {
  throw new Error('TAPESTRY_API_KEY is not set')
}

// Use default baseURL for Tapestry API
export const socialfi = new SocialFi()
