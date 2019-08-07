export default {
  name: "color",
  title: "Color",
  type: "object",
  fields: [
    {
      title: "Color",
      name: "value",
      type: "string"
    },
    {
      title: "Image",
      name: "image",
      type: "image"
    }
  ],
  preview: {
    select: {
      title: "color"
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
        subtitle: `Color`
      };
    }
  }
};
