export default {
  name: "sizeShoes",
  title: "Shoe size",
  type: "object",
  fields: [
    {
      title: "Shoe size",
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
        subtitle: `Shoe size`
      };
    }
  }
};
