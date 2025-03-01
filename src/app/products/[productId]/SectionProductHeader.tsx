import { and, eq } from 'drizzle-orm'
import Image from 'next/image'
import type { FC } from 'react'
import { GoDotFill } from 'react-icons/go'
import { MdStar } from 'react-icons/md'
import { PiSealCheckFill } from 'react-icons/pi'

import type { UserSession } from '@/app/signup/action'
import ImageShowCase from '@/components/ImageShowCase'
import { db } from '@/config/db'
import {
  cart,
  type Product,
  product as productSchema
} from '@/config/db/schema'
import nike_profile from '@/images/nike_profile.jpg'
import ButtonCircle3 from '@/shared/Button/ButtonCircle3'
import Heading from '@/shared/Heading/Heading'
import {
  formatCurrency,
  type SUBMIT_RESPONSE,
  TOAST_TYPE
} from '@/utils/AppConfig'

import AddToCart from './AddToCart'

interface SectionProductHeaderProps {
  product: Product
  user?: UserSession
}

const SectionProductHeader: FC<SectionProductHeaderProps> = ({
  product,
  user
}) => {
  const {
    shots,
    name,
    rating,
    reviews,
    previousPrice,
    currentPrice,
    id,
    piecesSold
  } = product

  const handleAddToCart = async (
    productId: number,
    attributes: Record<string, string>,
    quantity: number
  ): Promise<SUBMIT_RESPONSE> => {
    'use server'

    if (!user) {
      return {
        type: TOAST_TYPE.ERROR,
        message: 'Vui lòng đăng nhập'
      }
    }

    const existingCartItem = await db
      .select()
      .from(cart)
      .where(and(eq(cart.userId, user.id), eq(cart.productId, productId)))
      .limit(1)

    if (existingCartItem.length > 0) {
      return {
        type: TOAST_TYPE.SUCCESS,
        message: 'Sản phẩm đã có trong giỏ hàng'
      }
    }

    const productDBS = await db
      .select()
      .from(productSchema)
      .where(eq(productSchema.id, productId))
      .limit(1)

    const productDB = productDBS[0]

    if (!productDB) {
      return {
        type: TOAST_TYPE.ERROR,
        message: 'Sản phẩm không tồn tại'
      }
    }

    // Thêm sản phẩm vào giỏ hàng
    await db.insert(cart).values({
      userId: user.id,
      productId: productDB.id,
      quantity,
      totalPrice: productDB.currentPrice,
      productAttributes: attributes,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return {
      type: TOAST_TYPE.SUCCESS,
      message: 'Thêm sản phẩm vào giỏ hàng thành công'
    }
  }

  return (
    <div className='items-stretch justify-between space-y-10 lg:flex lg:space-y-0'>
      <div className='basis-[50%]'>
        <ImageShowCase shots={shots as string[]} />
      </div>

      <div className='basis-[45%]'>
        <Heading className='mb-0' isMain title='Hàng mới về!'>
          {name}
        </Heading>

        <div className='mb-10 flex items-center'>
          <div className='flex items-center gap-1'>
            <ButtonCircle3
              className='overflow-hidden border border-neutral-400'
              size='w-11 h-11'
            >
              <Image
                src={nike_profile}
                alt='nike_profile'
                className='size-full object-cover'
              />
            </ButtonCircle3>
            <span className='font-medium'>Nike</span>
            <PiSealCheckFill className='text-blue-600' />
          </div>
          <GoDotFill className='mx-3 text-neutral-500' />
          <div className='flex items-center gap-1'>
            <MdStar className='text-yellow-400' />
            <p className='text-sm'>
              {rating}{' '}
              <span className='text-neutral-500'>{`(${reviews} đánh giá)`}</span>
            </p>
          </div>
          <GoDotFill className='mx-3 text-neutral-500' />
          <p className='text-neutral-500'>{`${piecesSold.toLocaleString()} sản phẩm đã bán`}</p>
        </div>

        <div className='mb-5 space-y-1'>
          <p className='text-neutral-500 line-through'>
            {formatCurrency(previousPrice ?? 0)}
          </p>
          <h1 className='text-3xl font-medium'>
            {formatCurrency(currentPrice)}
          </h1>
        </div>

        <AddToCart
          product={product}
          productId={id}
          handleAddToCart={handleAddToCart}
        />
      </div>
    </div>
  )
}

export default SectionProductHeader
