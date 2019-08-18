export default {
  name: "heroColor",
  title: "Hero with color",
  type: "object",
  fields: [
    {
      title: "Header",
      name: "header",
      type: "string"
    },
    {
      title: "Body",
      name: "body",
      type: "string"
    },
    {
      name: "bgColor",
      title: "Background color",
      type: "color"
    }
  ],
  preview: {
    select: {
      title: "header"
    }
  }
};
