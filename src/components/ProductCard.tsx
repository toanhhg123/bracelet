import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import React from "react";

import type { Product } from "@/config/db/schema";
import { formatCurrency, IMAGES, renderUploadImage } from "@/utils/AppConfig";

import LikeButton from "./LikeButton";

interface ProductCardProps {
  product: Product;
  className?: string;
  showPrevPrice?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
  className,
  showPrevPrice = false,
}) => {
  const image = product.coverImage
    ? renderUploadImage(product.coverImage)
    : IMAGES.NO_IMAGE;

  return (
    <div
      className={`transitionEffect relative rounded-2xl p-3 shadow-md ${className}`}
    >
      <div className="h-[250px] w-full overflow-hidden rounded-2xl lg:h-[220px] 2xl:h-[300px]">
        {product.justIn && (
          <div className="absolute left-6 top-0 rounded-b-lg bg-primary px-3 py-2 text-sm uppercase text-white shadow-md">
            Mới về!
          </div>
        )}
        <LikeButton className="absolute right-2 top-2" />
        <Link
          className="h-[250px] w-full lg:h-[220px]"
          href={`/products/${product.slug}`}
        >
          <Image
            src={image}
            alt={`${product.name} cover photo`}
            className="size-full object-cover object-bottom"
            width={1000}
            height={1000}
          />
        </Link>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{product.name}</h3>
          <p
            className={`text-neutral-500 ${
              showPrevPrice ? "block" : "hidden"
            } text-sm line-through`}
          >
            {product.previousPrice && formatCurrency(product.previousPrice)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            Đã bán: {product.piecesSold}
          </p>
          <p className="text-lg font-medium text-primary">
            {formatCurrency(product.currentPrice)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
