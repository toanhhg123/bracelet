import Link from 'next/link'

import { db } from '@/config/db'
import { category } from '@/config/db/schema'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import { LINKS } from '@/utils/AppConfig'

const Page = async () => {
  const categories = await db.select().from(category)

  return (
    <div className='container mx-auto p-6'>
      <h1 className='mb-6 flex items-center justify-between text-2xl font-bold'>
        Quản lý danh mục
        <Link href={LINKS.CREATE_CATEGORY}>
          <ButtonPrimary>Thêm mới</ButtonPrimary>
        </Link>
      </h1>

      <div className='overflow-x-auto rounded-lg bg-white shadow-md'>
        <table className='border-gray-300 w-full border-collapse border'>
          <thead className='bg-gray-100'>
            <tr className='text-left'>
              <th className='border-gray-300 border p-3'>ID</th>
              <th className='border-gray-300 border p-3'>Tên</th>
              <th className='border-gray-300 border p-3'>Slug</th>
              <th className='border-gray-300 border p-3 text-center'>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className='border-gray-300 hover:bg-gray-50 border'
              >
                <td className='border-gray-300 border p-3'>{cat.id}</td>
                <td className='border-gray-300 border p-3'>{cat.name}</td>
                <td className='border-gray-300 border p-3'>{cat.slug}</td>
                <td className='border-gray-300 border p-3 text-center'>
                  <Link
                    href={LINKS.EDIT_CATEGORY(cat.id)}
                    className='mr-3 text-blue-500 hover:text-blue-700'
                  >
                    Chỉnh sửa
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Page
