import { Products } from "@/components/products/Products";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import Sidebar from "@/components/ui/sidebar";
import { EnrichedProducts } from "@/types/types";
import axios from "axios";
import { Suspense } from "react";

// agregar filtros
// necesito entender como al apretar un check, se agrega un filtro a la peticion
// obviamente se como hacer un check y hacer un replace en la url
//
// agregar paginacion
// agregar offset y limit y ver como sacar el numero max de pags para hacer los botones de la paginacion.

interface SearchProps {
  searchParams: { [key: string]: string | undefined };
}

const normalizeText = (text: string): string => {
  return text
    .replace(/[-_]/g, "")
    .replace(/[^\w\s]/g, "")
    .toLowerCase();
};
const Home: React.FC<SearchProps> = async ({ searchParams }) => {
  const productsData = await axios.get("http://localhost:4000/product");
  const products: EnrichedProducts[] = productsData.data;

  let filteredProducts: EnrichedProducts[] = [];
  console.log("productos", products);

  if (products) {
    filteredProducts = products.filter((product) =>
      normalizeText(product.name).includes(normalizeText(searchParams.q || ""))
    );
  }
  // searchParams.get("q")?.toString()
  return (
    <div className="flex">
      <section className="w-1/4">
        <Sidebar />
      </section>
      <section className="w-3/4 p-4">
        <Suspense
          fallback={<ProductSkeleton extraClassname="" numberProducts={18} />}
        >
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-auto-fill-250 gap-4">
              <Products products={filteredProducts} extraClassname="" />
            </div>
          ) : (
            <h3 className="text-sm text-center">
              No products found for &quot;{searchParams.q}&quot;
            </h3>
          )}
        </Suspense>
      </section>
    </div>
  );
};

export default Home;
