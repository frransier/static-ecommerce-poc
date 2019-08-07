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
      title: "experience"
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
