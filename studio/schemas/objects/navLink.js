import { IoMdLink } from "react-icons/io";

export default {
  name: "navLink",
  title: "Nav link",
  type: "object",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string"
    },
    {
      title: "Slug",
      name: "slug",
      type: "string",
      description: `To link to yourdomain/your-link enter 'your-link'`
    }
  ],
  preview: {
    select: {
      title: "name"
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
        media: IoMdLink
      };
    }
  }
};
