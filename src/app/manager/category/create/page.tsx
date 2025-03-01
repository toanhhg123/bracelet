import { redirect } from 'next/navigation'
import React from 'react'

import { db } from '@/config/db'
import { category } from '@/config/db/schema'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import { LINKS } from '@/utils/AppConfig'

const CreatePage = async () => {
  async function createCategory(formData: FormData) {
    'use server'

    const name = formData.get('name') as string
    const slug = formData.get('slug') as string
    await db.insert(category).values({ name, slug })

    redirect(LINKS.CATEGORY_MANAGER)
  }
  return (
    <div className='container mx-auto my-8 max-w-lg rounded-lg bg-white p-6 shadow-md'>
      <h1 className='mb-6 text-2xl font-bold'>Thêm mới danh mục</h1>

      <form action={createCategory} method='POST' className='space-y-4'>
        {/* Tên danh mục */}
        <div>
          <label className='text-gray-700 block font-medium' htmlFor='name'>
            Tên danh mục
          </label>
          <input
            type='text'
            name='name'
            id='name'
            required
            className='border-gray-300 w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* Slug */}
        <div>
          <label className='text-gray-700 block font-medium' htmlFor='slug'>
            Slug
          </label>
          <input
            id='slug'
            type='text'
            name='slug'
            required
            className='border-gray-300 w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* Nút submit */}
        <ButtonPrimary type='submit'>Thêm danh mục</ButtonPrimary>
      </form>
    </div>
  )
}
export default CreatePage
