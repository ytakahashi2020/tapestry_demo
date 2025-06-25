import { socialfi } from '@/utils/socialfi'
import { NextResponse } from 'next/server'

const TEST_USERS = [
  {
    walletAddress: '11111111111111111111111111111111',
    username: 'alice',
    bio: 'こんにちは！Aliceです。Web3の世界を探索中です。',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice'
  },
  {
    walletAddress: '22222222222222222222222222222222',
    username: 'bob',
    bio: 'Solanaエコシステムのファンです。DeFiとNFTに興味があります。',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob'
  },
  {
    walletAddress: '33333333333333333333333333333333',
    username: 'charlie',
    bio: '開発者です。分散型アプリケーションを作っています。',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie'
  },
  {
    walletAddress: '44444444444444444444444444444444',
    username: 'david',
    bio: 'NFTコレクターです。アートとテクノロジーの融合に興味があります。',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david'
  },
  {
    walletAddress: '55555555555555555555555555555555',
    username: 'emma',
    bio: 'DAOコミュニティマネージャー。Web3の未来を一緒に作りましょう！',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma'
  }
]

export async function POST() {
  const createdUsers = []
  const errors = []

  for (const user of TEST_USERS) {
    try {
      const profile = await socialfi.profiles.findOrCreateCreate(
        {
          apiKey: process.env.TAPESTRY_API_KEY || '',
        },
        {
          walletAddress: user.walletAddress,
          username: user.username,
          bio: user.bio,
          image: user.image,
          blockchain: 'SOLANA',
        },
      )
      createdUsers.push(profile)
      console.log(`Created test user: ${user.username}`)
    } catch (error: any) {
      console.error(`Error creating test user ${user.username}:`, error)
      errors.push({ username: user.username, error: error.message })
    }
  }

  return NextResponse.json({
    message: 'Test users creation completed',
    created: createdUsers.length,
    errors: errors,
    users: createdUsers
  })
}

export const dynamic = 'force-dynamic'