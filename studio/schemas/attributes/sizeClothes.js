export default {
  name: "sizeClothes",
  title: "Size",
  type: "object",
  fields: [
    {
      title: "Size clothes",
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
        subtitle: `Size clothes`
      };
    }
  }
};
