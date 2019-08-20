export default {
  name: "settings",
  type: "document",
  title: "Settings",
  fieldsets: [
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    {
      name: "navLinks",
      type: "array",
      title: "Navigation links",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      fieldset: "header",
    },
    {
      name: "footerLinks",
      type: "array",
      title: "Footer links",
      of: [{ type: "footerLink" }],

      fieldset: "footer",
    },
    {
      name: "socialMedia",
      type: "array",
      title: "Social media links",
      of: [{ type: "url" }],
    },
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "SEO description",
    },
    {
      name: "keywords",
      type: "array",
      description: "SEO keywords",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "logo",
      type: "image",
      title: "Site logo",
      fieldset: "header",
    },
  ],
};
