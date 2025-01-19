import React from "react";
import NavItems from "./NavItems"; // Import the NavItems component

const items = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
  { label: "Shop", link: "/shop" },

  // { label: "Home V2", link: "/home-v1" },
  // { label: "About V1", link: "/about" },
  // { label: "About V2", link: "/about-v2" },
  // { label: "Cart V2", link: "/cart-v2" },
  // { label: "Shop V1", link: "/shop" },
  // { label: "Shop V2", link: "/shop-v2" },
  // { label: "Shop V3", link: "/shop-v3" },
];

const Navbar = () => {
  return (
    <nav className="flex justify-center my-2">
      <ul className="hidden md:flex space-x-4">
        {/* Use the NavItems component */}
        <NavItems items={items} className="flex my-2 space-x-4" />
      </ul>
    </nav>
  );
};

export default Navbar;
