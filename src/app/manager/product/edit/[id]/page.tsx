import { db } from "@/config/db";
import { product } from "@/config/db/schema";
import { LINKS, TOAST_TYPE } from "@/utils/AppConfig";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import UpdateImage from "./UpdateImage";
import { uploadImage } from "./upload";

type Props = {
  params: Promise<{ id: number }>;
};

const getProductById = async (id: number) => {
  const result = await db
    .select()
    .from(product)
    .where(eq(product.id, id))
    .limit(1);

  return result[0]; // Trả về sản phẩm đầu tiên (nếu có)
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const productDB = await getProductById(id);

  if (!productDB) {
    return notFound();
  }

  const shots = productDB.shots ? (productDB.shots as unknown as string[]) : [];
  const handleUploadMainImage = async (file: File, isCoverImage: boolean) => {
    "use server";

    const res = await uploadImage(file);
    if (res.type === TOAST_TYPE.ERROR) return res;

    if (isCoverImage) {
      await db
        .update(product)
        .set({ coverImage: res.data })
        .where(eq(product.id, id));
    }

    if (!isCoverImage) {
      await db
        .update(product)
        .set({ shots: [...shots, res.data] })
        .where(eq(product.id, id));
    }

    revalidatePath(LINKS.EDIT_PRODUCT(productDB.id));

    return res;
  };

  return (
    <div className="container my-4">
      <div className="border-gray-900/10 border-b pb-4">
        <h2 className="text-gray-900 text-base/7 font-semibold">
          Chỉnh sửa sản phẩm
        </h2>
        <p className="text-gray-600 mt-1 text-sm/6">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      {/* update images */}
      <UpdateImage
        onUpload={handleUploadMainImage}
        coverImage={productDB.coverImage}
        additionalImages={shots}
      />
    </div>
  );
};

export default page;
