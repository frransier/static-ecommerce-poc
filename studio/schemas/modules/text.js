import { FaTextHeight } from "react-icons/fa";

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
        media: FaTextHeight,
        subtitle: "Text module"
      };
    }
  }
};
