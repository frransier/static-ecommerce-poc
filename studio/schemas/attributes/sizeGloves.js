export default {
  name: "sizeGloves",
  title: "Size gloves",
  type: "object",
  fields: [
    {
      title: "Size gloves",
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
        subtitle: `Size gloves`
      };
    }
  }
};
