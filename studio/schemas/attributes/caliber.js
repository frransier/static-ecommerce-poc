export default {
  name: "caliber",
  title: "Caliber",
  type: "object",
  fields: [
    {
      title: "Caliber",
      name: "caliber",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "caliber"
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
        subtitle: `Caliber`
      };
    }
  }
};
