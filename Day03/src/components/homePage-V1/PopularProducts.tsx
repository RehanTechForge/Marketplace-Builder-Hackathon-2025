// import React from "react";
// import ListingWrapper from "../layout/ListingWrapper";
// import Card from "../cards/Card";
// import Image from "next/image";
// import { ButtonMedium } from "../buttons/buttons";
// import Link from "next/link";

// const PopularProducts = () => {
//   return (
//     <ListingWrapper title="Our popular products">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {/* Large Image Section */}

//         <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col items-center cursor-pointer">
//           <Image
//             src={"/cards/Large.png"}
//             alt="Large Image"
//             height={375}
//             width={630}
//             className="w-full h-auto object-cover"
//           />

//           <div className="flex flex-col gap-2 mt-4 text-center">
//             <Link href={`/shop/The-Poplar-suede-sofa`}>
//               <span className="font-clash text-clash-20">
//                 The Poplar suede sofa
//               </span>
//             </Link>
//             <span className="font-satoshi text-satoshi-18">£980</span>
//           </div>
//         </div>

//         {/* Card 1 */}
//         <div className="col-span-1">
//           <Card
//             card={{
//               title: "The Dandy chair",
//               price: "£250",
//               image: "/cards/c1.png",
//             }}
//           />
//         </div>

//         {/* Card 2 */}
//         <div className="col-span-1">
//           <Card
//             card={{
//               title: "The Dandy chair",
//               price: "£250",
//               image: "/cards/c5.png",
//             }}
//           />
//         </div>
//       </div>

//       {/* Button Section */}
//       <div className="mt-6 flex justify-center">
//         <ButtonMedium text="View collection" href="/" />
//       </div>
//     </ListingWrapper>
//   );
// };

// export default PopularProducts;
import React from "react";
import ListingWrapper from "../layout/ListingWrapper";
import Card from "../cards/Card";
import Image from "next/image";
import { ButtonMedium } from "../buttons/buttons";
import Link from "next/link";
import { getPopularProducts } from "@/sanity/products/getPopularProducts";
import { Product } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

const PopularProducts = async () => {
  const popularProducts = await getPopularProducts();

  console.log(popularProducts.length);

  if (popularProducts.length === 0) {
    return null; // Or you could return a message saying no popular products found
  }

  const [mainProduct, ...otherProducts] = popularProducts;

  return (
    <ListingWrapper title="Our popular products">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Large Image Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col items-center cursor-pointer">
          <Image
            src={urlFor(mainProduct.image.asset).url() || "/placeholder.svg"}
            alt={mainProduct.name}
            height={375}
            width={630}
            className="w-full h-[350px] object-cover"
          />

          <div className="flex flex-col gap-2 mt-4 text-center">
            <Link href={`/shop/${mainProduct.slug.current}`}>
              <span className="font-clash text-clash-20">
                {mainProduct.name}
              </span>
            </Link>
            <span className="font-satoshi text-satoshi-18">
              £{mainProduct.price}
            </span>
          </div>
        </div>

        {/* Other Products */}
        {otherProducts.map((product: Product) => (
          <div key={product._id} className="col-span-1">
            <Card card={product} />
          </div>
        ))}
      </div>

      {/* Button Section */}
      <div className="mt-6 flex justify-center">
        <ButtonMedium text="View collection" href="/shop" />
      </div>
    </ListingWrapper>
  );
};

export default PopularProducts;
