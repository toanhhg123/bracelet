'use client'

import React, { useTransition } from 'react'
import toast from 'react-hot-toast'
import { BsBag } from 'react-icons/bs'

import type { Product } from '@/config/db/schema'
import ButtonSecondary from '@/shared/Button/ButtonSecondary'
import type { SUBMIT_RESPONSE } from '@/utils/AppConfig'

type Props = {
  handleAddToCart: (
    productId: number,
    attributes: Record<string, string>,
    quantity: number
  ) => Promise<SUBMIT_RESPONSE>
  productId: number
  product: Product
}

const AddToCart = ({ handleAddToCart, productId, product }: Props) => {
  const [isPending, startTransition] = useTransition()
  const [productAttributes, setProductAttributes] = React.useState<
    Record<string, string>
  >({})

  const addToCart = async () => {
    startTransition(async () => {
      const response = await handleAddToCart(productId, productAttributes, 1)
      toast[response.type](response.message)
    })
  }

  const attributes = product.attributes as Record<string, string[]>

  const handleAddAttribute = (key: string, value: string) => {
    setProductAttributes((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div>
      {attributes && Object.keys(attributes).length > 0 && (
        <div className='mb-5'>
          {Object.entries(attributes).map(([key, values]) => (
            <div key={key} className='mb-3'>
              <p className='font-medium'>{key}</p>
              <div className='flex flex-wrap gap-2'>
                {values.map((value, index) => (
                  <button
                    type='button'
                    key={index.toLocaleString()}
                    className={`rounded-lg border px-4 py-2 hover:bg-neutral-100 
                      ${productAttributes[key] === value ? 'bg-primary text-white hover:bg-primary' : ''}`}
                    onClick={() => {
                      handleAddAttribute(key, value)
                    }}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <ButtonSecondary
        onClick={addToCart}
        className='flex w-full items-center gap-1 border-2 border-primary text-primary'
        disabled={isPending}
      >
        <BsBag /> Thêm vào giỏ hàng
      </ButtonSecondary>
    </div>
  )
}

export default AddToCart
