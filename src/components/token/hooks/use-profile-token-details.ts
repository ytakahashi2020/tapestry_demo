'use client'

import { IProfileTokenDetails } from '@/models/profile.models'
import { useCallback, useEffect, useState } from 'react'

interface Props {
  tokenAddress: string
}

export const useGetProfileTokenDetails = ({ tokenAddress }: Props) => {
  const [data, setData] = useState<IProfileTokenDetails | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProfileTokenDetails = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/profiles/token-owners?tokenAddress=${tokenAddress}`,
        {
          method: 'GET',
        },
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch profile token details')
      }

      setData(result)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [tokenAddress])

  useEffect(() => {
    if (tokenAddress) {
      fetchProfileTokenDetails()
    }
  }, [fetchProfileTokenDetails, tokenAddress])

  return { data, loading, error, refetch: fetchProfileTokenDetails }
}
