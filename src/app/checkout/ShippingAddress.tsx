'use client'

import type { FC } from 'react'
import React from 'react'
import { TbTruckDelivery } from 'react-icons/tb'

import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import ButtonSecondary from '@/shared/Button/ButtonSecondary'
import FormItem from '@/shared/FormItem'
import Input from '@/shared/Input/Input'
import Radio from '@/shared/Radio/Radio'
import Select from '@/shared/Select/Select'

interface Props {
  isActive: boolean
  onCloseActive: () => void
  onOpenActive: () => void
}

const countryOptions = [
  { label: 'Việt Nam', value: 'VN' },
  { label: 'Trung Quốc', value: 'CN' }
]

const ShippingAddress: FC<Props> = ({
  isActive,
  onCloseActive,
  onOpenActive
}) => {
  return (
    <div className='rounded-xl border border-neutral-300'>
      <div className='flex flex-col items-start p-6 sm:flex-row'>
        <span className='hidden sm:block'>
          <TbTruckDelivery className='text-3xl text-primary' />
        </span>

        <div className='flex w-full items-center justify-between'>
          <div className='sm:ml-8'>
            <span className='uppercase'>ĐỊA CHỈ GIAO HÀNG</span>
            <div className='mt-1 text-sm font-semibold'>
              <span className=''>
                1234 Đường Chính, Căn hộ 567, Thành phố, Bang
              </span>
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
        {/* ============ */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3'>
          <div>
            <FormItem label='Tên'>
              <Input
                rounded='rounded-lg'
                sizeClass='h-12 px-4 py-3'
                className='border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary'
                defaultValue='Clark'
              />
            </FormItem>
          </div>
          <div>
            <FormItem label='Họ'>
              <Input
                rounded='rounded-lg'
                sizeClass='h-12 px-4 py-3'
                className='border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary'
                defaultValue='Kent'
              />
            </FormItem>
          </div>
        </div>

        {/* ============ */}
        <div className='space-y-4 sm:flex sm:space-x-3 sm:space-y-0'>
          <div className='flex-1'>
            <FormItem label='Địa chỉ'>
              <Input
                rounded='rounded-lg'
                sizeClass='h-12 px-4 py-3'
                className='border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary'
                placeholder=''
                defaultValue='1234 Đường Chính'
                type='text'
              />
            </FormItem>
          </div>
          <div className='sm:w-1/3'>
            <FormItem label='Căn hộ, Suite *'>
              <Input
                rounded='rounded-lg'
                sizeClass='h-12 px-4 py-3'
                className='border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary'
                defaultValue='567'
              />
            </FormItem>
          </div>
        </div>

        {/* ============ */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3'>
          <div>
            <FormItem label='Thành phố'>
              <Input
                rounded='rounded-lg'
                sizeClass='h-12 px-4 py-3'
                className='border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary'
                defaultValue='Thành phố'
              />
            </FormItem>
          </div>
          <div>
            <FormItem label='Quốc gia'>
              <Select
                sizeClass='h-12 px-4 py-3'
                className='rounded-lg border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary'
                defaultValue={countryOptions?.[0]?.value}
              >
                {countryOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormItem>
          </div>
        </div>

        {/* ============ */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3'>
          <div>
            <FormItem label='Bang/Tỉnh'>
              <Input
                rounded='rounded-lg'
                sizeClass='h-12 px-4 py-3'
                className='border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary'
                defaultValue='Arizona'
              />
            </FormItem>
          </div>
        </div>
        <div>
          <FormItem label='Mã bưu điện'>
            <Input
              rounded='rounded-lg'
              sizeClass='h-12 px-4 py-3'
              className='border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary'
              defaultValue='12345'
            />
          </FormItem>
        </div>
      </div>

      {/* ============ */}
      <div className='px-6'>
        <FormItem label='Loại địa chỉ'>
          <div className='mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3'>
            <Radio
              label='Nhà riêng (Giao hàng cả ngày)'
              id='Address-type-home'
              name='Address-type'
              defaultChecked
            />
            <Radio
              label='Văn phòng (Giao hàng 9 AM - 5 PM)'
              id='Address-type-office'
              name='Address-type'
            />
          </div>
        </FormItem>
      </div>

      {/* ============ */}
      <div className='flex flex-col p-6 sm:flex-row'>
        <ButtonPrimary className='shadow-none sm:!px-7' onClick={onCloseActive}>
          Lưu và tiếp tục thanh toán
        </ButtonPrimary>
        <ButtonSecondary
          className='mt-3 sm:ml-3 sm:mt-0'
          onClick={onCloseActive}
        >
          Hủy
        </ButtonSecondary>
      </div>
    </div>
  )
}

export default ShippingAddress
