import React from "react";
import UpdateImage from "./UpdateImage";

const page = () => {
  return (
    <div className="container my-4">
      <div className="border-b border-gray-900/10 pb-4">
        <h2 className="text-base/7 font-semibold text-gray-900">
          Chỉnh sửa sản phẩm
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      {/* update images */}
      <UpdateImage />
    </div>
  );
};

export default page;
