'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import toast from 'react-hot-toast'

import type { Category, Product } from '@/config/db/schema'
import { LINKS, type SUBMIT_RESPONSE, TOAST_TYPE } from '@/utils/AppConfig'

type Props = {
  handleSubmit: (
    formData: FormData,
    product?: Product
  ) => Promise<SUBMIT_RESPONSE>
  product?: Product
  type?: 'CREATE' | 'UPDATE'
  categories?: Category[]
}

const Form = ({
  handleSubmit,
  product,
  type = 'CREATE',
  categories = []
}: Props) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const response = await handleSubmit(formData, product)
      toast[response.type](response.message)

      if (response.type === TOAST_TYPE.SUCCESS) {
        router.push(LINKS.MANAGER_PRODUCT)
      }
    })
  }

  return (
    <form action={onSubmit}>
      <div>
        <h2 className='text-gray-900 text-base/7 font-semibold'>
          Thông tin chung sản phẩm
        </h2>
        <p className='text-gray-600 mt-1 text-sm/6'>
          Use a permanent address where you can receive mail.
        </p>

        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
          {/* Tên sản phẩm */}
          <div className='sm:col-span-3'>
            <label
              htmlFor='name'
              className='text-gray-900 block text-sm/6 font-medium'
            >
              Tên sản phẩm
            </label>
            <div className='mt-2'>
              <input
                id='name'
                name='name'
                defaultValue={product?.name}
                type='text'
                className='text-gray-900 outline-gray-300 placeholder:text-gray-400 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6'
                required
              />
            </div>
          </div>

          {/* Slug */}
          <div className='sm:col-span-3'>
            <label
              htmlFor='slug'
              className='text-gray-900 block text-sm/6 font-medium'
            >
              Slug
            </label>
            <div className='mt-2'>
              <input
                defaultValue={product?.slug}
                id='slug'
                name='slug'
                type='text'
                className='text-gray-900 outline-gray-300 placeholder:text-gray-400 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6'
                required
              />
            </div>
          </div>

          {/* Giá hiện tại */}
          <div className='sm:col-span-3'>
            <label
              htmlFor='currentPrice'
              className='text-gray-900 block text-sm/6 font-medium'
            >
              Giá hiện tại
            </label>
            <div className='mt-2'>
              <input
                defaultValue={product?.currentPrice ?? ''}
                id='currentPrice'
                name='currentPrice'
                type='number'
                className='text-gray-900 outline-gray-300 placeholder:text-gray-400 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6'
                required
              />
            </div>
          </div>

          {/* Giá trước đây */}
          <div className='sm:col-span-3'>
            <label
              htmlFor='previousPrice'
              className='text-gray-900 block text-sm/6 font-medium'
            >
              Giá trước đây
            </label>
            <div className='mt-2'>
              <input
                defaultValue={product?.previousPrice ?? ''}
                id='previousPrice'
                name='previousPrice'
                type='number'
                className='text-gray-900 outline-gray-300 placeholder:text-gray-400 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6'
              />
            </div>
          </div>

          {/* Danh mục sản phẩm */}
          <div className='sm:col-span-3'>
            <label
              htmlFor='category'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Danh mục
            </label>
            <div className='mt-2'>
              <select
                id='category'
                name='categoryId'
                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6'
                defaultValue={product?.categoryId ?? undefined}
              >
                <option value=''>Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Đánh giá */}
          <div className='sm:col-span-3'>
            <label
              htmlFor='rating'
              className='text-gray-900 block text-sm/6 font-medium'
            >
              Đánh giá (1-5)
            </label>
            <div className='mt-2'>
              <input
                id='rating'
                name='rating'
                type='number'
                defaultValue={product?.rating}
                step='0.1'
                min='1'
                max='5'
                className='text-gray-900 outline-gray-300 placeholder:text-gray-400 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6'
                required
              />
            </div>
          </div>

          {/* Số lượng đã bán */}
          <div className='sm:col-span-3'>
            <label
              htmlFor='piecesSold'
              className='text-gray-900 block text-sm/6 font-medium'
            >
              Số lượng đã bán
            </label>
            <div className='mt-2'>
              <input
                defaultValue={product?.piecesSold}
                id='piecesSold'
                name='piecesSold'
                type='number'
                className='text-gray-900 outline-gray-300 placeholder:text-gray-400 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6'
              />
            </div>
          </div>

          {/* Tóm tắt sản phẩm */}
          <div className='sm:col-span-6'>
            <label
              htmlFor='overview'
              className='text-gray-900 block text-sm/6 font-medium'
            >
              Tóm tắt sản phẩm
            </label>
            <div className='mt-2'>
              <textarea
                defaultValue={product?.overview ?? ''}
                id='overview'
                name='overview'
                rows={4}
                className='text-gray-900 outline-gray-300 placeholder:text-gray-400 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6'
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm/6 font-semibold text-gray-900">
                  By email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          defaultChecked
                          id="comments"
                          name="comments"
                          type="checkbox"
                          aria-describedby="comments-description"
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p id="comments-description" className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          aria-describedby="candidates-description"
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p id="candidates-description" className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          aria-describedby="offers-description"
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p id="offers-description" className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm/6 font-semibold text-gray-900">
                  Push notifications
                </legend>
                <p className="mt-1 text-sm/6 text-gray-600">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      defaultChecked
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                    />
                    <label
                      htmlFor="push-email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div> */}

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <Link
          href='/manager/product'
          type='button'
          className='text-gray-900 px-4 py-2 text-sm/6 font-semibold'
        >
          Cancel
        </Link>
        <button
          type='submit'
          className='hover:bg-primary-dark rounded-md bg-primary px-4 py-2 text-white disabled:bg-primary/60'
          disabled={isPending}
        >
          {type === 'CREATE' ? 'Create' : 'Update'}
        </button>
      </div>
    </form>
  )
}

export default Form
