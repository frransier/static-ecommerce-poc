export default {
  name: "footerLink",
  title: "Link",
  type: "object",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "Intro",
      name: "intro",
      type: "string",
    },
    {
      title: "Url",
      name: "url",
      type: "url",
    },
  ],
  preview: {
    select: {
      title: "name",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
      };
    },
  },
};
