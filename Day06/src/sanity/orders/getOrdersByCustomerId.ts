import { defineQuery } from "next-sanity";
import { client } from "../lib/client";
import { sanityFetch } from "../lib/live";

export async function getOrdersByCustomerId(customerId: string) {
  console.log("Customer Id", customerId);

  try {
    const ALL_ORDERS_QUERY = defineQuery(
      `*[_type == "order" && customerId == $customerId][0]`
    );
    const orders = await sanityFetch({
      query: ALL_ORDERS_QUERY,
      params: {
        customerId,
      },
    });
    console.log("Orders fetched:", orders);
    return orders.data;
  } catch (error) {
    console.error("Error fetching order from Sanity:", error);
    return null;
  }
}
