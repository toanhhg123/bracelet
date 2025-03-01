// app/orders/[id]/page.tsx
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'

import { db } from '@/config/db'
import { orderItems, orders, product } from '@/config/db/schema'
import { IMAGES, LINKS, renderUploadImage } from '@/utils/AppConfig'

import OrderStatus from '../OrderStatus'

type Props = {
  params: Promise<{ id: number }>
}

const Page = async ({ params }: Props) => {
  const { id } = await params

  // Lấy thông tin chi tiết đơn hàng từ cơ sở dữ liệu
  const orderDbs = await db
    .select()
    .from(orders)
    .where(eq(orders.id, id))
    .limit(1)
  const orderDetails = await db
    .select({
      id: orderItems.id,
      orderId: orderItems.orderId,
      productId: orderItems.productId,
      quantity: orderItems.quantity,
      price: orderItems.price,
      notes: orderItems.notes,
      productDetails: orderItems.productDetails,
      product: {
        name: product.name,
        coverImage: product.coverImage,
        currentPrice: product.currentPrice,
        category: product.categoryId,
        rating: product.rating,
        reviews: product.reviews,
        piecesSold: product.piecesSold,
        overview: product.overview
      }
    })
    .from(orderItems)
    .innerJoin(product, eq(orderItems.productId, product.id))
    .where(eq(orderItems.orderId, id))

  const order = orderDbs[0]

  if (!order) {
    return <div>Không tìm thấy đơn hàng</div>
  }

  const {
    contactName,
    contactPhone,
    shippingAddressLine1,
    shippingAddressLine2,
    shippingCity,
    shippingState,
    shippingPostalCode,
    shippingCountry,
    addressType,
    paymentMethod,
    status,
    totalPrice,
    notes,
    createdAt,
    updatedAt
  } = order

  const handleChangeStatus = async (orderId: number, statusChange: string) => {
    'use server'

    await db
      .update(orders)
      .set({ status: statusChange })
      .where(eq(orders.id, orderId))

    revalidatePath(LINKS.ORDER_DETAILS(orderId))
  }

  return (
    <div className='container my-4 rounded-lg bg-white p-6 shadow-md'>
      <h1 className='mb-4 flex justify-between text-2xl font-bold'>
        Chi tiết đơn hàng #{id}
        <OrderStatus order={order} handleChangeStatus={handleChangeStatus} />
      </h1>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* Thông tin khách hàng */}
        <div>
          <h2 className='mb-2 text-xl font-semibold'>Thông tin khách hàng</h2>
          <p>
            <strong>Tên liên hệ:</strong> {contactName}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {contactPhone}
          </p>
          <p>
            <strong>Địa chỉ giao hàng:</strong>
          </p>
          <p>{shippingAddressLine1}</p>
          {shippingAddressLine2 && <p>{shippingAddressLine2}</p>}
          <p>
            {shippingCity}, {shippingState} {shippingPostalCode}
          </p>
          <p>{shippingCountry}</p>
          <p>
            <strong>Loại địa chỉ:</strong>{' '}
            {addressType === 'home' ? 'Nhà riêng' : 'Văn phòng'}
          </p>
        </div>

        {/* Thông tin đơn hàng */}
        <div>
          <h2 className='mb-2 text-xl font-semibold'>Thông tin đơn hàng</h2>
          <p>
            <strong>Phương thức thanh toán:</strong> {paymentMethod}
          </p>
          <p>
            <strong>Trạng thái:</strong> {status}
          </p>
          <p>
            <strong>Tổng giá trị:</strong> {totalPrice.toLocaleString()}
          </p>
          <p>
            <strong>Ngày tạo:</strong>{' '}
            {createdAt ? new Date(createdAt).toLocaleString() : 'N/A'}
          </p>
          <p>
            <strong>Ngày cập nhật:</strong>{' '}
            {updatedAt ? new Date(updatedAt).toLocaleString() : 'N/A'}
          </p>
          {notes && (
            <p>
              <strong>Ghi chú:</strong> {notes}
            </p>
          )}
        </div>
      </div>

      {/* Danh sách sản phẩm trong đơn hàng */}
      <div className='mt-6'>
        <h2 className='mb-2 text-xl font-semibold'>Sản phẩm trong đơn hàng</h2>
        <div className='space-y-4'>
          {orderDetails.map((itemData) => {
            const item = { ...itemData }
            item.product.coverImage = item.product.coverImage
              ? renderUploadImage(item.product.coverImage)
              : IMAGES.NO_IMAGE

            return (
              <div key={item.id} className='rounded-lg border p-4'>
                <div className='flex items-start space-x-4'>
                  {/* Hình ảnh sản phẩm */}
                  <Image
                    src={item.product.coverImage}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className='size-20 rounded-lg object-cover'
                  />
                  {/* Thông tin sản phẩm */}
                  <div className='flex-1'>
                    <p className='font-semibold'>{item.product.name}</p>
                    <p>
                      <strong>Danh mục:</strong> {item.product.category}
                    </p>
                    <p>
                      <strong>Số lượng:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Giá:</strong> {item.price.toLocaleString()}
                    </p>
                    <p>
                      <strong>Đánh giá:</strong> {item.product.rating} (
                      {item.product.reviews} đánh giá)
                    </p>
                    <p>
                      <strong>Đã bán:</strong> {item.product.piecesSold}
                    </p>
                    {item.notes && (
                      <p>
                        <strong>Ghi chú:</strong> {item.notes}
                      </p>
                    )}
                    {!!item.productDetails && (
                      <p>
                        <strong>Chi tiết sản phẩm:</strong>{' '}
                        {JSON.stringify(item.productDetails)}
                      </p>
                    )}
                    <p className='text-gray-600 text-sm'>
                      {item.product?.overview}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Page
