import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'

import { getUser } from '@/app/signup/action'
import { db } from '@/config/db'
import { product } from '@/config/db/schema'
import { IMAGES, renderUploadImage } from '@/utils/AppConfig'

import SectionMoreProducts from './SectionMoreProducts'
import SectionNavigation from './SectionNavigation'
import SectionProductHeader from './SectionProductHeader'
import SectionProductInfo from './SectionProductInfo'

type Props = {
  params: Promise<{ productId: string }>
}

const getProductData = async (slug: string) => {
  const productDB = await db
    .select()
    .from(product)
    .where(eq(product.slug, slug))
    .limit(1)
  return productDB[0]
}

const SingleProductPage = async (props: Props) => {
  const user = await getUser()
  const { productId } = await props.params
  const selectedProduct = await getProductData(productId)

  if (!selectedProduct) {
    return notFound()
  }

  selectedProduct.coverImage = selectedProduct.coverImage
    ? renderUploadImage(selectedProduct.coverImage)
    : IMAGES.NO_IMAGE

  selectedProduct.shots = selectedProduct.shots
    ? (selectedProduct.shots as string[]).map((shot: string) =>
        renderUploadImage(shot)
      )
    : []

  selectedProduct.shots = [
    selectedProduct.coverImage,
    ...(selectedProduct.shots as string[])
  ]

  return (
    <div className='container'>
      <SectionNavigation />

      <div className='mb-20'>
        <SectionProductHeader product={selectedProduct} user={user} />
      </div>

      <div className='mb-28'>
        <SectionProductInfo product={selectedProduct} />
      </div>

      <div className='mb-28'>
        <SectionMoreProducts />
      </div>
    </div>
  )
}

export default SingleProductPage
