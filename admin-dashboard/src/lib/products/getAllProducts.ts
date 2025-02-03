import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  const GET_ALL_PRODUCTS_QUERY = defineQuery(`*[_type=="product"]{
     ...,
      category-> { name }
  }`);
  try {
    const products = await sanityFetch({
      query: GET_ALL_PRODUCTS_QUERY,
    });

    return products.data || [];
  } catch (error) {
    console.log("Products Not Found", error);
    throw error;
  }
};
