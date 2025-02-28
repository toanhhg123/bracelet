'use client'

import { useState } from 'react'

import ContactInfo from './ContactInfo'
import ShippingAddress from './ShippingAddress'

const RenderTab = () => {
  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id)
    setTimeout(() => {
      element?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }

  const [tabActive, setTabActive] = useState<'ContactInfo' | 'ShippingAddress'>(
    'ShippingAddress'
  )

  return (
    <div className='space-y-8'>
      <div id='ContactInfo' className='scroll-mt-24'>
        <ContactInfo
          isActive={tabActive === 'ContactInfo'}
          onOpenActive={() => {
            setTabActive('ContactInfo')
            handleScrollToEl('ContactInfo')
          }}
          onCloseActive={() => {
            setTabActive('ShippingAddress')
            handleScrollToEl('ShippingAddress')
          }}
        />
      </div>

      <div id='ShippingAddress' className='scroll-mt-24'>
        <ShippingAddress
          isActive={tabActive === 'ShippingAddress'}
          onOpenActive={() => {
            setTabActive('ShippingAddress')
            handleScrollToEl('ShippingAddress')
          }}
          onCloseActive={() => {}}
        />
      </div>

      {/* <div id='PaymentMethod' className='scroll-mt-24'>
        <PaymentMethod
          isActive={tabActive === 'PaymentMethod'}
          onOpenActive={() => {
            setTabActive('PaymentMethod')
            handleScrollToEl('PaymentMethod')
          }}
          onCloseActive={() => setTabActive('PaymentMethod')}
        />
      </div> */}
    </div>
  )
}

export default RenderTab
