export default {
  name: "experience",
  title: "Experience",
  type: "object",
  fields: [
    {
      title: "Experience",
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
        subtitle: `Experience`
      };
    }
  }
};
