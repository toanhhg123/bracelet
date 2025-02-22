import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';
import { MdStar } from 'react-icons/md';
import { PiSealCheckFill } from 'react-icons/pi';

import ButtonSecondary from '@/shared/Button/ButtonSecondary';

interface BrandCardProps {
  brandName: string;
  rating: number;
  reviews: number;
  followers: number;
  visitLink: string;
  logo: StaticImageData;
  shoes: StaticImageData[];
}

const BrandCard: FC<BrandCardProps> = ({
  brandName,
  rating,
  reviews,
  followers,
  visitLink,
  logo,
  shoes,
}) => {
  return (
    <div className="rounded-2xl border border-neutral-300 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-20 w-20 overflow-hidden rounded-lg">
            <Image
              src={logo}
              alt="logo"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div>
            <h3 className="flex items-center gap-1 text-lg font-medium">
              {brandName} <PiSealCheckFill className="text-blue-600" />
            </h3>
            <div className="flex items-center gap-1">
              <MdStar className="text-yellow-400" />
              <p className="text-sm">
                {rating}{' '}
                <span className="text-neutral-500">{`(${reviews} Reviews)`}</span>
              </p>
            </div>
            <p className="text-sm text-neutral-500">{followers}M Followers</p>
          </div>
        </div>

        <ButtonSecondary
          className="border-2 border-primary text-primary"
          href={visitLink}
        >
          Visit
        </ButtonSecondary>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {shoes.map((shoe) => (
          <div
            key={shoe.src}
            className="h-[150px] overflow-hidden rounded-lg bg-gray"
          >
            <Image
              src={shoe}
              alt="shoe"
              className="h-full w-full object-cover object-bottom"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandCard;
