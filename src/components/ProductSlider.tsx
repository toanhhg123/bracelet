'use client';

import React from 'react';

import { shoes } from '@/data/content';
import Slider from '@/shared/Slider/Slider';

import ProductCard from './ProductCard';

const data = shoes.slice(3, 9);

const ProductSlider = () => {
  return (
    <div className="">
      <Slider
        itemPerRow={4}
        data={data}
        renderItem={(item) => {
          if (!item) {
            return null;
          }
          return (
            <ProductCard showPrevPrice product={item} className="bg-white" />
          );
        }}
      />
    </div>
  );
};

export default ProductSlider;
