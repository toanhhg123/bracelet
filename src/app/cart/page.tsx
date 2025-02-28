import { eq } from 'drizzle-orm'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdStar } from 'react-icons/md'
import { RiVisaFill } from 'react-icons/ri'

import LikeButton from '@/components/LikeButton'
import { db } from '@/config/db'
import { cart } from '@/config/db/schema'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import ButtonSecondary from '@/shared/Button/ButtonSecondary'
import InputNumber from '@/shared/InputNumber/InputNumber'
import { formatCurrency, LINKS, renderUploadImage } from '@/utils/AppConfig'

import { getUser } from '../signup/action'
import { type CartItem, getCartWithProducts } from './action'

const renderProduct = (item: CartItem) => {
  const { name, coverImage, currentPrice, slug, rating, piecesSold } =
    item.product

  const image = renderUploadImage(coverImage)

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
    <div key={name} className='flex py-5 last:pb-0'>
      <div className='relative size-24 shrink-0 overflow-hidden rounded-xl md:size-40'>
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className='size-full object-cover object-center'
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

const CartPage = async () => {
  const user = await getUser()

  if (!user) {
    redirect(LINKS.LOGIN)
  }

  const cartItems = await getCartWithProducts(user.id)
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  )

  return (
    <div className='nc-CartPage'>
      <main className='container py-16 lg:pb-28 lg:pt-20 '>
        <div className='mb-14'>
          <h2 className='block text-2xl font-medium sm:text-3xl lg:text-4xl'>
            Giỏ hàng của bạn
          </h2>
        </div>

        <hr className='my-10 border-neutral-300 xl:my-12' />

        <div className='flex flex-col lg:flex-row'>
          <div className='w-full divide-y divide-neutral-300 lg:w-3/5 xl:w-[55%]'>
            {cartItems.map((item) => renderProduct(item))}
          </div>
          <div className='my-10 shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:mx-16 2xl:mx-20' />
          <div className='flex-1'>
            <div className='sticky top-28'>
              <h3 className='text-2xl font-semibold'>Thông tin chung</h3>
              <div className='mt-7 divide-y divide-neutral-300 text-sm'>
                <div className='flex justify-between pb-4'>
                  <span>Tổng tiền SP</span>
                  <span className='font-semibold'>
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <div className='flex justify-between py-4'>
                  <span>Giao hàng</span>
                  <span className='font-semibold'>FREE</span>
                </div>
                <div className='flex justify-between py-4'>
                  <span>Thuế</span>
                  <span className='font-semibold'>FREE</span>
                </div>
                <div className='flex justify-between pt-4 text-base font-semibold'>
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>
              <ButtonPrimary href='/checkout' className='mt-8 w-full'>
                Đặt hàng
              </ButtonPrimary>
              <ButtonSecondary
                className='mt-3 inline-flex w-full items-center gap-1 border-2 border-primary text-primary'
                href='/checkout'
              >
                <RiVisaFill className='text-2xl' />
                Thanh toán online
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CartPage
