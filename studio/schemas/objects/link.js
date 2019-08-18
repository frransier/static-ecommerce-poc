export default {
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    {
      title: "Caption",
      name: "caption",
      type: "string",
      options: {
        isHighlighted: true
      }
    },
    {
      name: "url",
      type: "string",
      title: "Url",
      validation: Rule =>
        Rule.error(
          "You have to fill out the url. Like so: /products"
        ).required(),
      options: {
        isHighlighted: true
      }
    }
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption"
    }
  }
};
