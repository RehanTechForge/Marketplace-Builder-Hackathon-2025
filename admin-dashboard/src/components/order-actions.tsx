"use client";

import { useTransition } from "react";
import { deleteOrder, updateOrderStatus } from "@/actions/deleteOrder";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DeleteOrderButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      deleteOrder(id);
    });
  };

  return (
    <Button
      onClick={handleDelete}
      variant="destructive"
      size="sm"
      disabled={isPending}
    >
      Delete
    </Button>
  );
}

export function UpdateOrderStatus({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (value: string) => {
    startTransition(() => {
      updateOrderStatus(id, value);
    });
  };

  return (
    <Select
      onValueChange={handleStatusChange}
      defaultValue={currentStatus}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="shipped">Shipped</SelectItem>
        <SelectItem value="delivered">Delivered</SelectItem>
        <SelectItem value="canceled">Canceled</SelectItem>
      </SelectContent>
    </Select>
  );
}
