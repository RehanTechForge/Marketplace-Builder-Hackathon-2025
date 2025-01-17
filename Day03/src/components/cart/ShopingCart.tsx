"use client";

import Image from "next/image";
import { useState } from "react";
import { ButtonMediumDark } from "../buttons/buttons";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Graystone vase",
    description: "A timeless ceramic vase with a tri color grey glaze.",
    price: 85,
    image: "/c1.png",
  },
  {
    id: 2,
    name: "Basic white vase",
    description: "Beautiful and simple this is one for the classics",
    price: 125,
    image: "/c2.png",
  },
];

export default function ShoppingCart() {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
    }
  };

  const subtotal = products.reduce(
    (sum, product) => sum + product.price * quantities[product.id],
    0
  );

  return (
    <div className={`min-h-screen bg-white p-4 md:p-6 font-satoshi`}>
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 font-clash text-clash-24 sm:text-clash-36">
          Your shopping cart
        </h1>

        {/* Desktop Header - Hidden on Mobile */}
        <div className="mb-8 hidden grid-cols-[2fr,1fr,1fr] gap-4 md:grid">
          <div className="font-clash text-clash-14">Product</div>
          <div className="text-center font-clash text-clash-14">Quantity</div>
          <div className="text-right font-clash text-clash-14">Total</div>
        </div>

        {/* Product List */}
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-1 gap-4 border-b border-gray-200 pb-4 md:grid-cols-[2fr,1fr,1fr] md:items-center"
            >
              {/* Product Info */}
              <div className="flex gap-4">
                <div className="h-42 w-28 flex-shrink-0 overflow-hidden rounded-none bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={96}
                    height={140}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-clash text-clash-20">{product.name}</h3>
                  <p className="mt-1 text-sm text-satoshi-14 font-satoshi">
                    {product.description}
                  </p>
                  <p className="mt-1 text-satoshi-14 font-satoshi">
                    £{product.price}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-start md:justify-center">
                <div className="bg-borderGrey px-6 flex flex-row space-x-10 py-4 text-satoshi-16 font-satoshi w-full lg:w-auto justify-between lg:justify-center">
                  <span
                    className="text-borderDark cursor-pointer"
                    onClick={() =>
                      updateQuantity(product.id, quantities[product.id] - 1)
                    }
                  >
                    -
                  </span>
                  <span className="text-darkPrimary">
                    {quantities[product.id]}
                  </span>
                  <span
                    className="text-borderDark cursor-pointer"
                    onClick={() =>
                      updateQuantity(product.id, quantities[product.id] + 1)
                    }
                  >
                    +
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="text-right">
                £{(product.price * quantities[product.id]).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="flex items-end  flex-col mt-8 space-y-4">
          <div className=" flex gap-4 items-center">
            <span className="text-primary font-clash text-clash-20">
              Subtotal
            </span>
            <span className="text-clash-24 font-clash">
              £{subtotal.toFixed(2)}
            </span>
          </div>
          <p className=" text-primary font-satoshi text-satoshi-14">
            Taxes and shipping are calculated at checkout
          </p>
          <ButtonMediumDark text="Go to checkout" href="/" />
        </div>
      </div>
    </div>
  );
}
