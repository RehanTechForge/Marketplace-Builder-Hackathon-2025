import React from "react";
import ListingWrapper from "../layout/ListingWrapper";
import Card from "../cards/Card";
import { ButtonMedium } from "../buttons/buttons";
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
];
const ListingProducts = () => {
  return (
    <ListingWrapper title="you might also like">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <Card card={card} key={index} />
        ))}
      </div>
      <center>
        <ButtonMedium text="View collection" href="/" />
      </center>
    </ListingWrapper>
  );
};

export default ListingProducts;
