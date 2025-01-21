import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="category-1" />
                <Label htmlFor="category-1">Electronics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="category-2" />
                <Label htmlFor="category-2">Clothing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="category-3" />
                <Label htmlFor="category-3">Books</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="price-1" />
                <Label htmlFor="price-1">$0 - $50</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-2" />
                <Label htmlFor="price-2">$50 - $100</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-3" />
                <Label htmlFor="price-3">$100+</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-1" />
                <Label htmlFor="rating-1">4 Stars & Up</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-2" />
                <Label htmlFor="rating-2">3 Stars & Up</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-3" />
                <Label htmlFor="rating-3">2 Stars & Up</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default Sidebar;
