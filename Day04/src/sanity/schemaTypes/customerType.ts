import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

// export const customerType = defineType({
//   name: "customer",
//   title: "Customer",
//   type: "document",
//   icon: DocumentTextIcon,
//   fields: [
//     defineField({
//       name: "firstName",
//       type: "string",
//     }),
//     defineField({
//       name: "lastName",
//       type: "string",
//     }),
//     defineField({
//       name: "email",
//       type: "email",
//     }),
//     defineField({
//       name: "phoneNumber",
//       type: "string",
//     }),
//     defineField({
//       name: "addressLine1",
//       type: "string",
//       title: "Address Line 1",
//     }),
//     defineField({
//       name: "addressLine2",
//       type: "string",
//       title: "Address Line 2",
//     }),
//   ],
//   preview: {
//     select: {
//       title: "firstName",
//       subtitle: "lastName",
//     },
//     prepare: ({ title, subtitle }) => ({
//       title: `${title} ${subtitle}`,
//     }),
//   },
// });

export const customerType = defineType({
  name: "customer",
  title: "Customer",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        defineField({
          name: "addressLine1",
          type: "string",
          title: "Address Line 1",
        }),
        defineField({
          name: "addressLine2",
          type: "string",
          title: "Address Line 2",
        }),
        defineField({ name: "city", type: "string", title: "City" }),
        defineField({ name: "state", type: "string", title: "State" }),
        defineField({
          name: "postalCode",
          type: "string",
          title: "Postal Code",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "firstName",
      subtitle: "lastName",
    },
    prepare: ({ title, subtitle }) => ({
      title: `${title} ${subtitle}`,
    }),
  },
});
