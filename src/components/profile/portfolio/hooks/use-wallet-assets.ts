'use client'

import { useEffect, useState } from 'react'

interface Asset {
  id: string
  name: string
  symbol: string
  amount?: string
  decimals?: number
  value?: number
  imageUrl?: string
  type: 'token' | 'nft'
}

interface PortfolioStats {
  totalValue: number
  tokenCount: number
  nftCount: number
}

interface UseWalletAssetsResult {
  assets: Asset[]
  stats: PortfolioStats | null
  loading: boolean
  error: string | null
}

export function useWalletAssets(walletAddress: string): UseWalletAssetsResult {
  const [assets, setAssets] = useState<Asset[]>([])
  const [stats, setStats] = useState<PortfolioStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!walletAddress) {
      setLoading(false)
      return
    }

    async function fetchAssets() {
      setLoading(true)
      setError(null)

      try {
        // Fetch actual SOL balance
        const solResponse = await fetch(`https://api.devnet.solana.com`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getBalance',
            params: [walletAddress]
          })
        })
        const solData = await solResponse.json()
        const solBalance = solData.result?.value ? (solData.result.value / 1e9).toFixed(4) : '0.0000'

        // Fetch USDC balance (devnet USDC mint)
        const usdcMint = '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU' // Devnet USDC
        
        const usdcResponse = await fetch(`/api/tokens/balance?walletAddress=${walletAddress}&mintAddress=${usdcMint}`)
        let usdcBalance = '0.000000'
        
        if (usdcResponse.ok) {
          const usdcData = await usdcResponse.json()
          if (usdcData.balance?.uiAmountString) {
            usdcBalance = parseFloat(usdcData.balance.uiAmountString).toFixed(6)
          }
        }

        // Create assets array with real data
        const assets: Asset[] = [
          {
            id: 'So11111111111111111111111111111111111111112',
            name: 'Solana',
            symbol: 'SOL',
            amount: solBalance,
            decimals: 9,
            value: parseFloat(solBalance) * 200, // Approximate SOL price for demo
            imageUrl:
              'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
            type: 'token',
          },
          {
            id: usdcMint,
            name: 'USD Coin',
            symbol: 'USDC',
            amount: usdcBalance,
            decimals: 6,
            value: parseFloat(usdcBalance), // USDC is pegged to $1
            imageUrl:
              'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
            type: 'token',
          },
        ]

        // Calculate stats (only tokens, no NFTs)
        const tokenAssets = assets.filter((asset) => asset.type === 'token')
        const totalValue = tokenAssets.reduce(
          (sum, token) => sum + (token.value || 0),
          0,
        )

        setAssets(assets)
        setStats({
          totalValue,
          tokenCount: tokenAssets.length,
          nftCount: 0, // No NFTs
        })

        // In a production implementation, this would be the API calls:
        /*
        // 1. Fetch tokens and balances
        const balanceResponse = await fetch(`/api/tokens/balances?walletAddress=${walletAddress}`)
        const balanceData = await balanceResponse.json()
        
        // 2. Fetch token metadata
        const tokenMints = balanceData.tokens.map(token => token.mint)
        const metadataResponse = await fetch('/api/tokens/metadata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mintAccounts: tokenMints })
        })
        const metadataData = await metadataResponse.json()
        
        // 3. Combine and transform data
        const assets = [...tokenAssets, ...nftAssets]
        */
      } catch (err) {
        console.error('Error fetching wallet assets:', err)
        setError('Failed to fetch wallet assets')
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, [walletAddress])

  return { assets, stats, loading, error }
}
