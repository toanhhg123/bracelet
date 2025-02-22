'use client';

import { motion } from 'framer-motion';
import React from 'react';

import BannerCard from './BannerCard';
import { buyOrExplore } from './content';

const BuyOrExplore = () => {
  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: '50%' }}
        whileInView={{ opacity: 1, y: '0%' }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid gap-10 lg:grid-cols-2"
      >
        {buyOrExplore.map((sectionData, index) =>
          index === 0 ? (
            <BannerCard
              key={sectionData.heading}
              details={sectionData}
              bgColor="bg-primary"
              textColor="text-white"
              isSecondary
            />
          ) : (
            <BannerCard
              key={sectionData.heading}
              details={sectionData}
              bgColor="bg-white"
              textColor="text-black"
            />
          ),
        )}
      </motion.div>
    </div>
  );
};

export default BuyOrExplore;
