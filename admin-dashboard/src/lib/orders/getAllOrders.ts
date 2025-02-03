import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllOrders = async () => {
  const GET_ALL_ORDERS_QUERY = defineQuery(`*[_type == "order"]`);

  try {
    const orders = await sanityFetch({
      query: GET_ALL_ORDERS_QUERY,
    });

    return orders.data;
  } catch (error) {
    console.error("Failed to fetch Order :", error);
    return null;
  }
};
