export default {
  name: "sizeHats",
  title: "Size hats",
  type: "object",
  fields: [
    {
      title: "Size hats",
      name: "value",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "value"
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
        subtitle: `Size hats`
      };
    }
  }
};
