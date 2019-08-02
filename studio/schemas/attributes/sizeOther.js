export default {
  name: "sizeOther",
  title: "Other size",
  type: "object",
  fields: [
    {
      title: "Other size",
      name: "sizeOther",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "sizeOther"
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
