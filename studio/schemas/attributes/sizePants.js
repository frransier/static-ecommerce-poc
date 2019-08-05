export default {
  name: "sizePants",
  title: "Pants size",
  type: "object",
  fields: [
    {
      title: "Pants size",
      name: "sizePants",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "sizePants"
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
