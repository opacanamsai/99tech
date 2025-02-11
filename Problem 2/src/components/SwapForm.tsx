import { FormData } from '@/types'
import { UseFormReturn } from 'react-hook-form'

export default function SwapForm({
  form,
  onSubmit,
  uniqueTokens
}: {
  form: UseFormReturn<FormData, null, undefined>
  onSubmit: (data: FormData) => void
  uniqueTokens: string[]
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label className='block font-medium'>From:</label>
        <select {...register('fromCurrency', { required: true })} className='w-full p-2 border rounded'>
          <option value=''>Select Currency</option>
          {uniqueTokens.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        {errors.fromCurrency && <span className='text-red-500'>Required</span>}
      </div>

      <div>
        <label className='block font-medium'>To:</label>
        <select {...register('toCurrency', { required: true })} className='w-full p-2 border rounded'>
          <option value=''>Select Currency</option>
          {uniqueTokens.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        {errors.toCurrency && <span className='text-red-500'>Required</span>}
      </div>

      <div>
        <label className='block font-medium'>Amount:</label>
        <input
          type='number'
          {...register('amount', { required: true, min: 0.01 })}
          className='w-full p-2 border rounded'
        />
        {errors.amount && <span className='text-red-500'>Enter a valid amount</span>}
      </div>

      <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
        Swap
      </button>
    </form>
  )
}
