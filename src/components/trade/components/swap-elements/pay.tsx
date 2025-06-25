'use client'

// import { TokenBalance } from '@/components/common/left-side-menu/balance'
import { Button, ButtonSize, ButtonVariant } from '@/components/ui/button'
import { Input } from '@/components/ui/form'
import { ChevronDownIcon } from 'lucide-react'
import Image from 'next/image'
import { useTokenBalance } from '@/components/token/hooks/use-token-balance'
import { ESwapMode } from '../../models/jupiter/jup-api-models'

interface Props {
  walletAddress: string
  inputTokenMint: string
  displayInAmount: string
  displayInAmountInUsd: string
  inputTokenImageUri?: string
  inputTokenSymbol?: string
  setSwapMode: (mode: ESwapMode) => void
  handleInAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setShowInputTokenSearch: (show: boolean) => void
  handleInputAmountByPercentage: (percent: number) => void
}

export const DEFAULT_INPUT_TOKEN_SYMBOL = 'SOL'

export function Pay({
  walletAddress,
  inputTokenMint,
  displayInAmount,
  displayInAmountInUsd,
  inputTokenImageUri,
  inputTokenSymbol,
  setSwapMode,
  handleInAmountChange,
  setShowInputTokenSearch,
  handleInputAmountByPercentage,
}: Props) {
  const percentageButtons = [
    { label: '25%', value: 25 },
    { label: '50%', value: 50 },
    { label: 'max', value: 100 },
  ]
  const { balance: inputBalance } =
    useTokenBalance(inputTokenMint, walletAddress)

  return (
    <div>
      <div className="flex justify-between items-center">
        <p>Selling</p>
        <p className="text-xs text-muted-foreground">
          Balance:{inputBalance}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <Input
          placeholder="0.00"
          className="text-primary placeholder:text-primary text-xl bg-transparent border-none px-0"
          onFocus={() => setSwapMode(ESwapMode.EXACT_IN)}
          onChange={(event) => handleInAmountChange(event)}
          value={displayInAmount}
          autoFocus
          // type="number"
        />
        <p className="text-xs text-muted-foreground">{displayInAmountInUsd}</p>
      </div>

      <Button
        variant={ButtonVariant.BADGE_WHITE}
        onClick={() => setShowInputTokenSearch(true)}
        size={ButtonSize.LG}
        className="flex justify-between px-4 w-full"
      >
        <div className="flex items-center gap-3">
          <div>
            {inputTokenImageUri ? (
              <Image
                src={inputTokenImageUri}
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
            {inputTokenSymbol ? inputTokenSymbol : DEFAULT_INPUT_TOKEN_SYMBOL}
          </span>
        </div>
        <ChevronDownIcon />
      </Button>
      <div className="flex items-center justify-end space-x-2 mt-2">
        {percentageButtons.map(({ label, value }) => (
          <Button
            key={value}
            variant={ButtonVariant.OUTLINE}
            className="rounded-full"
            size={ButtonSize.SM}
            onClick={() => handleInputAmountByPercentage(value)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}
