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
      title: "Hero title",
      name: "heroTitle",
      type: "string",
    },
    {
      title: "Hero image",
      name: "heroImage",
      type: "image",
    },
    {
      title: "Hero text",
      name: "heroText",
      type: "string",
    },
    {
      title: "Button text",
      name: "buttonText",
      type: "string",
    },
    {
      title: "Hero link",
      name: "heroLink",
      type: "string",
    },
    {
      name: "products",
      title: "Featured products",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
    },
    {
      name: "stories",
      title: "Featured stories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "story" }],
        },
      ],
    },
    {
      name: "news",
      title: "Featured news",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "news" }],
        },
      ],
    },
  ],
};
