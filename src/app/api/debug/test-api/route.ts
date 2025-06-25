import { socialfi } from '@/utils/socialfi'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Testing Tapestry API...')
    console.log('API Key:', process.env.TAPESTRY_API_KEY?.substring(0, 8) + '...')
    
    // Try a simple API call
    const response = await socialfi.profiles.profilesList({
      apiKey: process.env.TAPESTRY_API_KEY || '',
    })
    
    console.log('API Response:', response)
    
    return NextResponse.json({
      success: true,
      data: response,
      message: 'API call successful'
    })
  } catch (error: any) {
    console.error('API Error:', error)
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      response: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        baseURL: error.config?.baseURL
      }
    })
    
    return NextResponse.json({
      success: false,
      error: error.message,
      status: error.status,
      details: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL
      }
    })
  }
}

export const dynamic = 'force-dynamic'