export default {
  title: "Product variant",
  name: "productVariant",
  type: "object",
  fields: [
    {
      title: "Id",
      name: "productId",
      type: "string"
    },
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Excerpt",
      name: "excerpt",
      type: "blockContent"
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
          type: "image"
        }
      ]
    }
  ]
};
