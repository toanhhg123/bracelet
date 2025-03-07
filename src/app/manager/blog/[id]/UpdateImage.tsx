/* eslint-disable @next/next/no-img-element */

'use client'

import { Dialog, Transition } from '@headlessui/react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { type FormEvent, useState, useTransition } from 'react'
import toast from 'react-hot-toast'

import type { Blog } from '@/config/db/schema'
import Button from '@/shared/Button/Button'
import {
  renderUploadImage,
  type SUBMIT_RESPONSE,
  TOAST_TYPE
} from '@/utils/AppConfig'

type Props = {
  onUpload: (file: File, blog: Blog) => Promise<SUBMIT_RESPONSE>
  blog: Blog
}

const UpdateImage = ({ onUpload, blog }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const [preview, setPreview] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const previewImage = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPreview(reader.result as string)
    }
  }

  const closePanel = () => {
    setIsOpen(false)
    setPreview(null)
  }

  const handleUpload = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    startTransition(async () => {
      const formData = new FormData(event.currentTarget)

      const response = await onUpload(formData.get('image') as File, blog)

      toast[response.type](response.message)
      if (response.type === TOAST_TYPE.SUCCESS) {
        closePanel()
        router.refresh()
      }
    })
  }

  return (
    <>
      <div className='border-gray-900/10 mt-8 border-b pb-12'>
        <h2 className='text-gray-900 text-base font-bold'>
          Chỉnh sửa hình ảnh
        </h2>
        <p className='text-gray-600 mt-1 text-sm/6'>
          Cập nhật ảnh chính và ảnh phụ cho sản phẩm.
        </p>

        <div className='mt-6'>
          <div className='text-gray-700 block text-sm font-medium'>
            Ảnh chính
          </div>
          <div className='mt-2 flex items-center gap-4'>
            {blog.image ? (
              <div className='relative'>
                <img
                  src={renderUploadImage(blog.image)}
                  alt='Cover'
                  className='size-32 rounded object-cover'
                />
              </div>
            ) : (
              <button
                type='button'
                className='flex size-40 cursor-pointer items-center justify-center rounded bg-slate-100 hover:bg-slate-200'
                onClick={() => setIsOpen(true)}
              >
                <PhotoIcon className='text-gray-400 size-8' />
                <span className='text-gray-600 ml-2 text-sm/10'>
                  Tải ảnh lên
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      <Transition show={!!isOpen} as={React.Fragment}>
        <Dialog onClose={closePanel} className='relative z-50'>
          <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
          <form
            className='fixed inset-0 flex items-center justify-center p-4'
            onSubmit={handleUpload}
          >
            <Dialog.Panel className='w-full max-w-md rounded bg-white p-6'>
              <Dialog.Title className='text-gray-900 text-lg font-semibold'>
                Tải ảnh lên
              </Dialog.Title>
              <input
                required
                type='file'
                name='image'
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    previewImage(e.target.files[0])
                  }
                }}
                className='mt-4'
              />
              {preview && (
                <div className='mt-5 w-full'>
                  <Image
                    src={preview}
                    alt='Preview'
                    width={500}
                    height={500}
                    className='w-full'
                  />
                </div>
              )}
              {preview && (
                <Button
                  disabled={isPending}
                  type='submit'
                  className='mt-5 bg-primary text-white '
                >
                  Lưu lại
                </Button>
              )}
            </Dialog.Panel>
          </form>
        </Dialog>
      </Transition>
    </>
  )
}

export default UpdateImage
