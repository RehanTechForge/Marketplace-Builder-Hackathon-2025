import { CircleUser, Menu, Search, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import NavItems from "./NavItems"; // Import the NavItems component
import Link from "next/link";

const items = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
  { label: "Shop", link: "/shop" },
  // { label: "Home V1", link: "/" },
  // { label: "Home V2", link: "/home-v1" },
  // { label: "About V1", link: "/about" },
  // { label: "About V2", link: "/about-v2" },
  // { label: "Cart V2", link: "/cart-v2" },
  // { label: "Shop V1", link: "/shop" },
  // { label: "Shop V2", link: "/shop-v2" },
  // { label: "Shop V3", link: "/shop-v3" },
];

const TopHeader = () => {
  return (
    <div className="border-b-none sm:border-b border-[#e5e5e5] flex justify-between items-center py-2">
      <div className="hidden md:block">
        <Search className="w-[16px] h-[16px]" />
      </div>
      <div className="capitalize font-clash text-clash-24">
        <Link href="/">avion</Link>
      </div>
      <div className="hidden md:flex gap-4">
        <Link href={"/cart"}>
          <ShoppingCart className="w-[16px] h-[16px]" />
        </Link>
        <CircleUser className="w-[16px] h-[16px]" />
      </div>
      <div className="flex gap-4 md:hidden">
        <Search className="w-[16px] h-[16px]" />
        <Sheet>
          <SheetTrigger>
            <Menu className="w-[16px] h-[16px]" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                <nav>
                  {/* Use the NavItems component */}
                  <NavItems
                    items={items}
                    className="flex flex-col md:hidden space-y-4"
                  />
                </nav>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default TopHeader;
