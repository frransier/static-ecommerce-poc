export default {
  name: "hero",
  title: "Hero with image",
  type: "object",
  fields: [
    {
      title: "Image",
      name: "image",
      type: "image"
    },
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Body",
      name: "body",
      type: "string"
    },
    {
      title: "Link",
      name: "link",
      type: "link"
    }
  ],
  preview: {
    select: {
      title: "title",
      media: "image"
    }
  }
};
