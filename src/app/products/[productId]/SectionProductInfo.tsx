import type { FC } from "react";
import React from "react";

import type { Product } from "@/config/db/schema";

import ProductInfoTab from "./ProductInfoTab";
import Ratings from "./Ratings";

interface SectionProductInfoProps {
  product: Product;
}

const SectionProductInfo: FC<SectionProductInfoProps> = ({ product }) => {
  return (
    <div className="grid gap-16 lg:grid-cols-2">
      <ProductInfoTab
        overview={product.overview ?? ""}
        note={product.overview ?? ""}
        shipment_details={[]}
      />
      <Ratings rating={product.rating} reviews={product.reviews} />
    </div>
  );
};

export default SectionProductInfo;
