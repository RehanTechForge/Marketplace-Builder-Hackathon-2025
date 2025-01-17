import { ButtonMediumDark } from "@/components/buttons/buttons";
import FeaturesSection from "@/components/homePage-V1/FeaturesSection";
import WishList from "@/components/homePage-V1/WishList";
import ListingProducts from "@/components/shopDetailPage/ListingProducts";
import Image from "next/image";
import React from "react";

const ProductListingPage = () => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 py-10">
        <div>
          <Image
            src={"/detail.png"}
            alt="Detail Image"
            width={720}
            height={560}
            className="w-full md:h-[100%] object-cover"
          />
        </div>
        <div className="px-4 sm:px-10 py-6 flex flex-col space-y-6 text-[#2A254B]">
          <div>
            <h1 className="text-clash-36 font-clash">The Dandy Chair</h1>
            <p className="font-satoshi text-satoshi-18">£250</p>
          </div>
          <div className="text-satoshi-16 font-satoshi flex flex-col space-y-4">
            <h4 className="text-clash-16 font-clash mt-4">Description</h4>
            <p>
              A timeless design, with premium materials features as one of our
              most popular and iconic pieces. The dandy chair is perfect for any
              stylish living space with beech legs and lambskin leather
              upholstery.
            </p>
            <ul className="list-disc pl-10">
              <li>Premium material </li>
              <li>Handmade upholstery Quality </li>
              <li>timeless classic</li>
            </ul>
          </div>

          <div>
            <h4 className="font-clash text-clash-16 mb-8 mt-6">Dimensions</h4>
            <div className="flex gap-16">
              <div className="flex flex-col space-y-2 font-clash text-clash-14">
                <span>Height</span>
                <span className="text-[#505977]">110cm</span>
              </div>
              <div className="flex flex-col space-y-2 font-clash text-clash-14">
                <span>Height</span>
                <span className="text-[#505977]">110cm</span>
              </div>
              <div className="flex flex-col space-y-2 font-clash text-clash-14">
                <span>Height</span>
                <span className="text-[#505977]">110cm</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center w-full">
            <div className="font-clash text-clash-14 text-[#505977] flex flex-col lg:flex-row lg:gap-6 items-start lg:items-center lg:my-10 w-full">
              <span>Quantity:</span>
              <div className="bg-borderGrey px-6 flex flex-row space-x-10 py-4 text-satoshi-16 font-satoshi w-full lg:w-auto justify-between lg:justify-center">
                <span className="text-borderDark cursor-pointer">-</span>
                <span className="text-darkPrimary">1</span>
                <span className="text-borderDark cursor-pointer">+</span>
              </div>
            </div>
            <div className="w-full lg:w-auto mt-4 lg:mt-0">
              <ButtonMediumDark text="Add to cart" href="/cart" />
            </div>
          </div>
        </div>
      </section>
      <ListingProducts />
      <FeaturesSection alignText="justify-center" />
      <WishList />
    </>
  );
};

export default ProductListingPage;
