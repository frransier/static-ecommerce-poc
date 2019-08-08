export default {
  title: "News",
  name: "news",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Body",
      name: "body",
      type: "richText"
    },
    {
      title: "Image",
      name: "image",
      type: "image"
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [
        {
          type: "string"
        }
      ],
      options: {
        layout: "tags"
      }
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    }
  ]
};
