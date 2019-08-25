import { MdFormatIndentDecrease } from "react-icons/md";

export default {
  title: "Rich text",
  name: "rte",
  type: "object",
  fields: [
    {
      name: "editor",
      title: "Rich text",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block"
        }
      ]
    }
  ],
  preview: {
    select: {
      title: "text"
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: "Rich text",
        media: MdFormatIndentDecrease,
        subtitle: "Text module"
      };
    }
  }
};
