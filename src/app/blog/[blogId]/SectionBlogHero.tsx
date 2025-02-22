import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';

interface SectionBlogHeroProps {
  coverImage: string | StaticImageData;
  title: string;
  brief: string;
}

const SectionBlogHero: FC<SectionBlogHeroProps> = ({
  coverImage,
  title,
  brief,
}) => {
  return (
    <div className="mb-10">
      <div className="mb-16 space-y-5">
        <h1
          className="mx-auto w-[80%] text-center text-2xl font-medium md:text-[40px] lg:text-[60px]"
          style={{ lineHeight: '1.2em' }}
        >
          {title}
        </h1>
        <p className="mx-auto w-[70%] text-center text-neutral-500 lg:text-lg">
          {brief}
        </p>
      </div>
      <Image
        src={coverImage}
        alt="cover image"
        className="w-full rounded-3xl"
        width={2000}
        height={1000}
      />
    </div>
  );
};

export default SectionBlogHero;
