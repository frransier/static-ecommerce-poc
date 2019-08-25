import { FaBook } from "react-icons/fa";

export default {
  title: "Story",
  name: "story",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Image",
      name: "image",
      type: "image"
    },
    {
      title: "Intro",
      name: "intro",
      type: "richText"
    },
    {
      title: "Body",
      name: "body",
      type: "richText"
    },
    {
      name: "products",
      title: "Related products",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }]
        }
      ]
    },
    {
      name: "stories",
      title: "Related stories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "story" }]
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
      title: "title"
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
        media: FaBook,
        subtitle: "Story"
      };
    }
  }
};
