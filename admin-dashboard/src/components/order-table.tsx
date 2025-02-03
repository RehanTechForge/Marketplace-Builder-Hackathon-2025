"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteOrderButton, UpdateOrderStatus } from "./order-actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Order } from "../../types";

function truncate(str: string, length: number) {
  return str.length > length ? str.substring(0, length) + "..." : str;
}

export function OrderTable({ orders }: { orders: Order[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order._id}>
            <TableCell title={order._id}>{truncate(order._id, 8)}</TableCell>
            <TableCell>
              {new Date(order.orderDate).toLocaleDateString()}
            </TableCell>
            <TableCell title={order.customerId}>
              {truncate(order.customerId, 8)}
            </TableCell>
            <TableCell>
              {order.orderItems?.length || 0} Items
              <div className="text-xs">
                {order.orderItems?.map((item) => (
                  <div key={item.productId.toString()}>
                    {item.quantity}x {item.productName}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>${order.totalAmount}</TableCell>
            <TableCell>
              <UpdateOrderStatus
                id={order._id}
                currentStatus={order.orderStatus}
              />
            </TableCell>
            <TableCell className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/all-orders/${order._id}`}>View</Link>
              </Button>
              <DeleteOrderButton id={order._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
