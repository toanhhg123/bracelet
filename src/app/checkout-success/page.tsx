'use client'

import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import ButtonPrimary from '@/shared/Button/ButtonPrimary'

export default function CheckoutSuccess() {
  const router = useRouter()

  return (
    <div className='bg-gray-100 flex min-h-screen flex-col items-center justify-center p-6'>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-lg'
      >
        <CheckCircleIcon className='mb-4 size-16 text-green-500' />
        <h1 className='text-gray-800 text-2xl font-semibold'>
          Thanh toán thành công!
        </h1>
        <p className='text-gray-600 mt-2'>
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.
        </p>

        <div className='mt-6'>
          <ButtonPrimary
            onClick={() => {
              toast.success('Đang quay lại trang chủ')
              router.push('/')
            }}
          >
            Quay lại trang chủ
          </ButtonPrimary>
        </div>
      </motion.div>
    </div>
  )
}
