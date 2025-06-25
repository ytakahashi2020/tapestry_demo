import { ProfilesList } from '@/components/profile/profile-list'
import { FeaturedProfiles } from '@/components/home/featured-profiles'
import { CreateTestUsersButton } from '@/components/test/create-test-users-button'
import { PrivyDebug } from '@/components/debug/privy-debug'

export default async function Home() {

  return (
    <div className="flex flex-col space-y-6">
      <div className="text-center py-8 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-3xl text-white">
        <h1 className="text-4xl font-bold mb-4">🌟 Welcome to Tapestry Social! 🌟</h1>
        <p className="text-lg opacity-90">Connect, share, and discover amazing people in the Web3 world!</p>
      </div>
      
      <PrivyDebug />
      <CreateTestUsersButton />
      <FeaturedProfiles />
      
      <div className="w-full">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-pink-300 to-purple-300 rounded-full px-8 py-3">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              👥 All Friends
            </h2>
          </div>
        </div>
        <ProfilesList />
      </div>
    </div>
  )
}
