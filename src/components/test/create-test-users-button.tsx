'use client'

import { Button } from '@/components/common/button'
import { useState } from 'react'
import { toast } from 'sonner'

export function CreateTestUsersButton() {
  const [loading, setLoading] = useState(false)

  const createTestUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test/create-users', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success(`テストユーザーを${data.created}人作成しました！`)
        // ページをリロードして新しいユーザーを表示
        setTimeout(() => window.location.reload(), 1000)
      } else {
        toast.error('テストユーザーの作成に失敗しました')
      }
    } catch (error) {
      console.error('Error creating test users:', error)
      toast.error('エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-6 p-6 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 rounded-3xl border-2 border-yellow-300">
      <h3 className="text-xl font-bold mb-3 text-purple-700 flex items-center gap-2">
        🧪 テスト環境 🎉
      </h3>
      <p className="text-sm text-gray-700 mb-4 bg-white/50 rounded-2xl p-3">
        👥 他のユーザーがいない場合、テストユーザーを作成できます！
      </p>
      <Button 
        onClick={createTestUsers} 
        disabled={loading}
        variant="primary"
        className="w-full"
      >
        {loading ? '🔄 テストユーザーを作成中...' : '🎆 テストユーザーを5人作成 🎆'}
      </Button>
    </div>
  )
}