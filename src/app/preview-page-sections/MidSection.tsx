import Image from 'next/image';
import React from 'react';

// import Logo from '@/shared/Logo/Logo';
import allThemesPreview from '@/images/preview/showcase1.jpg';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';

import { midSection } from './content';

const SectionMid = () => {
  return (
    <div className="container">
      <div className="items-stretch justify-between overflow-hidden rounded-3xl bg-gray shadow-lg md:flex">
        <div className="basis-[55%]">
          <Image
            src={allThemesPreview}
            alt="cover image"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex basis-[40%] flex-col justify-center gap-7 p-5 lg:p-0 lg:pr-10">
          {/* <Logo /> */}
          <h4 className="text-2xl font-medium">{midSection.heading}</h4>
          <p className="text-neutral-500">{midSection.description}</p>
          <div>
            <ButtonPrimary
              className="shadow-md"
              sizeClass="px-5 py-4"
              href={midSection.href}
            >
              EXPLORE TEMPLATES
            </ButtonPrimary>
          </div>
        </div>
      </div>
      <div className="mt-14 flex items-center justify-center">
        <ButtonPrimary className="shadow-md" sizeClass="px-5 py-4">
          Buy Template
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionMid;
