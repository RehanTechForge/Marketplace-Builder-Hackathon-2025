"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/actions/deleteProduct";
import { Loader2 } from "lucide-react";

const DeleteButtonClient = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setIsLoading(true);
      try {
        const result = await deleteProduct(productId);

        if (result?.success) {
          router.push("/all-product"); // Redirect to the products list
          router.refresh();
        } else {
          alert("There was a problem deleting the product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("An unexpected error occurred while deleting the product");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => handleDelete(productId)}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Deleting...
        </>
      ) : (
        "Delete"
      )}
    </Button>
  );
};

export default DeleteButtonClient;
