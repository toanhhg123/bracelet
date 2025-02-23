"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/config/db";
import { type Product, product } from "@/config/db/schema";
import { LINKS, type SUBMIT_RESPONSE, TOAST_TYPE } from "@/utils/AppConfig";

export async function create(form: FormData): Promise<SUBMIT_RESPONSE> {
  const data = Object.fromEntries(form) as unknown as Product;

  try {
    const res = await db.insert(product).values({
      name: data.name,
      slug: data.slug,
      coverImage: "",
      currentPrice: data.currentPrice,
      previousPrice: data.previousPrice,
      category: null,
      rating: data.rating,
      reviews: 0,
      piecesSold: data.piecesSold,
      justIn: data.justIn,
    });

    // Làm mới cache của trang quản lí sản phẩm
    revalidatePath(LINKS.MANAGER_PRODUCT);

    return {
      type: TOAST_TYPE.SUCCESS,
      message: "Tạo sản phẩm thành công",
      data: res,
    };
  } catch (error) {
    console.log("error :::: ", error);
    return {
      type: TOAST_TYPE.ERROR,
      message: "Tạo sản phẩm thất bại",
    };
  }
}

export const update = async (
  form: FormData,
  id: number
): Promise<SUBMIT_RESPONSE> => {
  const data = Object.fromEntries(form) as unknown as Product;

  try {
    await db
      .update(product)
      .set({
        name: data.name,
        slug: data.slug,
        currentPrice: data.currentPrice,
        previousPrice: data.previousPrice,
        rating: data.rating,
        piecesSold: data.piecesSold,
        overview: data.overview,
      })
      .where(eq(product.id, id));

    // Làm mới cache của trang quản lí sản phẩm
    revalidatePath(LINKS.MANAGER_PRODUCT);

    return {
      type: TOAST_TYPE.SUCCESS,
      message: "thành công",
    };
  } catch (error) {
    console.log("error :::: ", error);
    return {
      type: TOAST_TYPE.ERROR,
      message: "cập nhật sản phẩm thất bại",
    };
  }
};
