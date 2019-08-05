export default {
  name: "sizeShoes",
  title: "Shoe size",
  type: "object",
  fields: [
    {
      title: "Shoe size",
      name: "sizeShoes",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "sizeShoes"
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
