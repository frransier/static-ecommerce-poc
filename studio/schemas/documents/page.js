export default {
  title: "Page",
  name: "page",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      name: "modules",
      title: "Modules",
      type: "array",
      of: [
        { type: "hero" },
        { type: "heroColor" },
        { type: "products" },
        { type: "stories" },
        { type: "news-module" },

        { type: "vendors" },
        { type: "categories" }
      ]
    },
    {
      title: "Rich text",
      name: "rich_text",
      type: "richText"
    }
  ]
};
