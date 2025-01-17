import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

// export const productType = defineType({
//   name: "product",
//   title: "Product",
//   type: "document",
//   icon: DocumentTextIcon,
//   fields: [
//     defineField({
//       name: "name",
//       type: "string",
//     }),
//     defineField({
//       name: "slug",
//       type: "slug",
//       options: {
//         source: "title",
//       },
//     }),
//     defineField({
//       name: "mainImage",
//       type: "image",
//       options: {
//         hotspot: true,
//       },
//       fields: [
//         {
//           name: "alt",
//           type: "string",
//           title: "Alternative text",
//         },
//       ],
//     }),
//     defineField({
//       name: "categories",
//       type: "array",
//       of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
//     }),
//     defineField({
//       name: "description",
//       type: "text",
//       title: "Description",
//     }),
//     defineField({
//       name: "price",
//       type: "number",
//       title: "Price",
//     }),
//     defineField({
//       name: "dimensions",
//       type: "object",
//       fields: [
//         { name: "width", type: "number" },
//         { name: "height", type: "number" },
//       ],
//     }),
//     defineField({
//       name: "weight",
//       type: "number",
//       title: "Weight",
//     }),
//     defineField({
//       name: "stock",
//       type: "number",
//       title: "Stock",
//     }),

//     defineField({
//       name: "publishedAt",
//       type: "datetime",
//     }),
//   ],
//   preview: {
//     select: {
//       title: "name",
//       media: "mainImage",
//     },
//     prepare(selection) {
//       const { title, media } = selection;
//       return {
//         title: title,
//         subtitle: `Published at: ${new Date(media?.asset?.updatedAt).toLocaleDateString()}`,
//       };
//     },
//   },
// });

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "dimensions",
      type: "object",
      fields: [
        { name: "width", type: "number", title: "Width" },
        { name: "height", type: "number", title: "Height" },
      ],
    }),
    defineField({
      name: "weight",
      type: "number",
      title: "Weight",
    }),
    defineField({
      name: "stock",
      type: "number",
      title: "Stock",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title,
        subtitle: `Published at: ${new Date(media?.asset?.updatedAt).toLocaleDateString()}`,
      };
    },
  },
});
