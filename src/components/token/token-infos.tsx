'use client'

import { Card } from '@/components/common/card'
import { LoadCircle } from '@/components/common/load-circle'
import { useTokenInfo } from '@/components/token/hooks/use-token-info'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  id: string
}

export function TokenInfos({ id }: Props) {
  const { loading, name, imageUrl, price, marketCap } = useTokenInfo(id)

  if (loading)
    return (
      <Card className="min-h-[278px] flex items-center justify-center">
        <LoadCircle />
      </Card>
    )

  return (
    <Link href={`/token/${id}`}>
      <Card>
        <div className="pb-6">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              width={80}
              height={80}
              className="rounded-full object-cover w-20 h-20"
            />
          ) : (
            <div className="w-20 h-20 bg-muted-light rounded-full flex items-center justify-center">
              <span className="text-gray">...</span>
            </div>
          )}
          <p className="text-lg font-bold mt-2">{name}</p>
        </div>
        <p className="text-gray">Price</p>
        <p className="text-lg font-bold">${price}</p>
        <p className="text-gray">Market Cap</p>
        <p className="text-lg font-bold">${marketCap}</p>
      </Card>
    </Link>
  )
}
