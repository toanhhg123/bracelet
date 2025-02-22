import Image from "next/image";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { MdStar } from "react-icons/md";
import { TbBrandPaypal } from "react-icons/tb";

import LikeButton from "@/components/LikeButton";
import { shoes } from "@/data/content";
import type { ProductType } from "@/data/types";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import InputNumber from "@/shared/InputNumber/InputNumber";

const renderProduct = (item: ProductType) => {
  const {
    name: shoeName,
    coverImage,
    currentPrice,
    slug,
    rating,
    shoeCategory,
  } = item;

  return (
    <div key={shoeName} className="flex py-5 last:pb-0">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl md:h-40 md:w-40">
        <Image
          fill
          src={coverImage}
          alt={shoeName}
          className="h-full w-full object-contain object-center"
        />
        <Link className="absolute inset-0" href={`/products/${slug}`} />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex justify-between ">
            <div>
              <h3 className="font-medium md:text-2xl ">
                <Link href={`/products/${slug}`}>{shoeName}</Link>
              </h3>
              <span className="my-1 text-sm text-neutral-500">
                {shoeCategory}
              </span>
              <div className="flex items-center gap-1">
                <MdStar className="text-yellow-400" />
                <span className="text-sm">{rating}</span>
              </div>
            </div>
            <span className="font-medium md:text-xl">${currentPrice}</span>
          </div>
        </div>
        <div className="flex w-full items-end justify-between text-sm">
          <div className="flex items-center gap-3">
            <LikeButton />
            <AiOutlineDelete className="text-2xl" />
          </div>
          <div>
            <InputNumber />
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  return (
    <div className="nc-CartPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-14">
          <h2 className="block text-2xl font-medium sm:text-3xl lg:text-4xl">
            Your Cart
          </h2>
        </div>

        <hr className="my-10 border-neutral-300 xl:my-12" />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full divide-y divide-neutral-300 lg:w-[60%] xl:w-[55%]">
            {shoes.slice(0, 3).map((item) => renderProduct(item))}
          </div>
          <div className="my-10 shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:mx-16 2xl:mx-20" />
          <div className="flex-1">
            <div className="sticky top-28">
              <h3 className="text-2xl font-semibold">Summary</h3>
              <div className="mt-7 divide-y divide-neutral-300 text-sm">
                <div className="flex justify-between pb-4">
                  <span>Subtotal</span>
                  <span className="font-semibold">$249.00</span>
                </div>
                <div className="flex justify-between py-4">
                  <span>Estimated Delivery & Handling</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between py-4">
                  <span>Estimated taxes</span>
                  <span className="font-semibold">$24.90</span>
                </div>
                <div className="flex justify-between pt-4 text-base font-semibold">
                  <span>Total</span>
                  <span>$276.00</span>
                </div>
              </div>
              <ButtonPrimary href="/checkout" className="mt-8 w-full">
                Checkout Now
              </ButtonPrimary>
              <ButtonSecondary
                className="mt-3 inline-flex w-full items-center gap-1 border-2 border-primary text-primary"
                href="/checkout"
              >
                <TbBrandPaypal className="text-2xl" />
                PayPal
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
