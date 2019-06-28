export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "email",
      title: "Customer email",
      type: "string",
    },
    {
      name: "total",
      title: "Total amount",
      type: "number",
    },
    {
      name: "items",
      title: "Order items",
      type: "array",
      of: [{ type: "reference", to: { type: "product" } }],
    },
    {
      name: "createdAt",
      title: "Created at",
      type: "datetime",
    },
  ],
}
