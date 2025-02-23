"use server";

import { writeFile, unlink } from "node:fs/promises";
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

  const filePath = path.join(
    process.cwd(),
    "public",
    "assets",
    "uploads",
    fileName
  );

  // Lưu file vào thư mục public/uploads
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return {
    message: "File uploaded successfully",
    type: "success",
    data: fileName,
  };
}

export async function deleteFile(fileUrl: string) {
  try {
    // Lấy tên file từ URL (ví dụ: "/uploads/12345-image.jpg")
    const fileName = path.basename(fileUrl);

    // Tạo đường dẫn tuyệt đối đến file
    const filePath = path.join(
      process.cwd(),
      "public",
      "assets",
      "uploads",
      fileName
    );

    // Xóa file
    await unlink(filePath);
    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, message: "Failed to delete file" };
  }
}
