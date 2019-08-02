export default {
  title: "Product variant",
  name: "productVariant",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      name: "attributes",
      title: "Attributes",
      type: "array",
      of: [
        { type: "barrelLength" },
        { type: "caliber" },
        { type: "color" },
        { type: "experience" },
        { type: "sizeClothes" },
        { type: "sizeGloves" },
        { type: "sizeHats" },
        { type: "sizeOther" },
        { type: "sizePants" },
        { type: "sizeShoes" },
        { type: "stance" },
        { type: "thread" }
      ]
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true
          }
        }
      ]
    }
  ]
};
