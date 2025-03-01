import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

import { db } from '@/config/db'
import { category } from '@/config/db/schema'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import { LINKS } from '@/utils/AppConfig'

type Props = {
  params: Promise<{ id: string }>
}

const EditPage = async ({ params }: Props) => {
  const id = Number((await params).id)

  const updateCategory = async (formData: FormData) => {
    'use server'

    const name = formData.get('name') as string
    const slug = formData.get('slug') as string
    const categoryId = formData.get('categoryId') as string

    if (!name || !slug) {
      throw new Error('Tên và Slug không được để trống')
    }

    await db
      .update(category)
      .set({ name, slug })
      .where(eq(category.id, Number(categoryId)))

    redirect(LINKS.CATEGORY_MANAGER)
  }

  // Lấy dữ liệu danh mục theo id
  const categories = await db.select().from(category).where(eq(category.id, id))
  const currentCategory = categories[0]

  if (!currentCategory) {
    return <div className='container my-8'>Danh mục không tồn tại!</div>
  }

  return (
    <div className='container mx-auto my-8 max-w-lg rounded-lg bg-white p-6 shadow-md'>
      <h1 className='mb-6 text-2xl font-bold'>Chỉnh sửa danh mục</h1>

      <form action={updateCategory} method='POST' className='space-y-4'>
        <input name='categoryId' value={currentCategory.id} hidden readOnly />

        <div>
          <label className='text-gray-700 block font-medium' htmlFor='name'>
            Tên danh mục
          </label>
          <input
            id='name'
            type='text'
            name='name'
            defaultValue={currentCategory.name}
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
            defaultValue={currentCategory.slug}
            required
            className='border-gray-300 w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* Nút submit */}
        <ButtonPrimary type='submit'>Cập nhật danh mục</ButtonPrimary>
      </form>
    </div>
  )
}

export default EditPage
