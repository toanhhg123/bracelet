'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Heading from '@/shared/Heading/Heading';

import { mainPages } from './content';

const SectionMainPages = () => {
  return (
    <div className="container">
      <Heading isCenter desc={mainPages.description}>
        {mainPages.heading}
      </Heading>

      <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12">
        {mainPages.pages.map((DATA) => (
          <motion.div
            initial={{ opacity: 0, y: '50%' }}
            whileInView={{ opacity: 1, y: '0%' }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            key={DATA.pageName}
            className="relative cursor-pointer overflow-hidden rounded-xl shadow-lg"
          >
            <Link href={DATA.href}>
              {DATA.CMS && (
                <div className="absolute right-3 top-3 z-10">
                  <ButtonPrimary sizeClass="px-3 py-2">CMS</ButtonPrimary>
                </div>
              )}
              <div className="w-full overflow-hidden">
                <Image
                  src={DATA.coverImage}
                  alt="cover-image"
                  className="w-full object-cover"
                />
              </div>
              <div className="flex w-full items-center justify-center py-6 text-xl font-semibold">
                {DATA.pageName}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <ButtonPrimary className="shadow-md" sizeClass="px-5 py-4">
          Buy Template
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionMainPages;
