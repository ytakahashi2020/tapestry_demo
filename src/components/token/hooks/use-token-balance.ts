import useSWR from 'swr'
import { useTokenInfo } from './use-token-info'

const SOL_MINT = 'So11111111111111111111111111111111111111112'
const LAMPORTS_PER_SOL = 1000000000

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      `HTTP ${response.status}: ${errorData.error || 'Unknown error'}`,
    )
  }
  return response.json()
}

// Special fetcher for SOL balance using RPC
const fetchSolBalance = async (walletAddress: string) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_RPC_URL || 'https://api.mainnet-beta.solana.com',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [walletAddress, { commitment: 'confirmed' }],
      }),
    },
  )
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error.message)
  }
  return data.result?.value || 0
}

export function useTokenBalance(mintAddress: string, walletAddress: string) {
  const { decimals } = useTokenInfo(mintAddress)

  const formatBalance = (value: string, isSol = false) => {
    const num = parseFloat(value)
    if (isNaN(num)) return { formatted: '0', raw: BigInt(0) }
    if (!decimals) return { formatted: '0', raw: BigInt(0) }

    // Calculate raw value in base units
    const raw = isSol
      ? BigInt(Math.round(num * LAMPORTS_PER_SOL))
      : BigInt(Math.round(num * Math.pow(10, decimals))) // Assuming non-SOL tokens use 6 decimals

    // Format numbers greater than 1 million
    if (num >= 1_000_000) {
      return {
        formatted: (num / 1_000_000).toFixed(2) + 'm',
        raw,
      }
    }
    // Format numbers greater than 1 thousand
    if (num >= 1_000) {
      return {
        formatted: (num / 1_000).toFixed(2) + 'k',
        raw,
      }
    }

    // Special handling for SOL balances
    if (isSol) {
      if (num >= 1) {
        // For SOL >= 1, show up to 3 decimal places
        return {
          formatted: num.toFixed(3),
          raw,
        }
      }
      // For SOL < 1, show up to 4 decimal places
      return {
        formatted: num.toFixed(4),
        raw,
      }
    }

    // For other tokens, show up to 2 decimal places
    return {
      formatted: num.toFixed(2),
      raw,
    }
  }

  // For SOL balance
  const solKey =
    mintAddress === SOL_MINT && walletAddress
      ? ['solBalance', walletAddress]
      : null
  const {
    data: solData,
    error: solError,
    isLoading: solLoading,
    isValidating: solRefreshing,
    mutate: mutateSolBalance,
  } = useSWR(solKey, () => fetchSolBalance(walletAddress!), {
    // refreshInterval: 10000, // 10 seconds
    // dedupingInterval: 2000,
    // revalidateOnFocus: false,
    // keepPreviousData: true,
  })

  // For SPL token balance
  const tokenKey =
    mintAddress !== SOL_MINT && walletAddress && mintAddress
      ? `/api/tokens/balance?walletAddress=${walletAddress}&mintAddress=${mintAddress}`
      : null
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenLoading,
    isValidating: tokenRefreshing,
    mutate: mutateTokenBalance,
  } = useSWR(tokenKey, fetcher, {
    // refreshInterval: 10000, // 10 seconds
    // dedupingInterval: 2000,
    // revalidateOnFocus: false,
    // keepPreviousData: true,
  })

  // Process the data based on token type
  let balance = { formatted: '0', raw: BigInt(0) }
  let error = null
  let loading = false
  let isRefreshing = false
  let mutate = () => {}

  if (mintAddress === SOL_MINT) {
    if (solData !== undefined) {
      const solBalance = solData / LAMPORTS_PER_SOL
      balance = formatBalance(solBalance.toString(), true)
    }
    error = solError ? 'Failed to fetch balance' : null
    loading = solLoading
    isRefreshing = solRefreshing
    mutate = mutateSolBalance
  } else {
    if (tokenData) {
      console.log('tokenData:', tokenData.balance.uiAmountString)
      balance = formatBalance(tokenData.balance.uiAmountString)
    }
    error = tokenError ? 'Failed to fetch balance' : null
    loading = tokenLoading
    isRefreshing = tokenRefreshing
    mutate = mutateTokenBalance
  }

  return {
    balance: balance.formatted,
    rawBalance: balance.raw,
    loading,
    error,
    isRefreshing,
    mutate,
  }
}
