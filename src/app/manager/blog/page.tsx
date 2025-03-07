import Image from 'next/image'
import Link from 'next/link'

import { db } from '@/config/db'
import { blogs } from '@/config/db/schema'
import { LINKS, renderUploadImage } from '@/utils/AppConfig'

const Page = async () => {
  const blogList = await db.select().from(blogs)

  return (
    <div className='container my-8'>
      <h1 className='text-gray-800 mb-6 text-3xl font-bold'>
        Quản lý bài viết
      </h1>
      {blogList.length === 0 ? (
        <p className='text-gray-600'>Chưa có bài viết nào.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full border-collapse rounded-lg bg-white shadow-md'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='text-gray-700 p-4 text-left'>Hình ảnh</th>
                <th className='text-gray-700 p-4 text-left'>Tiêu đề</th>
                <th className='text-gray-700 p-4 text-left'>Tác giả</th>
                <th className='text-gray-700 p-4 text-left'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {blogList.map((blog) => (
                <tr key={blog.id} className='hover:bg-gray-50 border-b'>
                  <td className='p-4'>
                    <Image
                      src={renderUploadImage(blog.image)}
                      alt={blog.title}
                      width={100}
                      height={100}
                      className='rounded-md'
                    />
                  </td>
                  <td className='text-gray-800 p-4'>{blog.title}</td>
                  <td className='text-gray-600 p-4'>
                    {blog.author ?? 'Ẩn danh'}
                  </td>
                  <td className='p-4'>
                    <Link href={LINKS.EDIT_BLOG(blog.id)}>
                      <button
                        type='button'
                        className='mr-2 px-2 py-1 text-blue-500 hover:text-blue-700'
                      >
                        Chỉnh sửa
                      </button>
                    </Link>
                    {/* <DeleteButton id={blog.id} /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Page
