export default {
  name: "sizeClothes",
  title: "Size",
  type: "object",
  fields: [
    {
      title: "Size clothes",
      name: "sizeClothes",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "sizeClothes"
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
