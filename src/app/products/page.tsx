import { eq } from 'drizzle-orm'
import { LuFilter } from 'react-icons/lu'
import { MdOutlineFilterList, MdSearch } from 'react-icons/md'

import ProductCard from '@/components/ProductCard'
import SidebarFilters from '@/components/SideBarFilter'
import { db } from '@/config/db'
import { category, product } from '@/config/db/schema'
import ButtonSecondary from '@/shared/Button/ButtonSecondary'
import Input from '@/shared/Input/Input'

type Props = {
  searchParams: Promise<{
    category?: string
  }>
}

const page = async ({ searchParams }: Props) => {
  const { category: categoryId } = await searchParams
  const productsQuery = db.select().from(product)
  if (categoryId) {
    productsQuery.where(eq(product.categoryId, Number.parseInt(categoryId, 10)))
  }
  productsQuery.limit(12)
  const products = await productsQuery
  const categories = await db.select().from(category)

  return (
    <div className='my-8 pb-20'>
      <div className='container relative flex flex-col lg:flex-row' id='body'>
        <div className='pr-4 pt-10 lg:basis-1/3 xl:basis-1/4'>
          <SidebarFilters
            categories={categories}
            defaultCategory={
              categoryId ? Number.parseInt(categoryId, 10) : undefined
            }
          />
        </div>
        <div className='mb-10 shrink-0 border-t lg:mx-4 lg:mb-0 lg:border-t-0' />
        <div className='relative flex-1'>
          <div className='top-32 z-10 mb-3 items-center gap-5 space-y-5 bg-white py-10 lg:sticky lg:flex lg:space-y-0'>
            <div className='flex flex-1 items-center gap-2 rounded-full border border-neutral-300 px-4'>
              <MdSearch className='text-2xl text-neutral-500' />
              <Input
                type='password'
                rounded='rounded-full'
                placeholder='Search...'
                sizeClass='h-12 px-0 py-3'
                className='border-transparent bg-transparent placeholder:text-neutral-500 focus:border-transparent'
              />
            </div>
            <div className='flex items-center gap-5'>
              <ButtonSecondary className='flex items-center gap-1 bg-gray'>
                <LuFilter />
                Filters
              </ButtonSecondary>
              <ButtonSecondary className='flex items-center gap-2 bg-gray'>
                Most popular
                <MdOutlineFilterList />
              </ButtonSecondary>
            </div>
          </div>
          <div className='grid flex-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 '>
            {products.map((item) => (
              <ProductCard showPrevPrice product={item} key={item.slug} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
