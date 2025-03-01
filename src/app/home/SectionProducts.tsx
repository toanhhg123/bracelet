import ProductCard from '@/components/ProductCard'
import { db } from '@/config/db'
import { product } from '@/config/db/schema'
import { productsSection } from '@/data/content'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import Heading from '@/shared/Heading/Heading'
import { LINKS } from '@/utils/AppConfig'

const SectionProducts = async () => {
  const products = await db.select().from(product).limit(12)

  return (
    <div className='container'>
      <Heading isCenter isMain desc={productsSection.description}>
        {productsSection.heading}
      </Heading>
      {/* <Filter /> */}

      <div className='grid gap-7 md:grid-cols-2 lg:grid-cols-4'>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} className='border-neutral-300' />
        ))}
      </div>

      <div className='mt-14 flex items-center justify-center'>
        <ButtonPrimary href={LINKS.PRODUCTS}>View More</ButtonPrimary>
      </div>
    </div>
  )
}

export default SectionProducts
