import { TokenDetailsContainer } from '@/components/token-details/token-details-container'
import { ArrowBigLeft } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: Promise<{ tokenAddress: string }>
}

export default async function TokenDetailsPage({ params }: Props) {
  const { tokenAddress } = await params

  return (
    <div>
      <Link
        href={`/token`}
        className="inline-block text-gray hover:text-muted-light"
      >
        <div className="flex items-center space-x-1">
          <ArrowBigLeft />
          <p>go back</p>
        </div>
      </Link>
      <div className="mt-10">
        <TokenDetailsContainer tokenAddress={tokenAddress} />
      </div>
    </div>
  )
}
