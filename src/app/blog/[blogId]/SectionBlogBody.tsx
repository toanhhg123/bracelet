import Image from 'next/image';
import { pathOr } from 'ramda';
import type { FC } from 'react';
import React from 'react';

import type { BlogData } from '@/data/types';
import Heading from '@/shared/Heading/Heading';

interface SectionBlogBodyProps {
  blogData: BlogData | null;
}

const SectionBlogBody: FC<SectionBlogBodyProps> = ({ blogData }) => {
  return (
    <div className="border-t border-neutral-300 py-10">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-5">
          <Heading className="" isMain>
            {pathOr('', ['sectionOne', 'title'], blogData)}
          </Heading>
          <p className="text-neutral-500">
            {pathOr('', ['sectionOne', 'paragraph1'], blogData)}
          </p>
          <div className="ml-5 space-y-5 text-neutral-500">
            {pathOr([], ['sectionOne', 'points'], blogData).map((point) => (
              <li key={point}>{point}</li>
            ))}
          </div>
          <p className="text-neutral-500">
            {pathOr('', ['sectionOne', 'paragraph2'], blogData)}
          </p>
        </div>

        <div className="space-y-5">
          <Heading desc={pathOr('', ['sectionTwo', 'description'], blogData)}>
            {pathOr('', ['sectionTwo', 'title'], blogData)}
          </Heading>

          <div className="overflow-hidden rounded-2xl">
            <Image
              src={pathOr('', ['sectionTwo', 'midImage'], blogData)}
              width={1000}
              height={1000}
              alt="mid section image"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div>
          <Heading desc={pathOr('', ['sectionThree', 'description'], blogData)}>
            {pathOr('', ['sectionThree', 'title'], blogData)}
          </Heading>
        </div>

        <div className="space-y-5">
          <Heading desc={pathOr('', ['sectionFour', 'description'], blogData)}>
            {pathOr('', ['sectionFour', 'title'], blogData)}
          </Heading>
          <ol className="ml-5 space-y-5 text-neutral-500">
            {pathOr([], ['sectionFour', 'points'], blogData).map(
              (point, index) => (
                <li key={point}>
                  {' '}
                  <span>{index + 1}.</span>
                  {point}
                </li>
              ),
            )}
          </ol>
        </div>

        <div className="relative overflow-hidden rounded-2xl p-14 shadow-xl">
          <div className="absolute left-0 top-0 h-full w-2.5 bg-primary" />
          <div className="text-2xl font-bold text-primary">
            {pathOr('', ['quote'], blogData)}
          </div>
        </div>

        <div className="space-y-10">
          {pathOr([], ['sectionFive'], blogData).map((section) => (
            <div key={pathOr('', ['title'], section)}>
              <Heading desc={pathOr('', ['description'], section)}>
                {pathOr('', ['title'], section)}
              </Heading>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionBlogBody;
