import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// export const orderType = defineType({
//   name: "order",
//   title: "Order",
//   type: "document",
//   icon: DocumentTextIcon,
//   fields: [
//     defineField({
//       name: "customerId",
//       title: "Customer",
//       type: "reference",
//       to: [{ type: "customer" }], // Ensure "customer" is a valid document type
//     }),
//     defineField({
//       name: "orderDate",
//       title: "Order Date",
//       type: "datetime",
//     }),
//     defineField({
//       name: "orderStatus",
//       title: "Order Status",
//       type: "string",
//       options: {
//         list: [
//           { title: "Pending", value: "pending" },
//           { title: "Shipped", value: "shipped" },
//           { title: "Delivered", value: "delivered" },
//           { title: "Cancelled", value: "cancelled" },
//         ],
//       },
//     }),
//     defineField({
//       name: "shippingAddress",
//       title: "Shipping Address",
//       type: "object",
//       fields: [
//         { name: "street", title: "Street", type: "string" },
//         { name: "city", title: "City", type: "string" },
//         { name: "state", title: "State", type: "string" },
//         { name: "postalCode", title: "Postal Code", type: "string" },
//       ],
//     }),
//     defineField({
//       name: "totalAmount",
//       title: "Total Amount",
//       type: "number",
//     }),
//     defineField({
//       name: "paymentMethod",
//       title: "Payment Method",
//       type: "string",
//       options: {
//         list: [
//           { title: "Credit Card", value: "creditCard" },
//           { title: "Cash On Delivery", value: "cashOnDelivery" },
//         ],
//       },
//     }),
//     defineField({
//       name: "paymentStatus",
//       title: "Payment Status",
//       type: "string",
//       options: {
//         list: [
//           { title: "Pending", value: "pending" },
//           { title: "Paid", value: "paid" },
//           { title: "Refunded", value: "refunded" },
//           { title: "Failed", value: "failed" },
//         ],
//       },
//     }),
//     defineField({
//       name: "orderItems",
//       title: "Order Items",
//       type: "array",
//       of: [{ type: "reference", to: [{ type: "orderItem" }] }],
//     }),
//   ],
//   preview: {
//     select: {
//       customerId: "customerId",
//       orderDate: "orderDate",
//       orderStatus: "orderStatus",
//       totalAmount: "totalAmount",
//       paymentMethod: "paymentMethod",
//     },
//     prepare(selection) {
//       const { customerId, orderDate, orderStatus, totalAmount, paymentMethod } =
//         selection;
//       return {
//         title: `Order #${customerId ? customerId.substr(-4) : "N/A"}`,
//         subtitle: `${orderDate || "No Date"} - ${
//           orderStatus || "No Status"
//         } - $${totalAmount || "0"} - ${paymentMethod || "No Payment Method"}`,
//       };
//     },
//   },
// });

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "customerId",
      title: "Customer",
      type: "reference",
      to: [{ type: "customer" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "orderStatus",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      fields: [
        { name: "street", title: "Street", type: "string" },
        { name: "city", title: "City", type: "string" },
        { name: "state", title: "State", type: "string" },
        { name: "postalCode", title: "Postal Code", type: "string" },
      ],
    }),
    defineField({
      name: "orderItems",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "productId", type: "reference", to: [{ type: "product" }] },
            { name: "productName", type: "string" },
            { name: "quantity", type: "number" },
            { name: "price", type: "number" },
            {
              name: "subtotal",
              type: "number",
              readOnly: true,
              description: "This field is automatically calculated",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
      readOnly: true,
      description:
        "This field is automatically calculated based on order items",
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Credit Card", value: "creditCard" },
          { title: "Cash On Delivery", value: "cashOnDelivery" },
        ],
      },
    }),
    defineField({
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Refunded", value: "refunded" },
          { title: "Failed", value: "failed" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      customerId: "customerId",
      orderDate: "orderDate",
      orderStatus: "orderStatus",
      totalAmount: "totalAmount",
      paymentMethod: "paymentMethod",
    },
    prepare(selection) {
      const { customerId, orderDate, orderStatus, totalAmount, paymentMethod } =
        selection;
      return {
        title: `Order #${customerId ? customerId._ref.substr(-4) : "N/A"}`,
        subtitle: `${orderDate ? new Date(orderDate).toLocaleDateString() : "No Date"} - ${
          orderStatus || "No Status"
        } - $${totalAmount || "0"} - ${paymentMethod || "No Payment Method"}`,
      };
    },
  },
});
