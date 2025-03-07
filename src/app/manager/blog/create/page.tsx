import { db } from '@/config/db'
import { type BlogCreate, blogs } from '@/config/db/schema'
import type { SUBMIT_RESPONSE } from '@/utils/AppConfig'

import FormCreate from './form-create'

const Page = async () => {
  const handleCreate = async (data: BlogCreate): Promise<SUBMIT_RESPONSE> => {
    'use server'

    try {
      await db.insert(blogs).values(data)

      return {
        type: 'success',
        message: 'Tạo bài viết thành công'
      }
    } catch (error) {
      return {
        type: 'error',
        message: 'Tạo bài viết thất bại'
      }
    }
  }

  return (
    <div className='container mx-auto my-8 rounded-lg bg-white p-6 shadow-md'>
      <h1 className='text-gray-800 mb-6 text-3xl font-bold'>
        Tạo mới bài viết
      </h1>

      <FormCreate onSubmit={handleCreate} />
    </div>
  )
}

export default Page
