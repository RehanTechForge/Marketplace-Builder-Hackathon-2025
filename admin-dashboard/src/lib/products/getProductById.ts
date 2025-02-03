import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductById = async (productId: string) => {
  const GET_PRODUCT_BY_ID = defineQuery(
    `*[_type == "product" && _id == $productId][0]`
  );

  try {
    const result = await sanityFetch({
      query: GET_PRODUCT_BY_ID,
      params: { productId },
    });
    return result.data || [];
  } catch (error) {
    console.error("Failed to fetch product by Id:", error);
    return null;
  }
};
