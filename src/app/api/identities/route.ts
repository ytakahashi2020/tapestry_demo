import { socialfi } from '@/utils/socialfi'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const walletAddress = searchParams.get('walletAddress')

  try {
    const response = await socialfi.identities.identitiesDetail({
      id: walletAddress || '',
      apiKey: process.env.TAPESTRY_API_KEY || '',
    })

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Error fetching profiles:', error)
    // Return empty array for 404 errors (no profiles yet)
    if (error.status === 404 || error.response?.status === 404) {
      return NextResponse.json([])
    }
    return NextResponse.json(
      { error: error.message || 'Failed to fetch profiles' },
      { status: 500 },
    )
  }
}
