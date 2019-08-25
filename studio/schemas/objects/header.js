import { MdTitle } from "react-icons/md";

export default {
  title: "Header",
  name: "header",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Size",
      name: "header",
      type: "string",
      desription: "Choose your header size",
      options: {
        list: [
          { title: "H1", value: "h1" },
          { title: "H2", value: "h2" },
          { title: "H3", value: "h3" },
          { title: "H4", value: "h4" },
          { title: "H5", value: "h5" }
        ], // <-- predefined values
        layout: "radio",
        direction: "horizontal"
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
        media: MdTitle,
        subtitle: "Header module"
      };
    }
  }
};
