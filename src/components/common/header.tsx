'use client'

import { Button } from '@/components/common/button'
import { abbreviateWalletAddress } from '@/components/common/tools'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import {
  Check,
  Clipboard,
  HandCoins,
  House,
  LogOut,
  Menu,
  User,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useCurrentWallet } from '../auth/hooks/use-current-wallet'
import { useGetProfiles } from '../auth/hooks/use-get-profiles'
import { CreateProfileContainer } from '../create-profile/create-profile-container'
import { DialectNotificationComponent } from '../notifications/dialect-notifications-component'

export function Header() {
  const { walletAddress } = useCurrentWallet()
  const [mainUsername, setMainUsername] = useState<string | null>(null)
  const [isProfileCreated, setIsProfileCreated] = useState<boolean>(false)
  const [profileUsername, setProfileUsername] = useState<string | null>(null)
  const { profiles } = useGetProfiles({
    walletAddress: walletAddress || '',
  })
  const { ready, authenticated, logout } = usePrivy()
  const { login } = useLogin()
  const disableLogin = !ready || (ready && authenticated)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const dropdownRef = useRef(null)
  const router = useRouter()

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        (dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        return
      }
      setIsDropdownOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (profiles && profiles.length) {
      setMainUsername(profiles[0].profile.username)
    }

    if (isProfileCreated && profileUsername) {
      setMainUsername(profileUsername)
      setIsProfileCreated(false)
      setProfileUsername(null)
    }
  }, [profiles, isProfileCreated, profileUsername])

  return (
    <>
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="hover:scale-105 transition-transform">
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              🌈 Tapestry Social 🚀
            </h1>
          </Link>

          <div className="flex items-center space-x-6">
            {ready && authenticated ? (
              mainUsername ? (
                <div className="flex items-center relative" ref={dropdownRef}>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="space-x-2"
                    >
                      <p className="truncate font-bold">{mainUsername}</p>
                      <Menu size={20} />
                    </Button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-2xl overflow-hidden z-50 border-2 border-pink-200">
                        <div className="border-b border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50">
                          <Button
                            variant="ghost"
                            className="px-4 py-2 hover:bg-pink-100 w-full text-gray-700"
                            onClick={() => walletAddress && handleCopy(walletAddress)}
                          >
                            {copied ? (
                              <Check size={16} className="mr-2" />
                            ) : (
                              <Clipboard size={16} className="mr-2" />
                            )}
                            {abbreviateWalletAddress({
                              address: walletAddress || '',
                            })}
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            router.push('/')
                            setIsDropdownOpen(false)
                          }}
                          className="px-4 py-2 hover:bg-pink-100 w-full text-gray-700"
                        >
                          <House size={16} className="mr-2" /> 🏠 Home
                        </Button>

                        <Button
                          variant="ghost"
                          onClick={() => {
                            router.push(`/${mainUsername}`)
                            setIsDropdownOpen(false)
                          }}
                          className="px-4 py-2 hover:bg-pink-100 w-full text-gray-700"
                        >
                          <User size={16} className="mr-2" /> 👤 My Profile
                        </Button>

                        <Button
                          variant="ghost"
                          onClick={() => {
                            router.push('/token')
                            setIsDropdownOpen(false)
                          }}
                          className="px-4 py-2 hover:bg-pink-100 w-full text-gray-700"
                        >
                          <HandCoins size={16} className="mr-2" /> 💰 Tokens
                        </Button>

                        <Button
                          variant="ghost"
                          className="px-4 py-2 hover:bg-red-100 w-full !text-red-500"
                          onClick={logout}
                        >
                          <LogOut size={16} className="mr-2" /> 🚪 Logout
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <CreateProfileContainer
                  setIsProfileCreated={setIsProfileCreated}
                  setProfileUsername={setProfileUsername}
                />
              )
            ) : (
              <Button
                variant="primary"
                disabled={disableLogin}
                onClick={() =>
                  login()
                }
                className="text-white font-bold"
              >
                🔗 Login
              </Button>
            )}
            <div className="flex items-center gap-2">
              <DialectNotificationComponent />
              <Link
                href="https://github.com/Primitives-xyz/tapestry-template"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 flex items-center"
              >
                <Image
                  width={20}
                  height={20}
                  alt="Github link"
                  src="/logos/github-mark.svg"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
