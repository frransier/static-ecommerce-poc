export default {
  title: "Page",
  name: "page",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      name: "modules",
      title: "Modules",
      type: "array",
      of: [{ type: "hero" }, { type: "products" }],
    },
    {
      title: "Rich text",
      name: "rich_text",
      type: "richText",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
  ],
};
