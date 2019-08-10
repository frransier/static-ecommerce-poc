export default {
  name: "sizePants",
  title: "Pants size",
  type: "object",
  fields: [
    {
      title: "Pants size",
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
        subtitle: `Pants size`
      };
    }
  }
};
