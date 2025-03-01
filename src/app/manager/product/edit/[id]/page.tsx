import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'

import { db } from '@/config/db'
import { category, type Product, product } from '@/config/db/schema'
import { LINKS, type SUBMIT_RESPONSE, TOAST_TYPE } from '@/utils/AppConfig'

import { update } from '../../create/submit'
import Form from '../../form'
import UpdateImage from './UpdateImage'
import { deleteFile, uploadImage } from './upload'
import ProductAttribute from './ProductAttribute'

type Props = {
  params: Promise<{ id: number }>
}

const getProductById = async (id: number) => {
  const result = await db
    .select()
    .from(product)
    .where(eq(product.id, id))
    .limit(1)

  return result[0] // Trả về sản phẩm đầu tiên (nếu có)
}

const page = async ({ params }: Props) => {
  const { id } = await params
  const productDB = await getProductById(id)
  const categories = await db.select().from(category)

  if (!productDB) {
    return notFound()
  }

  const handleUploadMainImage = async (
    file: File,
    isCoverImage: boolean,
    _productDB: Product
  ) => {
    'use server'

    const res = await uploadImage(file)
    const shots = productDB.shots
      ? (productDB.shots as unknown as string[])
      : []

    if (res.type === TOAST_TYPE.SUCCESS) {
      // upload main photo
      if (isCoverImage) {
        await db
          .update(product)
          .set({ coverImage: res.data })
          .where(eq(product.id, id))
      }

      // upload additional photo
      if (!isCoverImage) {
        await db
          .update(product)
          .set({ shots: [...shots, res.data] })
          .where(eq(product.id, id))
      }
    }

    revalidatePath(LINKS.EDIT_PRODUCT(productDB.id))

    return res
  }

  const onDelete = async (
    url: string,
    isCoverImage: boolean,
    productParams: Product
  ) => {
    'use server'

    const shots = productParams.shots
      ? (productParams.shots as unknown as string[])
      : []

    if (isCoverImage) {
      await db.update(product).set({ coverImage: '' }).where(eq(product.id, id))
    }

    if (!isCoverImage) {
      await db
        .update(product)
        .set({ shots: shots.filter((shot) => shot !== url) })
        .where(eq(product.id, id))
    }

    await deleteFile(url)
    revalidatePath(LINKS.EDIT_PRODUCT(productParams.id))
  }

  const handUpdate = async (
    formData: FormData,
    oldProduct?: Product
  ): Promise<SUBMIT_RESPONSE> => {
    'use server'

    const res = await update(formData, oldProduct?.id ?? id)

    return res
  }

  const handleChangeAttribute = async (
    attributes: Record<string, string[]>,
    p: Product
  ) => {
    'use server'

    await db.update(product).set({ attributes }).where(eq(product.id, p.id))
    revalidatePath(LINKS.EDIT_PRODUCT(p.id))
  }

  return (
    <div className='container my-4'>
      <div className='border-gray-900/10 border-b pb-4'>
        <h2 className='text-gray-900 text-base/7 font-semibold'>
          Chỉnh sửa sản phẩm
        </h2>
        <p className='text-gray-600 mt-1 text-sm/6'>
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      {/* update images */}

      <UpdateImage
        onUpload={handleUploadMainImage}
        productDB={productDB}
        onDelete={onDelete}
      />

      <div className='mt-4 border-gray-900/10 border-b pb-12'>
        <Form
          product={productDB}
          handleSubmit={handUpdate}
          type='UPDATE'
          categories={categories}
        />
      </div>

      <div className='mt-8'>
        <ProductAttribute
          product={productDB}
          onChange={handleChangeAttribute}
        />
      </div>
    </div>
  )
}

export default page
