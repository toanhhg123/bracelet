'use client'

import { useState, useTransition } from 'react'
import toast from 'react-hot-toast'

import type { Product } from '@/config/db/schema'
import Button from '@/shared/Button/Button'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import ButtonSecondary from '@/shared/Button/ButtonSecondary'
import Input from '@/shared/Input/Input'

type Props = {
  product: Product
  onChange?: (
    attributes: Record<string, string[]>,
    product: Product
  ) => Promise<void>
}

const ProductAttribute = ({ product, onChange }: Props) => {
  const [attributes, setAttributes] = useState<Record<string, string[]>>(
    (product?.attributes as Record<string, string[]>) || {}
  )
  const [isPending, startTransition] = useTransition()

  const handleAddAttribute = () => {
    setAttributes({ ...attributes, '': [] })
  }

  const handleRemoveAttribute = (key: string) => {
    const updatedAttributes = { ...attributes }
    delete updatedAttributes[key]
    setAttributes(updatedAttributes)
  }

  const handleAttributeChange = (oldKey: string, newKey: string) => {
    if (oldKey !== newKey) {
      const updatedAttributes = { ...attributes }
      const valuesOld = updatedAttributes[oldKey]

      if (valuesOld) {
        updatedAttributes[newKey] = valuesOld
        delete updatedAttributes[oldKey]
        setAttributes(updatedAttributes)
      }
    }
  }

  const handleValuesChange = (key: string, value: string) => {
    console.log({ value: value.split(',').map((v) => v.trim()) })

    const updatedAttributes = {
      ...attributes,
      [key]: value.split(',').map((v) => v.trim())
    }
    setAttributes(updatedAttributes)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      const data = { ...attributes }

      for (const key of Object.keys(attributes)) {
        if (!data[key]) {
          delete attributes[key]
        }
      }
      await onChange?.(attributes, product)
      toast.success('Lưu thành công')
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-gray-900 text-base/7 font-semibold'>
        Thuộc tính sản phẩm
      </h2>
      <p className='text-gray-600 mt-1 text-sm/6'>
        Use a permanent address where you can receive mail.
      </p>

      <div className='mt-4 sm:col-span-6'>
        <h3 className='text-gray-700 mb-2 text-lg font-semibold'>
          Thuộc tính:
        </h3>
        {Object.entries(attributes).map(([key, values], i) => {
          return (
            <div
              className='mt-4 flex items-center gap-2'
              key={i.toLocaleString()}
            >
              <div className='text-gray-700 w-40 text-sm font-medium'>
                {key}:{' '}
              </div>
              {values.map((value, index) => (
                <div
                  key={index.toLocaleString()}
                  className='text-gray-700 bg-slate-200 p-2 text-sm font-medium'
                >
                  {value}
                </div>
              ))}
            </div>
          )
        })}
      </div>

      <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
        {/* Thuộc tính sản phẩm */}
        <div className='sm:col-span-6'>
          <label
            className='text-gray-900 block text-sm/6 font-medium'
            htmlFor='productAttributes'
          >
            Thuộc tính sản phẩm
          </label>
          {Object.entries(attributes).map(([key, values], index) => (
            <div key={index.toLocaleString()} className='mt-2 flex gap-4'>
              <Input
                placeholder='Tên thuộc tính (VD: Màu sắc)'
                value={key}
                onChange={(e) => handleAttributeChange(key, e.target.value)}
              />
              <Input
                placeholder='Giá trị (VD: Đỏ, Xanh, Vàng)'
                value={values.join(',')}
                onChange={(e) => handleValuesChange(key, e.target.value)}
              />
              <ButtonSecondary onClick={() => handleRemoveAttribute(key)}>
                Xóa
              </ButtonSecondary>
            </div>
          ))}
          <div className='flex items-center justify-between'>
            <Button onClick={handleAddAttribute} className='mt-2'>
              + Thêm thuộc tính
            </Button>

            <ButtonPrimary type='submit' disabled={isPending}>
              Lưu
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProductAttribute
