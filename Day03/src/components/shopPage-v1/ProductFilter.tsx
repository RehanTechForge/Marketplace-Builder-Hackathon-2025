"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterSection {
  title: string;
  options: {
    label: string;
    value: string;
    selected?: boolean;
  }[];
}

const filterSections: FilterSection[] = [
  {
    title: "Product type",
    options: [
      { label: "Furniture", value: "furniture" },
      { label: "Homeware", value: "homeware", selected: true },
      { label: "Sofas", value: "sofas" },
      { label: "Homeware", value: "homeware2" },
      { label: "Light fittings", value: "light-fittings" },
      { label: "Accessories", value: "accessories" },
    ],
  },
  {
    title: "Price",
    options: [
      { label: "0 - 100", value: "0-100" },
      { label: "101 - 250", value: "101-250" },
      { label: "250 +", value: "250-plus" },
    ],
  },
  {
    title: "Designer",
    options: [
      { label: "Robert Smith", value: "robert-smith" },
      { label: "Liam Gallagher", value: "liam-gallagher" },
      { label: "Biggie Smalls", value: "biggie-smalls" },
      { label: "Thom Yorke", value: "thom-yorke" },
    ],
  },
];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function ProductFilters() {
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set(
      filterSections.flatMap((section) =>
        section.options
          .filter((option) => option.selected)
          .map((option) => option.value)
      )
    )
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);

  const toggleFilter = (value: string) => {
    setSelectedFilters((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  return (
    <>
      {/* Mobile Filters */}
      <div className="sticky top-0 z-40 flex w-full border-b border-gray-200 bg-white md:hidden text-clash-16 font-clash text-darkPrimary">
        <button
          onClick={() => {
            setIsFilterOpen(!isFilterOpen);
            setIsSortOpen(false);
          }}
          className="flex w-1/2 items-center justify-center border-r border-gray-200 py-4 text-sm font-medium"
        >
          Filters
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        <button
          onClick={() => {
            setIsSortOpen(!isSortOpen);
            setIsFilterOpen(false);
          }}
          className="flex w-1/2 items-center justify-center py-4 text-sm font-medium"
        >
          Sorting
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
      </div>

      {/* Mobile Filter Panel */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-white px-4 pt-16 md:hidden  text-satoshi-16 font-satoshi text-darkPrimary">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-lg font-medium">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-sm text-gray-500"
            >
              Done
            </button>
          </div>
          <div className="space-y-4 py-4">
            {filterSections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-2 font-clash text-clash-16 ">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.has(option.value)}
                        onChange={() => toggleFilter(option.value)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sort Panel */}
      {isSortOpen && (
        <div className="fixed inset-0 z-50 bg-white px-4 pt-16 md:hidden  text-satoshi-16 font-satoshi">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-lg font-medium">Sort</h2>
            <button
              onClick={() => setIsSortOpen(false)}
              className="text-sm text-gray-500"
            >
              Done
            </button>
          </div>
          <div className="space-y-2 py-4">
            {sortOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={selectedSort === option.value}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="h-4 w-4 border-gray-300"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Filters */}
      <aside className="hidden w-64 space-y-8 pr-8 md:block  text-satoshi-16 font-satoshi">
        {filterSections.map((section) => (
          <div key={section.title} className="border-b border-gray-200 pb-4">
            <h3 className="mb-4 text-sm font-medium">{section.title}</h3>
            <div className="space-y-3">
              {section.options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.has(option.value)}
                    onChange={() => toggleFilter(option.value)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        ))}
      </aside>
    </>
  );
}
