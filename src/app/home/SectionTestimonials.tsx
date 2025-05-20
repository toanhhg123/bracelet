/* eslint-disable @next/next/no-img-element */

'use client'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Slider from 'react-slick'
import Heading from '@/shared/Heading/Heading'


type Testimonial = {
  name: string
  avatar: string
  content: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Nguyễn Thị Mai',
    avatar: 'https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=3116&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: 'Vòng tay đá thạch anh rất đẹp, mang lại cảm giác an yên.',
  },
  {
    name: 'Trần Văn Bình',
    avatar: 'https://images.unsplash.com/photo-1551816985-074cd678b3e4?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: 'Tôi rất hài lòng với sản phẩm. Giao hàng nhanh và chất lượng.',
  },
  {
    name: 'Lê Thị Hồng',
    avatar: 'https://images.unsplash.com/photo-1597898111396-f149999e08f7?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: 'Trang sức thiết kế tinh xảo, đậm chất phong thuỷ cổ điển.',
  },
  {
    name: 'Phạm Quốc Đạt',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3096&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: 'Sản phẩm tuyệt vời, tôi sẽ quay lại mua lần nữa.',
  },
  {
    name: 'Đỗ Thị Lan',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=3096&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: 'Rất hợp phong thuỷ và sang trọng, đáng để sở hữu.',
  },
  {
    name: 'Lâm Gia Huy',
    avatar: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=3096&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: 'Shop tư vấn rất nhiệt tình, chất lượng sản phẩm vượt mong đợi.',
  },
  {
    name: 'Vũ Thị Hoa',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=3096&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: 'Mình đã mua làm quà tặng, người nhận rất thích và khen đẹp!',
  }
]

const SectionTestimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }


  return (
    <div className='my-12'>
      <Heading isMain isCenter>
        Khách hàng nói gì về chúng tôi
      </Heading>

      <Slider {...settings}>
        {testimonials.map((t, i) => (
          <div key={i.toLocaleString()} className='px-4'>
            <div className='flex h-full flex-col items-center rounded-xl bg-white p-6 text-center '>
              <img
                src={t.avatar}
                alt={t.name}
                className='mb-4 size-20 rounded-full border-4 border-indigo-100 object-cover'
              />
              <p className='text-gray-600 mb-2 italic'>{t.content}</p>
              <p className='font-bold text-indigo-700'>{t.name}</p>
            </div>
          </div>
        ))}
      </Slider>
      
    </div>
  )
}

export default SectionTestimonials