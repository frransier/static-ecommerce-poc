export default {
  name: "news-module",
  title: "Featured news",
  type: "object",
  fields: [
    {
      title: "Featured news",
      name: "news",
      type: "array",
      of: [{ type: "reference", to: { type: "news" } }]
    }
  ],
  preview: {
    select: {
      title: "news.title"
    }
  }
};
