import React from 'react';

import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import Heading from '@/shared/Heading/Heading';

import { templateDetails } from './content';
import ImageScroll from './ImageScroll';

const Header = () => {
  return (
    <div className="">
      <div className="container">
        <Heading
          className="mb-10"
          desc={templateDetails.description}
          isMain
          isCenter
        >
          {templateDetails.name}
        </Heading>

        <div className="flex items-center justify-center gap-5">
          <ButtonPrimary className="shadow-md" sizeClass="px-6 py-4">
            Buy template
          </ButtonPrimary>
          <ButtonSecondary
            href="/#pages"
            className="border-2 border-primary text-primary shadow-md"
            sizeClass="px-6 py-3.5"
          >
            Explore pages
          </ButtonSecondary>
        </div>
      </div>

      <div className="relative mt-16">
        <div className="">
          <ImageScroll />
        </div>
      </div>
    </div>
  );
};

export default Header;
