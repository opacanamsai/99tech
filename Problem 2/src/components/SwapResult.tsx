export default function SwapResult({
  amount,
  fromCurrency,
  toCurrency,
  result
}: {
  amount: number
  fromCurrency: string
  toCurrency: string
  result: string
}) {
  return (
    <p className='mt-4 text-center text-lg font-semibold flex items-center justify-center'>
      {amount} {fromCurrency}
      <img src={`/src/assets/tokenIcons/${fromCurrency}.svg`} alt={fromCurrency} className='w-6 h-6 ml-2' />
      <span className='mx-2'>≈</span>
      {result.split('≈')[1]}
      <img src={`/src/assets/tokenIcons/${toCurrency}.svg`} alt={toCurrency} className='w-6 h-6 mx-2' />
    </p>
  )
}
