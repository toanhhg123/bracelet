'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import Editor  from '@/components/TextEditor'
import type { BlogCreate } from '@/config/db/schema'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import { LINKS, type SUBMIT_RESPONSE } from '@/utils/AppConfig'

interface FormCreateProps {
  onSubmit: (data: BlogCreate) => Promise<SUBMIT_RESPONSE>
  defaultValue?: BlogCreate
}

const FormCreate = ({ onSubmit, defaultValue }: FormCreateProps) => {
  const [title, setTitle] = useState(defaultValue?.title ?? '')
  const [content, setContent] = useState(defaultValue?.content ?? '')
  const [author, setAuthor] = useState(defaultValue?.author ?? '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data: BlogCreate = {
      title,
      content,
      author
    }

    setIsSubmitting(true)
    const response = await onSubmit(data)
    toast[response.type](response.message)
    setIsSubmitting(false)
    if (response.type === 'success') {
      router.push(LINKS.BLOG_MANAGER)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Trường Tiêu đề */}
      <div>
        <label
          htmlFor='title'
          className='text-gray-700 mb-1 block text-sm font-medium'
        >
          Tiêu đề
        </label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className='border-gray-300 w-full rounded-md border px-4 py-2 shadow-sm transition duration-200 focus:border-indigo-500 focus:ring-indigo-500'
          placeholder='Nhập tiêu đề bài viết'
        />
      </div>

      {/* Trường Nội dung */}
      <div>
        <label
          htmlFor='content'
          className='text-gray-700 mb-1 block text-sm font-medium'
        >
          Nội dung
        </label>
        <div className='rounded-md '>
          <Editor
            value={defaultValue?.content}
            onChange={(value) => {
              setContent(value)
            }}
          />
        </div>
      </div>

      {/* Trường Tác giả */}
      <div>
        <label
          htmlFor='author'
          className='text-gray-700 mb-1 block text-sm font-medium'
        >
          Tác giả
        </label>
        <input
          type='text'
          id='author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='border-gray-300 w-full rounded-md border px-4 py-2 shadow-sm transition duration-200 focus:border-indigo-500 focus:ring-indigo-500'
          placeholder='Nhập tên tác giả (tùy chọn)'
        />
      </div>

      {/* Nút Submit */}
      <ButtonPrimary type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Đang tạo...' : 'Tạo bài viết'}
      </ButtonPrimary>
    </form>
  )
}

export default FormCreate
