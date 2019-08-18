export default {
  name: "stories",
  title: "Featured stories",
  type: "object",
  fields: [
    {
      title: "Featured stories",
      name: "stories",
      type: "array",
      of: [{ type: "reference", to: { type: "story" } }]
    }
  ],
  preview: {
    select: {
      title: "story.title"
    }
  }
};
