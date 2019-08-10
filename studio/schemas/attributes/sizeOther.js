export default {
  name: "sizeOther",
  title: "Other size",
  type: "object",
  fields: [
    {
      title: "Other size",
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
        subtitle: `Other size`
      };
    }
  }
};
