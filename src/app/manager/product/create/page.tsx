import Form from "../form";
import { create } from "./submit";

const Page = async () => {
  return (
    <div className="container my-4">
      <div className="border-gray-900/10 border-b pb-4">
        <h2 className="text-gray-900 text-base/7 font-semibold">
          Thêm sản phẩm
        </h2>
        <p className="text-gray-600 mt-1 text-sm/6">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <Form handleSubmit={create} />
    </div>
  );
};

export default Page;
