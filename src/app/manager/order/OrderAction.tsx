'use client'

import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import React from 'react'

import type { Order } from '@/config/db/schema'

type Props = {
  order: Order
  handleDelete: (id: number) => Promise<void>
}

const OrderStatus = ({ order, handleDelete }: Props) => {
  return (
    <td className='text-gray-900 whitespace-nowrap px-6 py-4 text-sm'>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='text-gray-400 hover:text-gray-600 flex items-center focus:outline-none'>
            <EllipsisVerticalIcon className='size-5' aria-hidden='true' />
          </Menu.Button>
        </div>
        <Transition
          as={React.Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='py-1'>
              <Menu.Item>
                {({ active }) => (
                  <div>
                    <button
                      type='button'
                      onClick={() => handleDelete(order.id)}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block w-full px-4 py-2 text-sm`}
                    >
                      Xóa
                    </button>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </td>
  )
}

export default OrderStatus
