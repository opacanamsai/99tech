import { useState } from 'react'
import { useForm } from 'react-hook-form'
import tokenPrices from '@/factory/tokenPrices.json'
import SwapResult from '@/components/SwapResult'
import SwapForm from './SwapForm'
import { FormData, Token } from '@/types'

export default function CurrencySwap() {
  const form = useForm<FormData>()
  const { getValues } = form
  const [result, setResult] = useState<string | null>(null)

  const fromCurrency = getValues('fromCurrency')
  const toCurrency = getValues('toCurrency')
  const amount = getValues('amount')

  const uniqueTokens = Array.from(new Set(tokenPrices.map(({ currency }) => currency))) // Remove duplicate tokens

  const getPrice = (currency: string): number =>
    tokenPrices.find((token: Token) => token.currency === currency)?.price || 0

  const onSubmit = (data: FormData) => {
    const fromPrice = getPrice(data.fromCurrency)
    const toPrice = getPrice(data.toCurrency)
    if (fromPrice && toPrice) {
      const exchangedAmount = (data.amount * fromPrice) / toPrice
      setResult(`${data.amount} ${data.fromCurrency} ≈ ${exchangedAmount.toFixed(2)} ${data.toCurrency}`)
    }
  }

  return (
    <div className='min-w-[500px] max-w-md mx-auto p-6 shadow-lg rounded-lg bg-[#242424]'>
      <h2 className='text-xl font-semibold text-center mb-4'>Currency Swap</h2>
      <SwapForm form={form} onSubmit={onSubmit} uniqueTokens={uniqueTokens} />
      {result && <SwapResult result={result} amount={amount} fromCurrency={fromCurrency} toCurrency={toCurrency} />}
    </div>
  )
}
