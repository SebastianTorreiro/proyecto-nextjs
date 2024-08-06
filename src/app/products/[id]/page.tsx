import { Products } from "@/components/products/Products";
import { SingleProduct } from "@/components/products/SingleProduct";
// import { getProduct, getRandomProducts } from "@/app/actions";
import { authOptions } from "@/components/libs/auth";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import SingleProductSkeleton from "@/components/skeletons/SingleProductSkeleton";
import {
  EnrichedProducts,
  ProductDocument,
  VariantsDocument,
} from "@/types/types";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";
import axios from "axios";

type Props = {
  params: {
    id: string;
  };
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// export async function generateMetadata({ params }: Props) {
//   const product: ProductDocument = await getProduct(params.id);
//   const capitalizedName = capitalizeFirstLetter(product.name);

//   return {
//     title: `${capitalizedName} | Ecommerce Template`,
//     description: product.description,
//   };
// }

const ProductPage = async ({ params }: Props) => {
  console.log("el _id del params es : ", params.id);
  return (
    <section className="pt-14">
      <Suspense
        fallback={
          <div>
            <SingleProductSkeleton />
            <h2 className="mt-24 mb-5 text-xl font-bold sm:text-2xl">
              YOU MIGHT ALSO LIKE...
            </h2>
            <ProductSkeleton
              extraClassname={"colums-mobile"}
              numberProducts={6}
            />
          </div>
        }
      >
        <AllProducts id={params.id} />
      </Suspense>
    </section>
  );
};
// https://res.cloudinary.com/dlvpftdsm/image/upload/c_fill,w_640,h_960,g_auto/v1716674212/_44fc4cd2-a680-43fd-8b90-4dda56d41e57_jzc4bg.jpg
// https://res.cloudinary.com/dlvpftdsm/image/upload/v1716686941/_44fc4cd2-a680-43fd-8b90-4dda56d41e57_jzc4bg_c_fill_w_640_h_960_g_auto_bbqpan.jpg
const variant1: VariantsDocument = {
  priceId: "asd",
  color: "White",
  images: [
    "t_640x960/v1716686941/_44fc4cd2-a680-43fd-8b90-4dda56d41e57_jzc4bg_c_fill_w_640_h_960_g_auto_bbqpan.jpg",
    "t_640x960/v1716648069/blancos%20pixelbay/realistic_skybox_8f15fbc0_cy9joi.png",
    "t_640x960/v1716648068/blancos%20pixelbay/realistic_skybox_16614d24_u37nnc.png",
    "t_640x960/v1716648068/blancos%20pixelbay/realistic_skybox_65748b33_lud0mn.png",
  ],
};
const variant2: VariantsDocument = {
  priceId: "asd",
  color: "Black",
  images: [
    "t_640x960/v1716648069/negros%20pixelbay/realistic_skybox_e3db6998_vhxkoq.png",
    "t_640x960/v1716648068/negros%20pixelbay/realistic_skybox_7982fc57_uhnjrg.png",
    "t_640x960/v1716648068/negros%20pixelbay/realistic_skybox_17c8aae3_xdxdv8.png",
    "t_640x960/v1716648068/negros%20pixelbay/realistic_skybox_8b1fb4c2_yfgyco.png",
  ],
};

const AllProducts = async ({ id }: { id: string }) => {
  const session: Session | null = await getServerSession(authOptions);
  // const product: ProductDocument = await getProduct(id);
  const productsData = await axios.get(`http://localhost:4000/product/${id}`);
  console.log(productsData.data);

  const productJSON: ProductDocument = {
    name: "Ergonomic Office Chair 2",
    description:
      "A comfortable and adjustable ergonomic office chair suitable for long hours of work.",
    category: "Office Furniture",
    sizes: ["Standard"],
    quantity: 5,
    purchased: false,
    price: 150,
    variants: [variant1, variant2],
    image: ["v1716674212/_44fc4cd2-a680-43fd-8b90-4dda56d41e57_jzc4bg.jpg"],
  };

  const randomProducts: EnrichedProducts[] = [
    {
      name: "example name here with string type",
      category: "example category here with string type",
      color: "example color here with number type",
      size: "example size here with string type",
      _id: "example _id here with string type",
      quantity: 2,
      purchased: false,
      price: 10,
      image: ["v1716674212/_44fc4cd2-a680-43fd-8b90-4dda56d41e57_jzc4bg.jpg"],
    },
    {
      name: "example name here with string type",
      category: "example category here with string type",
      color: "example color here with number type",
      size: "example size here with string type",
      _id: "example _id here with string type",
      quantity: 2,
      purchased: false,
      price: 10,
      image: ["v1716674210/_622a2913-6987-433f-b2ee-10859e11643a_u2rjpx.jpg"],
    },
    {
      name: "example name here with string type",
      category: "example category here with string type",
      color: "example color here with number type",
      size: "example size here with string type",
      _id: "example _id here with string type",
      quantity: 2,
      purchased: false,
      price: 10,
      image: ["v1716674192/_efd8eb64-e873-4d5e-bedb-8750986f0e47_imh9p1.jpg"],
    },
    {
      name: "example name here with string type",
      category: "example category here with string type",
      color: "example color here with number type",
      size: "example size here with string type",
      _id: "example _id here with string type",
      quantity: 2,
      purchased: false,
      price: 10,
      image: ["v1716674192/_0a7f22c8-6cdc-4efb-b0f8-474da4c418b4_swzrbk.jpg"],
    },
    {
      name: "example name here with string type",
      category: "example category here with string type",
      color: "example color here with number type",
      size: "example size here with string type",
      _id: "example _id here with string type",
      quantity: 2,
      purchased: false,
      price: 10,
      image: [
        "v1716648069/negros%20pixelbay/realistic_skybox_e3db6998_vhxkoq.png",
      ],
    },
    {
      name: "example name here with string type",
      category: "example category here with string type",
      color: "example color here with number type",
      size: "example size here with string type",
      _id: "example _id here with string type",
      quantity: 2,
      purchased: false,
      price: 10,
      image: ["v1716674192/_4eb3e868-fc14-46e3-9509-a499c1a03c35_zxezit.jpg"],
    },
  ];

  //   export interface ProductDocument extends Document {
  //     name: string;
  //     description: string;
  //     price: number;
  //     category: string;
  //     sizes: [string];
  //     image: [string];
  //     variants: [VariantsDocument];
  //     quantity: number;
  //     purchased: boolean;
  // }
  // export interface VariantsDocument {
  //   priceId: string;
  //   color: string;
  //   images: [string];
  // }
  return (
    <>
      <SingleProduct product={productJSON} session={session} />

      <h2 className="mt-24 mb-5 text-xl font-bold sm:text-2xl">
        YOU MIGHT ALSO LIKE...
      </h2>

      {/* <Products
        products={randomProducts}
        //  extraClassname={"colums-mobile"}
      /> */}
    </>
  );
};

export default ProductPage;
