import { FaDiceD6 } from "react-icons/fa";

export default {
  title: "Product",
  name: "product",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Product number",
      name: "productNumber",
      type: "string"
    },
    {
      title: "Image",
      name: "mainImage",
      type: "image"
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
      title: "Intro",
      name: "intro",
      type: "text"
    },
    {
      title: "Body",
      name: "body",
      type: "text"
    },
    {
      name: "vendor",
      title: "Vendor",
      type: "reference",
      to: [{ type: "vendor" }]
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }]
        }
      ]
    },
    {
      name: "variants",
      title: "Variants",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "variant" }]
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
    }
  ],
  preview: {
    select: {
      title: "title",
      productNumber: "productNumber",
      variants: "variants"
    },
    prepare(selection) {
      const { title, productNumber, variants } = selection;

      return {
        title: title,
        media: FaDiceD6,
        subtitle:
          variants.length === 1
            ? `${productNumber} | ${variants.length} variant`
            : `${productNumber} | ${variants.length} variants`
      };
    }
  }
};
