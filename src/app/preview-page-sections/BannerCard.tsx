import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';
import { MdArrowForward } from 'react-icons/md';

import Button from '@/shared/Button/Button';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
// import Logo from '@/shared/Logo/Logo';

interface BannerCardProps {
  details: {
    heading: string;
    description: string;
    href: string;
    coverImage: StaticImageData;
    buttonName: string;
  };
  bgColor: string;
  textColor: string;
  isSecondary?: boolean;
}

const BannerCard: FC<BannerCardProps> = ({
  details,
  bgColor,
  textColor,
  isSecondary,
}) => {
  return (
    <div
      className={`flex ${bgColor} ${textColor} flex-col gap-0 overflow-hidden rounded-3xl shadow-lg`}
    >
      <div className="space-y-6 px-10 py-14">
        {/* <Logo /> */}
        <h4 className="text-2xl font-medium">{details.heading}</h4>
        <p
          className={` ${
            isSecondary ? 'text-neutral-200' : 'text-neutral-500'
          }`}
        >
          {details.description}
        </p>
        {isSecondary ? (
          <Button
            sizeClass="px-5 py-5"
            className="flex w-full items-center justify-center gap-2 bg-white text-primary"
            href={details.href}
          >
            {details.buttonName}
            <MdArrowForward className="text-2xl" />
          </Button>
        ) : (
          <ButtonPrimary
            sizeClass="px-5 py-5"
            className="flex w-full items-center justify-center gap-2"
            href={details.href}
          >
            {details.buttonName}
            <MdArrowForward className="text-2xl" />
          </ButtonPrimary>
        )}
      </div>
      <div className="overflow-hidden">
        <Image
          src={details.coverImage}
          alt="cover image"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default BannerCard;
