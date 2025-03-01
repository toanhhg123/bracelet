// app/orders/page.tsx
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'

import { db } from '@/config/db'
import { orderItems, orders } from '@/config/db/schema'
import { LINKS } from '@/utils/AppConfig'

import OrderAction from './OrderAction'
import OrderStatus from './OrderStatus'

const OrdersPage = async () => {
  // Fetch orders từ server
  const ordersList = await db.select().from(orders)

  const handleDelete = async (id: number) => {
    'use server'

    await db.delete(orderItems).where(eq(orderItems.orderId, id))
    await db.delete(orders).where(eq(orders.id, id))
    revalidatePath(LINKS.ORDER_MANAGER)
  }

  const handleChangeStatus = async (id: number, status: string) => {
    'use server'

    await db.update(orders).set({ status }).where(eq(orders.id, id))

    revalidatePath(LINKS.ORDER_MANAGER)
  }

  return (
    <div className='container my-10'>
      <h1 className='mb-6 text-2xl font-bold'>Quản Lý Đơn Hàng</h1>
      <div className=' rounded-lg bg-white shadow'>
        <table className='divide-gray-200 min-h-max min-w-full divide-y'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                Mã Đơn Hàng
              </th>
              <th className='text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                Khách Hàng
              </th>
              <th className='text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                Tổng Giá
              </th>
              <th className='text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                Trạng Thái
              </th>
              <th className='text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody className='divide-gray-200 divide-y bg-white'>
            {ordersList.map((order) => (
              <tr key={order.id}>
                <td className='text-gray-500 whitespace-nowrap px-6 py-4 text-sm'>
                  {order.id}
                  <br />
                  <Link
                    className='text-blue-500'
                    href={LINKS.ORDER_DETAILS(order.id)}
                  >
                    Xem chi tiết
                  </Link>
                </td>
                <td className='text-gray-900 whitespace-nowrap px-6 py-4 text-sm'>
                  Tên khách hàng: {order.contactName}
                  <br />
                  SDT: {order.contactPhone}
                  <br />
                  Địa chỉ: {order.shippingAddressLine1},{' '}
                  {order.shippingAddressLine2}, {order.shippingCity},{' '}
                  {order.shippingPostalCode}, {order.shippingCountry}
                </td>
                <td className='text-gray-900 whitespace-nowrap px-6 py-4 text-sm'>
                  {order.totalPrice.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  })}
                </td>

                <OrderStatus
                  order={order}
                  handleChangeStatus={handleChangeStatus}
                />
                <OrderAction order={order} handleDelete={handleDelete} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersPage
