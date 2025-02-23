import Link from "next/link";
import React from "react";

import { db } from "@/config/db";
import { product } from "@/config/db/schema";
import Button from "@/shared/Button/Button";
import { IMAGES, LINKS, renderUploadImage } from "@/utils/AppConfig";

const Page = async () => {
  // Truy vấn danh sách sản phẩm từ cơ sở dữ liệu
  const products = await db.select().from(product);

  return (
    <div className="container my-10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Quản lí sản phẩm
          </h3>
          <p className="text-slate-500">Xem và quản lí các sản phẩm của bạn.</p>
        </div>
        {/* Nút thêm mới sản phẩm */}
        <Link
          href="/manager/product/create"
          className="rounded bg-primary px-4 py-2 text-white"
        >
          Thêm mới sản phẩm
        </Link>
      </div>

      <div>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="border-b border-slate-300 bg-slate-50">
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Ảnh sản phẩm
              </th>
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Tên sản phẩm
              </th>
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Giá hiện tại
              </th>
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Số lượng đánh giá
              </th>
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Số lượng đã bán
              </th>
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const image = p.coverImage
                ? renderUploadImage(p.coverImage)
                : IMAGES.NO_IMAGE;
              return (
                <tr key={p.id} className="border-b border-slate-200">
                  {/* Cột ảnh sản phẩm */}
                  <td className="relative p-4">
                    <div
                      className="bg-gray-200 flex size-16 items-center justify-center rounded"
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <Link
                        href={LINKS.EDIT_PRODUCT(p.id)}
                        type="button"
                        className="absolute bottom-1  right-4 rounded px-2 py-1 text-xs text-blue-500"
                      >
                        Cập nhật ảnh
                      </Link>
                    </div>
                  </td>
                  {/* Cột tên sản phẩm */}
                  <td className="p-4 text-sm text-slate-800">{p.name}</td>
                  {/* Cột giá hiện tại */}
                  <td className="p-4 text-sm text-slate-800">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(p.currentPrice)}
                  </td>
                  {/* Cột số lượng đánh giá */}
                  <td className="p-4 text-sm text-slate-800">{p.reviews}</td>
                  {/* Cột số lượng đã bán */}
                  <td className="p-4 text-sm text-slate-800">{p.piecesSold}</td>
                  {/* Cột hành động */}
                  <td className="p-4 text-sm text-slate-800">
                    <Link
                      href={LINKS.EDIT_PRODUCT(p.slug)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Sửa
                    </Link>
                    <Button className="ml-2 text-red-500 hover:text-red-700">
                      Xóa
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
