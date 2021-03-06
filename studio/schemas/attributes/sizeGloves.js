export default {
  name: "sizeGloves",
  title: "Size gloves",
  type: "object",
  fields: [
    {
      title: "Size gloves",
      name: "sizeGloves",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "sizeGloves"
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
