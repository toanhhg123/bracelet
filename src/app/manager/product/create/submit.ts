"use server";

import { db } from "@/config/db";
import { type Product, product } from "@/config/db/schema";
import { LINKS, type SUBMIT_RESPONSE, TOAST_TYPE } from "@/utils/AppConfig";
import { revalidatePath } from "next/cache";

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
