import type { FC } from 'react'
import React from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'

import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import ButtonSecondary from '@/shared/Button/ButtonSecondary'
import Checkbox from '@/shared/Checkbox/Checkbox'
import FormItem from '@/shared/FormItem'
import Input from '@/shared/Input/Input'

interface Props {
  isActive: boolean
  onOpenActive: () => void
  onCloseActive: () => void
}

const ContactInfo: FC<Props> = ({ isActive, onCloseActive, onOpenActive }) => {
  return (
    <div className='z-0 overflow-hidden rounded-xl border border-neutral-300'>
      <div className='flex flex-col items-start p-6 sm:flex-row'>
        <span className='hidden sm:block'>
          <FaRegCircleUser className='text-3xl text-primary' />
        </span>
        <div className='flex w-full items-center justify-between'>
          <div className='sm:ml-8'>
            <div className='uppercase tracking-tight'>THÔNG TIN LIÊN HỆ</div>
            <div className='mt-1 text-sm font-semibold'>
              <span className=''>Clark Kent</span>
              <span className='ml-3 tracking-tighter'>+123-456-7890</span>
            </div>
          </div>
          <ButtonSecondary
            sizeClass='py-2 px-4'
            className='border-2 border-primary text-primary'
            onClick={onOpenActive}
          >
            Chỉnh Sửa
          </ButtonSecondary>
        </div>
      </div>
      <div
        className={`space-y-4 border-t border-neutral-300 px-6 py-7 sm:space-y-6 ${
          isActive ? 'block' : 'hidden'
        }`}
      >
        <h3 className='text-lg font-semibold'>Thông tin liên hệ</h3>
        <div className='max-w-lg'>
          <FormItem label='Số điện thoại của bạn'>
            <Input
              rounded='rounded'
              sizeClass='h-12 px-4 py-3'
              className='border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary'
              defaultValue='+84 '
              type='tel'
            />
          </FormItem>
        </div>
        <div className='max-w-lg'>
          <FormItem label='Địa chỉ email'>
            <Input
              rounded='rounded-lg'
              sizeClass='h-12 px-4 py-3'
              className='border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary'
              type='email'
            />
          </FormItem>
        </div>
        <div>
          <Checkbox
            className='!text-sm'
            name='uudai'
            label='Gửi cho tôi tin tức và ưu đãi qua email'
            defaultChecked
          />
        </div>

        {/* ============ */}
        <div className='flex flex-col pt-6 sm:flex-row'>
          <ButtonPrimary
            className='shadow-none sm:!px-7'
            onClick={() => onCloseActive()}
          >
            Lưu và tiếp tục giao hàng
          </ButtonPrimary>
          <ButtonSecondary
            className='mt-3 sm:ml-3 sm:mt-0'
            onClick={() => onCloseActive()}
          >
            Hủy
          </ButtonSecondary>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
