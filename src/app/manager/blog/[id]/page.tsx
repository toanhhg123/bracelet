import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import React from 'react'

import { db } from '@/config/db'
import type { Blog, BlogCreate } from '@/config/db/schema'
import { blogs } from '@/config/db/schema'
import type { SUBMIT_RESPONSE } from '@/utils/AppConfig'

import { uploadImage } from '../../product/edit/[id]/upload'
import FormCreate from '../create/form-create'
import UpdateImage from './UpdateImage'

type Props = {
  params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {
  const { id } = await params

  const blogDbs = await db
    .select()
    .from(blogs)
    .where(eq(blogs.id, Number(id)))

  const blog = blogDbs[0]
  if (!blog) return notFound()

  const handleSubmit = async (data: BlogCreate): Promise<SUBMIT_RESPONSE> => {
    'use server'

    console.log(data)
    throw new Error('Function not implemented.')
  }

  const handleUpload = async (
    file: File,
    _blog: Blog
  ): Promise<SUBMIT_RESPONSE> => {
    'use server'

    const res = await uploadImage(file)
    await db
      .update(blogs)
      .set({ image: res.data })
      .where(eq(blogs.id, _blog.id))

    return { type: 'success', message: 'Thành công' }
  }

  return (
    <div className='container my-8'>
      <UpdateImage blog={blog} onUpload={handleUpload} />
      <div className='my-4' />
      <FormCreate defaultValue={blog} onSubmit={handleSubmit} />
    </div>
  )
}

export default Page
