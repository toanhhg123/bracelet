import { pathOr } from "ramda";

import { db } from "@/config/db";
import { product } from "@/config/db/schema";
import { IMAGES, renderUploadImage } from "@/utils/AppConfig";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import SectionMoreProducts from "./SectionMoreProducts";
import SectionNavigation from "./SectionNavigation";
import SectionProductHeader from "./SectionProductHeader";
import SectionProductInfo from "./SectionProductInfo";

type Props = {
  params: Promise<{ productId: string }>;
};

const getProductData = async (slug: string) => {
  const productDB = await db
    .select()
    .from(product)
    .where(eq(product.slug, slug))
    .limit(1);
  return productDB[0];
};

const SingleProductPage = async (props: Props) => {
  const { productId } = await props.params;
  const selectedProduct = await getProductData(productId);

  if (!selectedProduct) {
    return notFound();
  }

  selectedProduct.coverImage = selectedProduct.coverImage
    ? renderUploadImage(selectedProduct.coverImage)
    : IMAGES.NO_IMAGE;

  selectedProduct.shots = selectedProduct.shots
    ? (selectedProduct.shots as string[]).map((shot: string) =>
        renderUploadImage(shot)
      )
    : [];

  selectedProduct.shots = [
    selectedProduct.coverImage,
    ...(selectedProduct.shots as string[]),
  ];

  return (
    <div className="container">
      <SectionNavigation />

      <div className="mb-20">
        <SectionProductHeader
          shots={pathOr([], ["shots"], selectedProduct)}
          shoeName={pathOr("", ["shoeName"], selectedProduct)}
          prevPrice={pathOr(0, ["previousPrice"], selectedProduct)}
          currentPrice={pathOr(0, ["currentPrice"], selectedProduct)}
          rating={pathOr(0, ["rating"], selectedProduct)}
          pieces_sold={pathOr(0, ["pieces_sold"], selectedProduct)}
          reviews={pathOr(0, ["reviews"], selectedProduct)}
        />
      </div>

      <div className="mb-28">
        <SectionProductInfo
          overview={pathOr("", ["overview"], selectedProduct)}
          shipment_details={pathOr([], ["shipment_details"], selectedProduct)}
          ratings={pathOr(0, ["rating"], selectedProduct)}
          reviews={pathOr(0, ["reviews"], selectedProduct)}
        />
      </div>

      <div className="mb-28">
        <SectionMoreProducts />
      </div>
    </div>
  );
};

export default SingleProductPage;
