import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { urlFor } from "@/sanity/lib/image";

interface CardProps {
  card: Product;
  isLoading?: boolean;
}

const Card: React.FC<CardProps> = ({ card, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[350px] w-full" />
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-5 w-[200px]" />
      </div>
    );
  }

  return (
    <Link href={`/shop/${card.slug.current}`}>
      <div className="cursor-pointer">
        {card.image?.asset && (
          <Image
            src={urlFor(card.image.asset).url() || "/placeholder.svg"}
            alt={card.name}
            height={375}
            width={305}
            className="w-full h-[350px] object-cover"
          />
        )}
        <div className="flex flex-col gap-1 mt-4">
          <span className="font-clash text-clash-20 text-darkPrimary">
            {card.name}
          </span>
          <span className="font-satoshi text-satoshi-18 text-darkPrimary">
            ${card.price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
