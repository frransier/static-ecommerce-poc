import { MdFormatIndentDecrease } from "react-icons/md";

export default {
  title: "Text",
  name: "paragraph",
  type: "object",
  fields: [
    {
      title: "Text",
      name: "text",
      type: "text"
    }
  ],
  preview: {
    select: {
      title: "text"
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title.length + " characters",
        media: MdFormatIndentDecrease,
        subtitle: "Text module"
      };
    }
  }
};
