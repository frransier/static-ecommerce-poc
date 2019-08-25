import { GoGist } from "react-icons/go";

export default {
  title: "Page",
  name: "page",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      name: "modules",
      title: "Modules",
      type: "array",
      of: [
        { type: "hero" },
        { type: "products" },
        { type: "paragraph" },
        { type: "header" }
      ]
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
      modules: "modules"
    },
    prepare(selection) {
      const { title, modules } = selection;
      return {
        title: title,
        media: GoGist,
        subtitle: modules.length + " modules"
      };
    }
  }
};
