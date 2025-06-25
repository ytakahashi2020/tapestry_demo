'use client'

import { usePrivy } from '@privy-io/react-auth'
import { Card } from '@/components/common/card'
import { Button } from '@/components/common/button'
import { useState, useEffect } from 'react'

export function PrivyDebug() {
  const { ready, authenticated, user, login, logout } = usePrivy()
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogin = async () => {
    try {
      setLoginError(null)
      await login({
        loginMethods: ['wallet'],
        walletChainType: 'solana-only',
      })
    } catch (error: any) {
      console.error('Login error:', error)
      setLoginError(error.message || 'Login failed')
    }
  }

  return (
    <Card className="mb-6 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-full">
          <span className="text-2xl">🔧</span>
        </div>
        <h3 className="text-xl font-bold text-blue-800">認証ステータス</h3>
      </div>
      
      <div className="flex justify-center gap-6 mb-6">
        <div className="bg-white/70 px-6 py-4 rounded-xl border border-blue-100 flex items-center gap-3">
          <span className="text-2xl">{ready ? '✅' : '❌'}</span>
          <div>
            <span className="font-semibold text-gray-700">Ready</span>
            <p className="text-sm text-gray-600">システム準備状態</p>
          </div>
        </div>
        
        <div className="bg-white/70 px-6 py-4 rounded-xl border border-blue-100 flex items-center gap-3">
          <span className="text-2xl">{authenticated ? '✅' : '❌'}</span>
          <div>
            <span className="font-semibold text-gray-700">認証</span>
            <p className="text-sm text-gray-600">ログイン状態</p>
          </div>
        </div>
      </div>

      {authenticated && user && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">👤</span>
            <span className="font-semibold text-green-800">ユーザー情報</span>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium text-gray-700">User ID:</span> <span className="text-gray-600">{user.id}</span></p>
            <p><span className="font-medium text-gray-700">Environment:</span> <span className="text-gray-600">{process.env.NODE_ENV}</span></p>
            {isClient && (
              <p><span className="font-medium text-gray-700">Host:</span> <span className="text-gray-600">{window.location.host}</span></p>
            )}
          </div>
        </div>
      )}

      {loginError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <span className="font-semibold">エラー:</span> {loginError}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        {!authenticated ? (
          <Button onClick={handleLogin} variant="primary" className="px-8 py-3 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg">
            🔗 ウォレット接続
          </Button>
        ) : (
          <Button onClick={logout} variant="secondary" className="px-8 py-3 text-lg bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white rounded-full shadow-lg">
            🚪 ログアウト
          </Button>
        )}
      </div>
    </Card>
  )
}