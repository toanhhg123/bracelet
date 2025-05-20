import { eq } from 'drizzle-orm'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdStar } from 'react-icons/md'

import LikeButton from '@/components/LikeButton'
import { db } from '@/config/db'
import { cart, orderItems, orders } from '@/config/db/schema'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import Input from '@/shared/Input/Input'
import InputNumber from '@/shared/InputNumber/InputNumber'
import {
  formatCurrency,
  IMAGES,
  LINKS,
  renderUploadImage
} from '@/utils/AppConfig'

import { type CartItem, getCartWithProducts } from '../cart/action'
import { getUser } from '../signup/action'
import RenderTab from './RenderTab'

const CheckoutPage = async () => {
  const user = await getUser()

  if (!user) {
    redirect(LINKS.LOGIN)
  }

  const cartItems = await getCartWithProducts(user.id)

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  )

  const handleSubmit = async (form: FormData) => {
    'use server'

    const data = Object.fromEntries(form.entries()) as {
      contactPhone: string
      contactName: string
      uudai: string
      shippingAddressLine1: string
      shippingAddressLine2: string
      shippingCity: string
      shippingCountry: string
      shippingState: string
      shippingPostalCode: string
      addressType: string
    }

    const { id: userId } = await getUser()
    const carts = await getCartWithProducts(userId)
    const total = carts.reduce((sum, item) => sum + item.totalPrice, 0)

    // Tạo đơn hàng mới
    const [orderId] = await db
      .insert(orders)
      .values({
        userId,
        contactName: data.contactName,
        contactPhone: data.contactPhone,
        shippingAddressLine1: data.shippingAddressLine1,
        shippingAddressLine2: data.shippingAddressLine2,
        shippingCity: data.shippingCity,
        shippingState: data.shippingState,
        shippingPostalCode: data.shippingPostalCode,
        shippingCountry: data.shippingCountry,
        addressType: data.addressType,
        paymentMethod: 'Credit Card', // Có thể thay đổi tùy theo phương thức thanh toán
        status: 'pending',
        totalPrice: total,
        notes: data.uudai // Lưu mã ưu đãi (nếu có)
      })
      .$returningId()

    if (!orderId) {
      return
    }

    // Prepare data for bulk insert
    const orderItemsData = carts.map((item) => ({
      orderId: orderId.id,
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.currentPrice,
      notes: null
    }))

    await db.insert(orderItems).values(orderItemsData)

    // Delete items from cart
    await db.delete(cart).where(eq(cart.userId, userId))
    redirect(LINKS.CHECK_OUT_SUCCESS)
  }

  const renderProduct = (item: CartItem) => {
    const { name, currentPrice, slug, rating, piecesSold } = item.product

    const coverImage = item.product.coverImage
      ? renderUploadImage(item.product.coverImage)
      : IMAGES.NO_IMAGE

    const handleChange = async (quantity: number) => {
      'use server'

      await db
        .update(cart)
        .set({
          quantity,
          totalPrice: quantity * currentPrice
        })
        .where(eq(cart.id, item.cartId))
    }

    return (
      <div key={name} className='mr-2 flex py-5 last:pb-0'>
        <div className='relative size-24 shrink-0 overflow-hidden rounded md:size-40'>
          <Image
            fill
            src={coverImage}
            alt={name}
            className='size-full object-contain object-center'
          />
          <Link className='absolute inset-0' href={LINKS.PRODUCT(slug)} />
        </div>

        <div className='ml-4 flex flex-1 flex-col justify-between'>
          <div>
            <div className='flex justify-between '>
              <div>
                <h3 className='font-medium md:text-2xl '>
                  <Link href={LINKS.PRODUCT(slug)}>{name}</Link>
                </h3>
                <span className='my-1 text-sm text-neutral-500'>
                  Đã bán: {piecesSold}
                </span>
                <div className='flex items-center gap-1'>
                  <MdStar className='text-yellow-400' />
                  <span className='text-sm'>{rating}</span>
                </div>
              </div>
              <span className='font-medium md:text-xl'>
                {formatCurrency(currentPrice * item.quantity)}
              </span>
            </div>
          </div>
          <div className='flex w-full items-end justify-between text-sm'>
            <div className='flex items-center gap-3'>
              <LikeButton />
              <AiOutlineDelete className='text-2xl' />
            </div>
            <div>
              <InputNumber onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='nc-CheckoutPage'>
      <main className='container py-16 lg:pb-28 lg:pt-20'>
        <div className='mb-16'>
          <h2 className='block text-2xl font-semibold sm:text-3xl lg:text-4xl'>
            Thanh Toán
          </h2>
        </div>

        <form className='flex flex-col lg:flex-row' action={handleSubmit}>
          <div className='flex-1'>
            <RenderTab />
          </div>

          <div className='my-10 shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:lg:mx-14 2xl:mx-16' />

          <div className='w-full lg:w-[36%]'>
            <h3 className='text-lg font-semibold'>Tóm Tắt Đơn Hàng</h3>
            <div className='mt-8 divide-y divide-neutral-300'>
              {cartItems.map((item) => renderProduct(item))}
            </div>

            <div className='mt-10 border-t border-neutral-300 pt-6 text-sm'>
              <div>
                <div className='text-sm'>Mã Giảm Giá</div>
                <div className='mt-1.5 flex'>
                  <Input
                    rounded='rounded-lg'
                    sizeClass='h-12 px-4 py-3'
                    className='flex-1 border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary'
                  />
                  <button
                    type='button'
                    className='ml-3 flex w-24 items-center justify-center rounded-2xl border border-neutral-300 bg-gray px-4 text-sm font-medium transition-colors hover:bg-neutral-100'
                  >
                    Áp Dụng
                  </button>
                </div>
              </div>

              <div className='mt-4 flex justify-between pb-4'>
                <span>Tạm Tính</span>
                <span className='font-semibold'>
                  {formatCurrency(totalPrice)}
                </span>
              </div>
              <div className='flex justify-between py-4'>
                <span>Phí Vận Chuyển & Xử Lý</span>
                <span className='font-semibold'>Miễn Phí</span>
              </div>
              <div className='flex justify-between py-4'>
                <span>Thuế Ước Tính</span>
                <span className='font-semibold'>Miễn Phí</span>
              </div>
              <div className='flex justify-between pt-4 text-base font-semibold'>
                <span>Tổng Cộng</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </div>

            <Image src="/assets/images/payment-qr.jpg" className='my-4' width={500} height={500} alt="payment"/>
            <p className='mt-2 text-sm italic text-neutral-600'>
              <strong>Lưu ý:</strong> Nếu bạn chọn phương thức chuyển khoản bằng mã QR,
              vui lòng ghi rõ nội dung chuyển khoản bao gồm <strong>số điện thoại</strong> và <strong>tên khách hàng</strong>
              để chúng tôi có thể liên lạc xác nhận đơn hàng với bạn.
            </p>
            <ButtonPrimary type='submit' className='mt-8 w-full'>
              Xác Nhận Đơn Hàng
            </ButtonPrimary>
          </div>
        </form>
      </main>
    </div>
  )
}

export default CheckoutPage
