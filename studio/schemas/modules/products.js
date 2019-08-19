export default {
  name: "products",
  title: "Featured products",
  type: "object",
  fields: [
    {
      title: "Featured products",
      name: "products",
      type: "array",
      of: [{ type: "reference", to: { type: "product" } }]
    }
  ],
  preview: {
    select: {
      title: "product.title"
    }
  }
};
