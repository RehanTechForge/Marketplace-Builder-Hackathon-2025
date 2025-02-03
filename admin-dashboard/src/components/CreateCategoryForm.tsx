"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "../actions/createCategory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function CreateCategoryForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // Loading state add kiya
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Form submit hote hi loading true set karein
    try {
      const result = await createCategory(name);
      if (result.success) {
        toast({
          title: "Category created",
          // @ts-expect-error "Category not created
          description: `Successfully created category: ${result.category.name}`,
        });
        setName("");
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Operation complete hone ke baad loading false kar dein
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          required
          disabled={loading} // Loading state mein input ko disable karein
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Category"} {/* Button text update */}
      </Button>
    </form>
  );
}
