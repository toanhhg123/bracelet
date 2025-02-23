"use client";

import Slider from "@/shared/Slider/Slider";

import type { Product } from "@/config/db/schema";
import ProductCard from "./ProductCard";

const ProductSlider = ({ data = [] }: { data?: Product[] }) => {
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
