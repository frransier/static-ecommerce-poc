export default {
  name: "stance",
  title: "Stance",
  type: "object",
  fields: [
    {
      title: "Stance",
      name: "stance",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "stance"
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
        subtitle: `Stance`
      };
    }
  }
};
