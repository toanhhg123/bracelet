"use server";

import { writeFile } from "node:fs/promises";
import path from "node:path";

import type { SUBMIT_RESPONSE } from "@/utils/AppConfig";

export async function uploadImage(file?: File): Promise<SUBMIT_RESPONSE> {
  if (!file) {
    return { message: "No file uploaded", type: "error" };
  }

  const ext = file.name.split(".").pop();
  // Tạo tên file duy nhất
  const uniqueSuffix = `${new Date().getTime()}-${Math.round(Math.random() * 1e9)}`;
  const fileName = `${uniqueSuffix}.${ext}`;

  const filePath = path.join(process.cwd(), "public", "uploads", fileName);

  // Lưu file vào thư mục public/uploads
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return {
    message: "File uploaded successfully",
    type: "success",
    data: fileName,
  };
}
