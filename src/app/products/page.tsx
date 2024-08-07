import { Products } from "@/components/products/Products";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import Sidebar, { Filters } from "@/components/ui/sidebar";
import { EnrichedProducts } from "@/types/types";
import axios from "axios";
import { Suspense, useState } from "react";

// agregar filtros
// necesito entender como al apretar un check, se agrega un filtro a la peticion
// obviamente se como hacer un check y hacer un replace en la url
//
// agregar paginacion
// agregar offset y limit y ver como sacar el numero max de pags para hacer los  botones de la paginacion.

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
  // quiero ver si puedo regular la cantidad de items por pagina segun el ancho de la pantalla.
  //

  // // hecho con chat GPT. MEJORAR. INICIO
  const params = new URLSearchParams();
  (Object.keys(searchParams) as (keyof Filters)[]).forEach((key) => {
    if (searchParams[key]) {
      params.set(key, searchParams[key]);
    }
  });

    // Object.entries(searchParams)
  // // hecho con chat GPT. MEJORAR. Final
  // console.log("params", searchParams);

  const paramSearch = {
    q: searchParams?.q,
    minPrice: searchParams?.minPrice,
    maxPrice: searchParams?.maxPrice,
    woodType: searchParams?.woodType,
    sortByPrice: searchParams?.sortByPrice,
    sortByName: searchParams?.sortByName,
  };

  // const [paramSearch, setFilters] = useState({
  //   name: searchParams.q ? searchParams.q : "",
  //   minPrice: searchParams.minPrice ? searchParams.minPrice : "",
  //   maxPrice: searchParams.maxPrice ? searchParams.maxPrice : "",
  //   woodType: searchParams.woodType ? searchParams.woodType : "",
  //   sortByPrice: searchParams.sortByPrice ? searchParams.sortByPrice : "",
  //   sortByName: searchParams.sortByName ? searchParams.sortByName : "",
  // });

  const queryString = paramSearch.toString();
  console.log("query string", paramSearch);
  let defaultPage: number = 1;
  let defaultLimit: number = 10;

  // const productsData = await axios.get("http://localhost:4000/product");

  const res = await axios.get(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/product?page=${defaultPage}&limit=${defaultLimit}&name=${normalizeText(
      searchParams.q || ""
    )}&${queryString}`
  );
  const { results, limit, page, total } = res.data;

  // console.log(res.data);

  // searchParams.get("q")?.toString()
  return (
    <div className="flex">
      <section className="w-1/3">
        {/* <Sidebar filter={paramSearch} /> */}
      </section>
      <section className="w-3/4 p-4">
        <Suspense
          fallback={<ProductSkeleton extraClassname="" numberProducts={18} />}
        >
          {results?.length > 0 ? (
            <div className="grid grid-cols-auto-fill-250 gap-4">
              <Products
                products={results}
                sizeOption="medium"
                limit={limit}
                page={page}
                totalItems={total}
              />
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
