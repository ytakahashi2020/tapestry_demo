import { socialfi } from '@/utils/socialfi'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const walletAddress = searchParams.get('walletAddress')

  if (!walletAddress) {
    return NextResponse.json(
      { error: 'Owner wallet address is required' },
      { status: 400 },
    )
  }

  try {
    const response = await socialfi.profiles.suggestedDetail({
      apiKey: process.env.TAPESTRY_API_KEY || '',
      identifier: walletAddress,
    })

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Error fetching suggested profiles:', error)
    // Return empty array for 404 errors (no profiles yet)
    if (error.status === 404 || error.response?.status === 404) {
      return NextResponse.json([])
    }
    return NextResponse.json(
      { error: error.message || 'Failed to fetch suggested profiles' },
      { status: 500 },
    )
  }
}
