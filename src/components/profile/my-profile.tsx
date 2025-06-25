'use client'

import { Card } from '@/components/common/card'
import { CopyPaste } from '@/components/common/copy-paste'
import { Bio } from '@/components/profile/bio'
import { useGetProfileInfo } from '@/components/profile/hooks/use-get-profile-info'
import { FollowButton } from '@/components/profile/follow-button'
import { User } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

interface Props {
  username: string
}

export function MyProfile({ username }: Props) {
  const { data, refetch } = useGetProfileInfo({ username })

  // Auto-refresh profile data and listen for profile updates
  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 10000)
    
    const handleProfileUpdate = (event: CustomEvent) => {
      if (event.detail.username === username) {
        refetch()
      }
    }
    
    window.addEventListener('profileUpdate', handleProfileUpdate as EventListener)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('profileUpdate', handleProfileUpdate as EventListener)
    }
  }, [refetch, username])

  return (
    <Card>
      <div className="flex justify-between items-center">
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
            <h2 className="w-full font-bold text-xl">{username}</h2>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray">{data?.walletAddress}</p>
            {data?.walletAddress && <CopyPaste content={data?.walletAddress} />}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">
              <span className="font-semibold">{data?.socialCounts.followers || 0}</span>{' '}
              <span className="text-gray">followers</span> ·{' '}
              <span className="font-semibold">{data?.socialCounts.following || 0}</span>{' '}
              <span className="text-gray">following</span>
            </p>
            <FollowButton username={username} />
          </div>
          <Bio username={username} data={data} refetch={refetch} />
        </div>
      </div>
    </Card>
  )
}
