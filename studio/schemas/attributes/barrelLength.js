export default {
  name: "barrelLength",
  title: "Barrel length",
  type: "object",
  fields: [
    {
      title: "Barrel length",
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
        subtitle: `Barrel length (cm)`
      };
    }
  }
};
