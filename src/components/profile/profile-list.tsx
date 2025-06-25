'use client'

import { LoadCircle } from '@/components/common/load-circle'
import { useGetProfilesList } from '@/components/profile/hooks/use-get-profiles-list'
import { Profile } from '@/components/profile/profile'

export function ProfilesList() {
  const { data: profiles, loading } = useGetProfilesList()

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <LoadCircle />
      </div>
    )
  }

  if (!profiles || profiles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray">プロフィールが見つかりませんでした</p>
      </div>
    )
  }

  return (
    <div>
      {profiles.map((elem, index) => {
        // Skip profiles with invalid usernames
        if (!elem.profile.username || elem.profile.username.includes('username_here')) {
          return null
        }
        return (
          <div className="mb-4" key={elem.profile.username + index.toString()}>
            <Profile username={elem.profile.username} />
          </div>
        )
      }).filter(Boolean)}
    </div>
  )
}
