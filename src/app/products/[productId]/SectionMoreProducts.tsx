import ProductCard from "@/components/ProductCard";
import { db } from "@/config/db";
import { product } from "@/config/db/schema";
import Heading from "@/shared/Heading/Heading";

const SectionMoreProducts = async () => {
  const products = await db.select().from(product).limit(4);

  return (
    <div>
      <Heading className="mb-0">Explore more products</Heading>

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            className="border-neutral-300"
          />
        ))}
      </div>
    </div>
  );
};

export default SectionMoreProducts;
