import { CircleUser, Heart, Menu, Search, ShoppingCart } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Form from "next/form";
import { Input } from "../ui/input";
import { SearchDropdown } from "../search/SearchDropdown";
import CartIcon from "../cart/CartIcon";
import User from "./User";
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
        {/* <DropdownMenu>
          <DropdownMenuTrigger>
            <Search className="w-[16px] h-[16px]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Search Here...</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Form action="/search">
              <Input name="query" />
              <button type="submit">Search</button>
            </Form>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <SearchDropdown />
      </div>
      <div className="capitalize font-clash text-clash-24">
        <Link href="/">avion</Link>
      </div>
      <div className="hidden md:flex gap-4 justify-center items-center">
        <Link href={"/wish-list"}>
          <Heart className="w-[24px] h-[24px]" />
        </Link>
        {/* <CartIcon /> */}
        <div className="relative">
          <Link href={"/cart"}>
            <ShoppingCart className="w-[24px] h-[24px]" />
            <CartIcon />
          </Link>
        </div>
        <User />
      </div>
      <div className="flex items-center gap-4 md:hidden">
        {/* Search Icon */}
        <SearchDropdown />

        {/* Menu and Sheet */}
        <Sheet>
          <SheetTrigger>
            <Menu className="w-5 h-5 cursor-pointer" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                <nav className="mt-4">
                  {/* Navigation Items */}
                  <NavItems items={items} className="flex flex-col space-y-4" />
                </nav>
                <div className="mt-6 flex items-center justify-between">
                  {/* Wish List */}
                  <Link href="/wish-list" className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    <span>Wish List</span>
                  </Link>
                  {/* Cart */}
                  <div className="relative flex items-center">
                    <Link href="/cart" className="flex items-center gap-2">
                      <ShoppingCart className="w-6 h-6" />
                      <CartIcon />
                    </Link>
                  </div>
                </div>
                {/* User */}
                <div className="mt-6">
                  <User />
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default TopHeader;
