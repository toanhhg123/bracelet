'use client'

import { Menu, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import React, { Fragment } from 'react'

import { type Order, ORDER_STATUS } from '@/config/db/schema'

type Props = {
  order: Order
  handleChangeStatus: (orderId: number, newStatus: string) => Promise<void>
}

const statusOptions = [
  { value: ORDER_STATUS.PENDING, label: 'Chờ xử lý' },
  { value: ORDER_STATUS.PROCESSING, label: 'Đang xử lý' },
  { value: ORDER_STATUS.SHIPPED, label: 'Đang giao hàng' },
  { value: ORDER_STATUS.DELIVERED, label: 'Đã giao hàng' },
  { value: ORDER_STATUS.CANCELLED, label: 'Đã hủy' }
]

const OrderStatus = ({ order, handleChangeStatus }: Props) => {
  const selectedStatus = statusOptions.find(
    (option) => option.value === order.status
  )

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='text-gray-900 ring-gray-300 hover:bg-gray-50 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset'>
          {selectedStatus?.label}
          <ChevronDownIcon
            className='text-gray-400 -mr-1 size-5'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {statusOptions.map((option) => (
              <Menu.Item key={option.value}>
                {({ active }) => (
                  <button
                    key={option.value}
                    type='button'
                    onClick={() => handleChangeStatus(order.id, option.value)}
                    className={`${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } group flex w-full items-center px-4 py-2 text-sm`}
                  >
                    {option.label}
                    {order.status === option.value && (
                      <CheckIcon
                        className='ml-auto size-5 text-primary'
                        aria-hidden='true'
                      />
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default OrderStatus
