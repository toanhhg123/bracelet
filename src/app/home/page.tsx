import SectionBestDeals from './SectionBestDeals'
import SectionHeader from './SectionHeader'
import SectionProducts from './SectionProducts'
import SectionTestimonials from './SectionTestimonials'

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

      <div className='mb-32'>
        <SectionTestimonials />
      </div>

    </div>
  )
}

export default page
