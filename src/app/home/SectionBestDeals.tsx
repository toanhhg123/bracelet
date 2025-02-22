import React from 'react';

import CountDownTimer from '@/components/CountDownTimer';
import ProductSlider from '@/components/ProductSlider';

const SectionBestDeals = () => {
  return (
    <div className="container">
      <div className="overflow-hidden rounded-2xl bg-gray p-5">
        <div className="mb-5 items-center justify-between space-y-5 md:flex md:space-y-0">
          <h3 className="text-3xl font-medium">Top Best Deals!</h3>
          <CountDownTimer />
        </div>
        <div className="pb-2">
          <ProductSlider />
        </div>
      </div>
    </div>
  );
};

export default SectionBestDeals;
