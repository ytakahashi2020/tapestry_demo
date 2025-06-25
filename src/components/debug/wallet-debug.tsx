'use client'

import { usePrivy, useWallets } from '@privy-io/react-auth'
import { Card } from '@/components/common/card'
import { Button } from '@/components/common/button'

export function WalletDebug() {
  const { ready, authenticated, user, login, logout } = usePrivy()
  const { wallets } = useWallets()

  if (!ready) {
    return (
      <Card>
        <p>🔄 Loading Privy...</p>
      </Card>
    )
  }

  return (
    <Card className="mb-4">
      <h3 className="text-lg font-bold mb-4">🔧 Wallet Debug Info</h3>
      
      <div className="space-y-2 mb-4 text-sm">
        <p><strong>Ready:</strong> {ready ? '✅' : '❌'}</p>
        <p><strong>Authenticated:</strong> {authenticated ? '✅' : '❌'}</p>
        <p><strong>User ID:</strong> {user?.id || 'None'}</p>
        <p><strong>Connected Wallets:</strong> {wallets.length}</p>
        <p><strong>App ID:</strong> {process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'Missing'}</p>
        <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
      </div>

      {wallets.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold">Connected Wallets:</h4>
          {wallets.map((wallet, index) => (
            <div key={index} className="bg-gray-100 rounded p-2 mt-2">
              <p><strong>Type:</strong> {wallet.walletClientType}</p>
              <p><strong>Address:</strong> {wallet.address}</p>
              <p><strong>Chain:</strong> {(wallet as any).chainType || 'N/A'}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        {!authenticated ? (
          <Button 
            onClick={() => login({
              loginMethods: ['wallet'],
              walletChainType: 'solana-only',
            })}
            variant="primary"
          >
            🔗 Connect Phantom
          </Button>
        ) : (
          <Button onClick={logout} variant="secondary">
            🚪 Disconnect
          </Button>
        )}
      </div>

      {typeof window !== 'undefined' && (
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Phantom Detected:</strong> {(window as any).phantom?.solana ? '✅' : '❌'}</p>
          <p><strong>Solflare Detected:</strong> {(window as any).solflare ? '✅' : '❌'}</p>
        </div>
      )}
    </Card>
  )
}