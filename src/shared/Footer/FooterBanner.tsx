import React from 'react';

import { footerBannerData } from '@/data/content';
import Heading from '@/shared/Heading/Heading';

import ButtonPrimary from '../Button/ButtonPrimary';

const FooterBanner = () => {
  return (
    <div className="rounded-2xl bg-[url('/bgProducts.jpg')] bg-cover bg-center bg-no-repeat py-16 text-white">
      <Heading className="mb-0" isMain isCenter>
        {footerBannerData.heading}
      </Heading>
      <p className="mx-auto w-[80%] text-center md:w-[50%]">
        {footerBannerData.description}
      </p>
      <div className="mt-10 flex items-center justify-center">
        <ButtonPrimary sizeClass="px-6 py-4">More about us</ButtonPrimary>
      </div>
    </div>
  );
};

export default FooterBanner;
