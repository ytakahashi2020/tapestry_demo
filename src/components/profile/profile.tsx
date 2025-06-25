'use client'

import { Card } from '@/components/common/card'
import { CopyPaste } from '@/components/common/copy-paste'
import { FollowButton } from '@/components/profile/follow-button'
import { useGetProfileInfo } from '@/components/profile/hooks/use-get-profile-info'
import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  username: string
}

export function Profile({ username }: Props) {
  const { data, error } = useGetProfileInfo({ username })

  // Don't render if profile not found
  if (error === 'Profile not found') {
    return null
  }

  return (
    <Link href={`/${username}`}>
      <Card className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white via-pink-50 to-purple-50 border-2 border-pink-200 rounded-2xl">
        <div className="flex justify-between items-center p-2">
          <div className="flex flex-col justify-center space-y-2 w-full h-full">
            <div className="flex items-end space-x-4">
              {data?.profile?.image ? (
                <div>
                  <Image
                    src={data.profile.image}
                    width={40}
                    height={40}
                    alt="avatar"
                    className="object-cover rounded-full"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="h-10 w-10 bg-muted-light rounded-full flex items-center justify-center">
                  <User />
                </div>
              )}
              <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
                🎆 {username || 'Unknown User'}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray">{data?.walletAddress}</p>
              {data?.walletAddress && (
                <div onClick={(e) => e.stopPropagation()}>
                  <CopyPaste content={data?.walletAddress} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="bg-pink-100 px-3 py-1 rounded-full text-pink-700 font-semibold">
                👥 {data?.socialCounts.followers} followers
              </span>
              <span className="bg-purple-100 px-3 py-1 rounded-full text-purple-700 font-semibold">
                🔗 {data?.socialCounts.following} following
              </span>
            </div>
            <div className="mt-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-3">
              <p className="text-gray-700 italic">&quot;💬 {data?.profile?.bio || 'No bio yet... 🤔'}&quot;</p>
            </div>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <FollowButton username={username} />
          </div>
        </div>
      </Card>
    </Link>
  )
}
