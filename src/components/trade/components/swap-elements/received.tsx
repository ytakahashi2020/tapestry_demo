'use client'

import { ChevronDownIcon } from 'lucide-react'
import Image from 'next/image'
import { Button, ButtonSize, ButtonVariant } from '@/components/ui/button'
import { Input } from '@/components/ui/form'
import { ESwapMode } from '../../models/jupiter/jup-api-models'

interface Props {
  displayOutAmount: string
  displayOutAmountInUsd: string
  outputTokenMint: string
  outputTokenImageUri?: string
  outputTokenSymbol?: string
  setSwapMode: (mode: ESwapMode) => void
  handleOutAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setShowOutputTokenSearch: (show: boolean) => void
}

export const DEFAULT_OUTPUT_TOKEN_SYMBOL = 'SSE'

export function Receive({
  displayOutAmount,
  displayOutAmountInUsd,
  outputTokenImageUri,
  outputTokenSymbol,
  setSwapMode,
  handleOutAmountChange,
  setShowOutputTokenSearch,
}: Props) {

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <p>Buying</p>
        </div>

        <div className="flex justify-between items-center">
          <Input
            placeholder="0.00"
            className="text-primary placeholder:text-primary text-xl bg-transparent border-none px-0"
            onFocus={() => setSwapMode(ESwapMode.EXACT_OUT)}
            onChange={(event) => handleOutAmountChange(event)}
            value={displayOutAmount}
          />

          <p className="text-xs text-muted-foreground">
            {displayOutAmountInUsd}
          </p>
        </div>

        <Button
          variant={ButtonVariant.BADGE_WHITE}
          onClick={() => setShowOutputTokenSearch(true)}
          size={ButtonSize.LG}
          className="flex justify-between px-4 w-full"
        >
          <div className="flex items-center gap-3">
            <div>
              {outputTokenImageUri ? (
                <Image
                  src={outputTokenImageUri}
                  alt="ITokeImg"
                  width={32}
                  height={32}
                  className="rounded-full aspect-square object-cover"
                />
              ) : (
                <span className="rounded-full h-[32px] w-[32px] bg-background" />
              )}
            </div>

            <span>
              {outputTokenSymbol
                ? outputTokenSymbol
                : DEFAULT_OUTPUT_TOKEN_SYMBOL}
            </span>
          </div>
          <ChevronDownIcon />
        </Button>
      </div>
    </>
  )
}
