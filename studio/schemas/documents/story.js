export default {
  title: "Story",
  name: "story",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Hero image",
      name: "hero",
      type: "image",
    },
    {
      title: "Intro",
      name: "intro",
      type: "richText",
    },
    {
      title: "Body",
      name: "body",
      type: "richText",
    },
    {
      name: "products",
      title: "Related products",
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
      title: "Related stories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "story" }],
        },
      ],
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
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
