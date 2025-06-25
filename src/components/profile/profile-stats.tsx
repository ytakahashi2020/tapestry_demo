'use client'

import { Card } from '@/components/common/card'
import { Heart, Users, MessageCircle } from 'lucide-react'

interface ProfileStatsProps {
  totalLikes?: number
  totalComments?: number
  followers?: number
}

export function ProfileStats({ 
  totalLikes = 0, 
  totalComments = 0, 
  followers = 0 
}: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <Card className="p-4 text-center">
        <div className="flex flex-col items-center space-y-2">
          <Heart className="text-accent" size={20} />
          <p className="text-2xl font-semibold">{totalLikes}</p>
          <p className="text-sm text-gray">Likes</p>
        </div>
      </Card>
      
      <Card className="p-4 text-center">
        <div className="flex flex-col items-center space-y-2">
          <MessageCircle className="text-accent" size={20} />
          <p className="text-2xl font-semibold">{totalComments}</p>
          <p className="text-sm text-gray">Comments</p>
        </div>
      </Card>
      
      <Card className="p-4 text-center">
        <div className="flex flex-col items-center space-y-2">
          <Users className="text-accent" size={20} />
          <p className="text-2xl font-semibold">{followers}</p>
          <p className="text-sm text-gray">Followers</p>
        </div>
      </Card>
    </div>
  )
}