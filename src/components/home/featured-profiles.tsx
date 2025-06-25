'use client'

import { Card } from '@/components/common/card'
import { useSuggestedGlobal } from '@/components/suggested-and-creators-invite/hooks/use-suggested-global'
import { useCurrentWallet } from '@/components/auth/hooks/use-current-wallet'
import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export function FeaturedProfiles() {
  const { walletAddress } = useCurrentWallet()
  const { profiles, getSuggestedGlobal } = useSuggestedGlobal()
  
  useEffect(() => {
    if (walletAddress) {
      getSuggestedGlobal(walletAddress)
    }
  }, [walletAddress, getSuggestedGlobal])
  
  const featuredProfiles = profiles?.slice(0, 3) || []

  if (featuredProfiles.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <div className="inline-block bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full px-8 py-3">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            ✨ Featured Friends ✨
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProfiles.map((profile) => (
          <Link key={profile.profile.username} href={`/${profile.profile.username}`}>
            <Card className="p-6 hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 border-yellow-200">
              <div className="flex flex-col items-center text-center space-y-4">
                {profile.profile.image ? (
                  <div className="relative">
                    <Image
                      src={profile.profile.image}
                      width={80}
                      height={80}
                      alt={profile.profile.username}
                      className="rounded-full border-4 border-yellow-300 shadow-lg"
                      unoptimized
                    />
                    <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                      🌟
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="h-20 w-20 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full flex items-center justify-center border-4 border-yellow-300 shadow-lg">
                      <User size={40} className="text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                      🌟
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-lg text-purple-700 flex items-center gap-1">
                    🎆 {profile.profile.username}
                  </h3>
                </div>
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-4 py-2">
                  <span className="text-sm font-bold text-purple-600">
                    ✨ Featured Friend
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}