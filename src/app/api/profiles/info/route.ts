import { socialfi } from '@/utils/socialfi'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    const response = await socialfi.profiles.profilesDetail({
      apiKey: process.env.TAPESTRY_API_KEY || '',
      id: username,
    })

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Error fetching profiles:', error)
    // Handle 404 errors (user not found) gracefully
    if (error.status === 404 || error.response?.status === 404) {
      return NextResponse.json(
        { error: 'Profile not found', notFound: true },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: error.message || 'Failed to fetch profiles' },
      { status: 500 },
    )
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const body = await req.json()

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    const response = await socialfi.profiles.profilesUpdate(
      {
        apiKey: process.env.TAPESTRY_API_KEY || '',
        id: username,
      },
      body,
    )

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update profile' },
      { status: 500 },
    )
  }
}
