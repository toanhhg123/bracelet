import Link from 'next/link'
import React from 'react'

import { footerData } from '@/data/content'

import Logo from '../Logo/Logo'
import Subscribe from './Subscribe'

const Footer: React.FC = () => {
  return (
    <div>
      {/* <div className="container mb-10">
        <FooterBanner />
      </div> */}

      <div className='bg-[#d5a622] text-white'>
        <div className='container grid gap-10 py-16 lg:grid-cols-2 lg:gap-0'>
          <div className='space-y-10 md:pr-20'>
            <Logo className='block' />
            <p className=''>{footerData.description}</p>
            <Subscribe />
          </div>

          <div className='grid grid-cols-2 gap-5 md:grid-cols-3'>
            <div className='space-y-5'>
              <h4 className='text-2xl font-medium'>
                {footerData.footerLinks[0]?.title}
              </h4>
              {footerData.footerLinks[0]?.links.map((link) => (
                <div key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </div>
              ))}
            </div>
            <div>
              <div className='grid gap-5'>
                {footerData.footerLinks.slice(1, 3).map((item) => (
                  <div key={item.title} className='space-y-5'>
                    <h4 className='text-2xl font-medium'>{item.title}</h4>
                    {item.links.map((link) => (
                      <div key={link.name}>
                        <Link href={link.href}>{link.name}</Link>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className='space-y-5'>
              <h4 className='text-2xl font-medium'>
                {footerData.footerLinks[3]?.title}
              </h4>
              {footerData.footerLinks[3]?.links.map((link) => (
                <div key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
