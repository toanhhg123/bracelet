import Form from "./form";
import { create } from "./submit";

const Page = async () => {
  return (
    <div className="container my-4">
      <Form handleSubmit={create} />
    </div>
  );
};

export default Page;
