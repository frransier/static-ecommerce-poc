export default {
  name: "categories",
  title: "Featured categories",
  type: "object",
  fields: [
    {
      title: "Featured categories",
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }]
    }
  ],
  preview: {
    select: {
      title: "category.title"
    }
  }
};
