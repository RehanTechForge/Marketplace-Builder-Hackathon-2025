import React from "react";
import { getAllCategories } from "@/lib/categories/getAllCategories";
import { CategoryList } from "../../types";
import { ProductFormClient } from "./product-form-client";

const ProductForm = async () => {
  const categories: CategoryList = await getAllCategories();

  return <ProductFormClient categories={categories} />;
};

export default ProductForm;
