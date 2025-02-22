import { db } from "@/config/db";
import { product } from "@/config/db/schema";
import Button from "@/shared/Button/Button";
import { IMAGES, LINKS } from "@/utils/AppConfig";
import Link from "next/link";

import React from "react";

const Page = async () => {
  // Truy vấn danh sách sản phẩm từ cơ sở dữ liệu
  const products = await db.select().from(product);

  console.log("products :::: ", products);

  return (
    <div className="container my-10">
      <div className="mb-5 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Quản lí sản phẩm
          </h3>
          <p className="text-slate-500">Xem và quản lí các sản phẩm của bạn.</p>
        </div>
        {/* Nút thêm mới sản phẩm */}
        <Link
          href="/manager/product/create"
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Thêm mới sản phẩm
        </Link>
      </div>

      <div>
        <table className="w-full text-left table-auto min-w-max">
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
            {products.map((product) => {
              product.coverImage = product.coverImage || IMAGES.NO_IMAGE;
              return (
                <tr key={product.id} className="border-b border-slate-200">
                  {/* Cột ảnh sản phẩm */}
                  <td className="p-4 relative">
                    <div
                      className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center"
                      style={{
                        backgroundImage: product.coverImage
                          ? `url(${product.coverImage})`
                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <Link
                        href={LINKS.EDIT_PRODUCT(product.id)}
                        type="button"
                        className="px-2 py-1  text-xs rounded text-blue-500 absolute bottom-1 right-4"
                      >
                        Cập nhật ảnh
                      </Link>
                    </div>
                  </td>
                  {/* Cột tên sản phẩm */}
                  <td className="p-4 text-sm text-slate-800">{product.name}</td>
                  {/* Cột giá hiện tại */}
                  <td className="p-4 text-sm text-slate-800">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.currentPrice)}
                  </td>
                  {/* Cột số lượng đánh giá */}
                  <td className="p-4 text-sm text-slate-800">
                    {product.reviews}
                  </td>
                  {/* Cột số lượng đã bán */}
                  <td className="p-4 text-sm text-slate-800">
                    {product.piecesSold}
                  </td>
                  {/* Cột hành động */}
                  <td className="p-4 text-sm text-slate-800">
                    <Link
                      href={LINKS.EDIT_PRODUCT(product.slug)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Sửa
                    </Link>
                    <Button className="text-red-500 hover:text-red-700 ml-2">
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
