import { client } from "@/lib/client";
import { Order } from "../../../types";

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const order = await client.fetch<Order | null>(
      `*[_type == "order" && _id == $id][0]`,
      { id }
    );
    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}
