import Image from "next/image";
import Link from "next/link";
import React from "react";

// Array of card data

const Card = ({
  card,
}: {
  card: { image: string; title: string; price: string };
}) => {
  return (
    <>
      <Link href={`/shop/${card.title}`}>
        <div className="cursor-pointer">
          <Image
            src={card.image}
            alt={card.title}
            height={375}
            width={305}
            className="w-full"
          />
          <div className="flex flex-col gap-1 mt-4">
            <span className="font-clash text-clash-20 text-darkPrimary">
              {card.title}
            </span>
            <span className="font-satoshi text-satoshi-18 text-darkPrimary">
              {card.price}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
