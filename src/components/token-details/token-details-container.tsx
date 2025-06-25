'use client'

import { useGetProfileTokenDetails } from '@/components/token/hooks/use-profile-token-details'
import { useTokenInfo } from '@/components/token/hooks/use-token-info'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  tokenAddress: string
}

export function TokenDetailsContainer({ tokenAddress }: Props) {
  const { loading, name, imageUrl, price, marketCap } =
    useTokenInfo(tokenAddress)
  const { data: profileTokenDetails } = useGetProfileTokenDetails({
    tokenAddress,
  })

  return (
    <div className="flex flex-col">
      <div className="flex gap-10">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={80}
            height={80}
            className="rounded-full object-cover w-40 h-40"
          />
        ) : (
          <div className="w-40 h-40 bg-muted-light rounded-full flex items-center justify-center">
            <span className="text-gray">...</span>
          </div>
        )}
        <div>
          <p className="text-3xl font-bold mb-2">{loading ? '...' : name}</p>
          <p className="text-gray">Price</p>
          <p className="text-lg font-bold">${price}</p>
          <p className="text-gray">Market Cap</p>
          <p className="text-lg font-bold">${marketCap}</p>
        </div>
      </div>
      <div className="mt-10">
        {profileTokenDetails && profileTokenDetails?.profiles?.length > 0 && (
          <>
            <p className="text-gray">Token followed by</p>
            <div>
              <ul className="list-disc pl-2">
                {profileTokenDetails?.profiles?.map((elem) => (
                  <li key={elem.username} className="mb-2 flex flex-col">
                    <Link
                      href={`/${elem.username}`}
                      className="hover:underline"
                    >
                      {elem.username}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
