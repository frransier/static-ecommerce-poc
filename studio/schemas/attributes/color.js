export default {
  name: "color",
  title: "Color",
  type: "object",
  fields: [
    {
      title: "Color",
      name: "color",
      type: "string"
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