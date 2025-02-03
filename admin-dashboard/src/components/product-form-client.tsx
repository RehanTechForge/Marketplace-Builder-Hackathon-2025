// "use client";

// import { ChangeEvent, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { updateProduct } from "@/actions/updateProduct";
// import { createProduct } from "@/actions/createProduct";
// import { useRouter } from "next/navigation";
// import { CategoryList, Product } from "../../types";

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   description: z.string().min(10, {
//     message: "Description must be at least 10 characters.",
//   }),
//   category: z.string({
//     required_error: "Please select a category.",
//   }),
//   quantity: z.number().min(0),
//   price: z.number().min(0),
//   slug: z.string().min(2),
//   features: z.array(z.string()).min(1),
//   dimensions: z.object({
//     depth: z.string(),
//     width: z.string(),
//     height: z.string(),
//   }),
//   tags: z.array(z.string()),
// });

// // Update the ProductFormClient props
// type ProductFormClientProps = {
//   categories: CategoryList;
//   initialData?: Product;
//   isEdit?: boolean;
// };

// export function ProductFormClient({
//   categories,
//   initialData,
//   isEdit,
// }: ProductFormClientProps) {
//   const router = useRouter();
//   const [image, setImage] = useState<File | null>(null);

//   console.log("INITIALS", initialData);

//   console.log("Initails data", initialData?.category);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: isEdit
//       ? {
//           name: initialData?.name || "",
//           description: initialData?.description || "",
//           category: initialData?.category?._ref || "",
//           quantity: initialData?.quantity || 0,
//           price: initialData?.price || 0,
//           slug: initialData?.slug.current || "",
//           features: initialData?.features || [""],
//           dimensions: initialData?.dimensions || {
//             depth: "",
//             width: "",
//             height: "",
//           },
//           tags: initialData?.tags || [""],
//         }
//       : {
//           name: "",
//           description: "",
//           category: "",
//           quantity: 0,
//           price: 0,
//           slug: "",
//           features: [""],
//           dimensions: {
//             depth: "",
//             width: "",
//             height: "",
//           },
//           tags: [""],
//         },
//   });

//   const generateSlug = (text: string) => {
//     return text
//       .toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^\w-]+/g, "")
//       .replace(/--+/g, "-")
//       .trim();
//   };

//   const handleGenerateSlug = () => {
//     const productName = form.getValues("name");
//     if (productName) {
//       const generatedSlug = generateSlug(productName);
//       form.setValue("slug", generatedSlug);
//     }
//   };

//   // async function onSubmit(values: z.infer<typeof formSchema>) {
//   //   const formData = new FormData();

//   //   Object.entries(values).forEach(([key, value]) => {
//   //     if (key === "dimensions") {
//   //       Object.entries(value).forEach(([dimKey, dimValue]) => {
//   //         formData.append(`dimensions.${dimKey}`, dimValue);
//   //       });
//   //     } else if (Array.isArray(value)) {
//   //       value.forEach((item, index) => {
//   //         formData.append(`${key}[${index}]`, item);
//   //       });
//   //     } else {
//   //       formData.append(key, value);
//   //     }
//   //   });

//   //   if (image) {
//   //     formData.append("image", image);
//   //   }

//   //   console.log("Form Data", formData);

//   //   // const result = await createProduct(formData);

//   //   if (result.success) {
//   //     alert("Product created successfully!");
//   //     form.reset(); // Form reset karne ke liye
//   //     setImage(null); // Image state bhi reset karni hogi
//   //   } else {
//   //     alert(`Error: ${result.error}`);
//   //   }
//   // }

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     const formData = new FormData();

//     Object.entries(values).forEach(([key, value]) => {
//       if (key === "dimensions") {
//         Object.entries(value).forEach(([dimKey, dimValue]) => {
//           formData.append(`dimensions.${dimKey}`, dimValue);
//         });
//       } else if (Array.isArray(value)) {
//         value.forEach((item, index) => {
//           formData.append(`${key}[${index}]`, item);
//         });
//       } else {
//         // @ts-expect-error "Invalid value for field `${key}`
//         formData.append(key, value);
//       }
//     });

//     if (image) {
//       formData.append("image", image);
//     }

//     let result;
//     if (isEdit) {
//       result = await updateProduct(initialData?._id as string, formData);
//     } else {
//       result = await createProduct(formData);
//     }

//     if (result.success) {
//       if (isEdit) {
//         alert("Product updated successfully!");
//         router.push("/all-product");
//       } else {
//         alert("Product created successfully!");
//         form.reset();
//         setImage(null);
//       }
//     } else {
//       alert(`Error: ${result.error}`);
//     }
//   }

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Product name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Textarea placeholder="Product description" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="category"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Category</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a category" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {categories.map((cat) => (
//                     <SelectItem key={cat._id} value={cat.slug.current}>
//                       {cat.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="quantity"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Quantity</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   {...field}
//                   onChange={(e) => field.onChange(+e.target.value)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="price"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Price</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   {...field}
//                   onChange={(e) => field.onChange(+e.target.value)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="slug"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Slug</FormLabel>
//               <div className="flex gap-2">
//                 <FormControl>
//                   <Input placeholder="product-slug" {...field} />
//                 </FormControl>
//                 <Button
//                   type="button"
//                   onClick={handleGenerateSlug}
//                   variant="secondary"
//                 >
//                   Generate Slug
//                 </Button>
//               </div>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="features"
//           render={() => (
//             <FormItem>
//               <FormLabel>Features</FormLabel>
//               {form.watch("features").map((_, index) => (
//                 <FormField
//                   key={index}
//                   control={form.control}
//                   name={`features.${index}`}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               ))}
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 className="mt-2"
//                 onClick={() =>
//                   form.setValue("features", [...form.watch("features"), ""])
//                 }
//               >
//                 Add Feature
//               </Button>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="dimensions"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Dimensions</FormLabel>
//               <FormControl>
//                 <div className="flex space-x-2">
//                   <Input
//                     placeholder="Depth"
//                     {...field}
//                     onChange={(e) =>
//                       field.onChange({ ...field.value, depth: e.target.value })
//                     }
//                     value={field.value.depth}
//                   />
//                   <Input
//                     placeholder="Width"
//                     {...field}
//                     onChange={(e) =>
//                       field.onChange({ ...field.value, width: e.target.value })
//                     }
//                     value={field.value.width}
//                   />
//                   <Input
//                     placeholder="Height"
//                     {...field}
//                     onChange={(e) =>
//                       field.onChange({ ...field.value, height: e.target.value })
//                     }
//                     value={field.value.height}
//                   />
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="tags"
//           render={() => (
//             <FormItem>
//               <FormLabel>Tags</FormLabel>
//               {form.watch("tags").map((_, index) => (
//                 <FormField
//                   key={index}
//                   control={form.control}
//                   name={`tags.${index}`}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               ))}
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 className="mt-2"
//                 onClick={() =>
//                   form.setValue("tags", [...form.watch("tags"), ""])
//                 }
//               >
//                 Add Tag
//               </Button>
//             </FormItem>
//           )}
//         />

//         <FormField
//           name="image"
//           render={() => (
//             <FormItem>
//               <FormLabel>Image</FormLabel>
//               <FormControl>
//                 <Input
//                   type="file"
//                   onChange={(e) => setImage(e.target.files?.[0] || null)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }

"use client";

import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProduct } from "@/actions/updateProduct";
import { createProduct } from "@/actions/createProduct";
import { useRouter } from "next/navigation";
import type { CategoryList, Product } from "../../types";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  quantity: z.number().min(0),
  price: z.number().min(0),
  slug: z.string().min(2),
  features: z.array(z.string()).min(1),
  dimensions: z.object({
    depth: z.string(),
    width: z.string(),
    height: z.string(),
  }),
  tags: z.array(z.string()),
});

// Update the ProductFormClient props
type ProductFormClientProps = {
  categories: CategoryList;
  initialData?: Product;
  isEdit?: boolean;
};

export function ProductFormClient({
  categories,
  initialData,
  isEdit,
}: ProductFormClientProps) {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("INITIALS", initialData);

  console.log("Initails data", initialData?.category);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          name: initialData?.name || "",
          description: initialData?.description || "",
          category: initialData?.category?._ref || "",
          quantity: initialData?.quantity || 0,
          price: initialData?.price || 0,
          slug: initialData?.slug.current || "",
          features: initialData?.features || [""],
          dimensions: initialData?.dimensions || {
            depth: "",
            width: "",
            height: "",
          },
          tags: initialData?.tags || [""],
        }
      : {
          name: "",
          description: "",
          category: "",
          quantity: 0,
          price: 0,
          slug: "",
          features: [""],
          dimensions: {
            depth: "",
            width: "",
            height: "",
          },
          tags: [""],
        },
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .trim();
  };

  const handleGenerateSlug = () => {
    const productName = form.getValues("name");
    if (productName) {
      const generatedSlug = generateSlug(productName);
      form.setValue("slug", generatedSlug);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "dimensions") {
        Object.entries(value).forEach(([dimKey, dimValue]) => {
          formData.append(`dimensions.${dimKey}`, dimValue);
        });
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else {
        // @ts-expect-error "Invalid value for field `${key}`
        formData.append(key, value);
      }
    });

    if (image) {
      formData.append("image", image);
    }

    let result;
    try {
      if (isEdit) {
        result = await updateProduct(initialData?._id as string, formData);
      } else {
        result = await createProduct(formData);
      }

      if (result.success) {
        if (isEdit) {
          alert("Product updated successfully!");
          router.push("/all-product");
        } else {
          alert("Product created successfully!");
          form.reset();
          setImage(null);
        }
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat.slug.current}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input placeholder="product-slug" {...field} />
                </FormControl>
                <Button
                  type="button"
                  onClick={handleGenerateSlug}
                  variant="secondary"
                >
                  Generate Slug
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={() => (
            <FormItem>
              <FormLabel>Features</FormLabel>
              {form.watch("features").map((_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`features.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  form.setValue("features", [...form.watch("features"), ""])
                }
              >
                Add Feature
              </Button>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dimensions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dimensions</FormLabel>
              <FormControl>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Depth"
                    {...field}
                    onChange={(e) =>
                      field.onChange({ ...field.value, depth: e.target.value })
                    }
                    value={field.value.depth}
                  />
                  <Input
                    placeholder="Width"
                    {...field}
                    onChange={(e) =>
                      field.onChange({ ...field.value, width: e.target.value })
                    }
                    value={field.value.width}
                  />
                  <Input
                    placeholder="Height"
                    {...field}
                    onChange={(e) =>
                      field.onChange({ ...field.value, height: e.target.value })
                    }
                    value={field.value.height}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              {form.watch("tags").map((_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`tags.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  form.setValue("tags", [...form.watch("tags"), ""])
                }
              >
                Add Tag
              </Button>
            </FormItem>
          )}
        />

        <FormField
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}


