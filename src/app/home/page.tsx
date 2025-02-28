import SectionBestDeals from './SectionBestDeals'
import SectionBrands from './SectionBrands'
import SectionHeader from './SectionHeader'
import SectionProducts from './SectionProducts'

const page = async () => {
  return (
    <div>
      <div className='my-7'>
        <SectionHeader />
      </div>

      <div className='mb-32'>
        <SectionBestDeals />
      </div>

      <div className='mb-32'>
        <SectionProducts />
      </div>

      {/* <div className="mb-32">
        <SectionBrands />
      </div> */}
    </div>
  )
}

export default page
