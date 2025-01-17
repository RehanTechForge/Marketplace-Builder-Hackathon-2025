import React from "react";
import ProductFilters from "./ProductFilter";
import Card from "../cards/Card";

const cardData = [
  {
    image: "/cards/c1.png",
    title: "The Dandy Chair",
    price: "£250",
  },
  {
    image: "/cards/c2.png",
    title: "The Elegant Sofa",
    price: "£500",
  },
  {
    image: "/cards/c3.png",
    title: "The Cozy Armchair",
    price: "£300",
  },
  {
    image: "/cards/c4.png",
    title: "The Luxurious Bed",
    price: "£800",
  },
  {
    image: "/cards/c1.png",
    title: "The Dandy Chair",
    price: "£250",
  },
  {
    image: "/cards/c2.png",
    title: "The Elegant Sofa",
    price: "£500",
  },
  {
    image: "/cards/c3.png",
    title: "The Cozy Armchair",
    price: "£300",
  },
  {
    image: "/cards/c4.png",
    title: "The Luxurious Bed",
    price: "£800",
  },
  {
    image: "/cards/c1.png",
    title: "The Dandy Chair",
    price: "£250",
  },
];

const ProductSection = () => {
  return (
    <section className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Filters Section */}
      <div className="col-span-12 md:col-span-3">
        <ProductFilters />
      </div>

      {/* Products Section */}
      <div className="col-span-12 md:col-span-9">
        <div className="grid  grid-cols-1sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <Card card={card} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
