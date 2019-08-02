export default {
  name: "sizeHats",
  title: "Size hats",
  type: "object",
  fields: [
    {
      title: "Size hats",
      name: "sizeHats",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "sizeHats"
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
