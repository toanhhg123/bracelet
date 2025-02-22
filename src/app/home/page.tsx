import { db } from "@/config/db";
import { product } from "@/config/db/schema";
import { desc } from "drizzle-orm";
import SectionBestDeals from "./SectionBestDeals";
import SectionBrands from "./SectionBrands";
import SectionHeader from "./SectionHeader";
import SectionProducts from "./SectionProducts";

const page = async () => {
  const topProducts = await db
    .select()
    .from(product)
    .orderBy(desc(product.rating))
    .limit(10);

  return (
    <div>
      <div className="my-7">
        <SectionHeader />
      </div>

      <div className="mb-32">
        <SectionBestDeals />
      </div>

      <div className="mb-32">
        <SectionProducts />
      </div>

      <div className="mb-32">
        <SectionBrands />
      </div>
    </div>
  );
};

export default page;
