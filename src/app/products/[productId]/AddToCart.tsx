"use client";

import React, { useTransition } from "react";
import toast from "react-hot-toast";
import { BsBag } from "react-icons/bs";

import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import type { SUBMIT_RESPONSE } from "@/utils/AppConfig";

type Props = {
  handleAddToCart: (productId: number) => Promise<SUBMIT_RESPONSE>;
  productId: number;
};

const AddToCart = ({ handleAddToCart, productId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const addToCart = async () => {
    startTransition(async () => {
      const response = await handleAddToCart(productId);
      toast[response.type](response.message);
    });
  };

  return (
    <ButtonSecondary
      onClick={addToCart}
      className="flex w-full items-center gap-1 border-2 border-primary text-primary"
      disabled={isPending}
    >
      <BsBag /> Thêm vào giỏ hàng
    </ButtonSecondary>
  );
};

export default AddToCart;
