export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "productId",
      title: "Product id",
      type: "string"
    },
    {
      name: "intro",
      title: "Intro",
      type: "blockContent"
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
    },
    {
      name: "body",
      title: "Body",
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
      name: "vendor",
      title: "Vendor",
      type: "reference",
      to: { type: "vendor" }
    },
    {
      name: "parent",
      title: "Parent product",
      type: "reference",
      to: { type: "product" }
    },
    {
      title: "Variants",
      name: "variants",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "product" }
        }
      ]
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "category" }
        }
      ]
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [
        {
          type: "string"
        }
      ],
      options: {
        layout: "tags"
      }
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "categories0",
      title: "Parent category ",
      type: "string",
      hidden: true
    },
    {
      name: "categories1",
      title: "Child category",
      type: "string",
      hidden: true
    }
  ],
  preview: {
    select: {
      title: "title",
      manufactor: "manufactor.title",
      media: "defaultProductVariant.images[0]"
    }
  }
};
