import { IoIosSettings } from "react-icons/io";

export default {
  name: "settings",
  type: "document",
  title: "Settings",
  fieldsets: [
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "SEO metadata" }
  ],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Site title",
      fieldset: "header"
    },
    {
      name: "navLinks",
      type: "array",
      title: "Navigation links",
      of: [{ type: "navLink" }],
      fieldset: "header"
    },
    {
      name: "footerLinks",
      type: "array",
      title: "Footer links",
      of: [{ type: "footerLink" }],

      fieldset: "footer"
    },
    {
      name: "socialMedia",
      type: "array",
      title: "Social media links",
      of: [{ type: "url" }],
      fieldset: "footer"
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "SEO description",
      fieldset: "seo"
    },
    {
      name: "keywords",
      type: "array",
      description: "SEO keywords",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      fieldset: "seo"
    },
    {
      name: "logo",
      type: "image",
      title: "Site logo",
      fieldset: "header"
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
        media: IoIosSettings,
        subtitle: `Site settings`
      };
    }
  }
};
