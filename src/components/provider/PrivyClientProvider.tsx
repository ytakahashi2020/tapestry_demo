'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana'

export function PrivyClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: { 
          theme: 'light',
        },
        externalWallets: {
          solana: { 
            connectors: toSolanaWalletConnectors({
              shouldAutoConnect: false,
            })
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}
