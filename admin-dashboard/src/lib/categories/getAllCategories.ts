import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllCategories = async () => {
  const GET_ALL_CATEGORIES_QUERY = defineQuery(`*[_type == "category"]{
    _id,
    name,
    slug
  }`);

  try {
    const categories = await sanityFetch({ query: GET_ALL_CATEGORIES_QUERY });
    return categories.data || [];
  } catch (error) {
    console.log("Category Not Found", error);
    throw error;
  }
};
