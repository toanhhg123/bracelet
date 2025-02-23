import React from "react";

import CountDownTimer from "@/components/CountDownTimer";
import ProductSlider from "@/components/ProductSlider";

import { db } from "@/config/db";
import { product } from "@/config/db/schema";

const SectionBestDeals = async () => {
  const data = await db.select().from(product).limit(4);

  return (
    <div className="container">
      <div className="overflow-hidden rounded-2xl bg-gray p-5">
        <div className="mb-5 items-center justify-between space-y-5 md:flex md:space-y-0">
          <h3 className="text-3xl font-medium">Top Best Deals!</h3>
          <CountDownTimer />
        </div>
        <div className="pb-2">
          <ProductSlider data={data} />
        </div>
      </div>
    </div>
  );
};

export default SectionBestDeals;
