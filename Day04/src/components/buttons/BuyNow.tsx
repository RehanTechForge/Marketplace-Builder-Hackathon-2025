import { Product } from "@/lib/types";
import Link from "next/link";
import React from "react";

const BuyNow = ({ product }: { product: Product }) => {
  return (
    <button
      className="bg-darkPrimary text-white w-[150px] font-satoshi text-satoshi-16 my-6 inline-block text-center capitalize disabled:bg-primary disabled:cursor-not-allowed mr-24 px-4 rounded-sm py-2 "
      disabled={product.quantity === 0 || product.quantity <= 0}
    >
      Buy Now
    </button>
  );
};

export default BuyNow;
