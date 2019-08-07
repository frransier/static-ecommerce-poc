export default {
  name: "thread",
  title: "Thread",
  type: "object",
  fields: [
    {
      title: "Thread",
      name: "value",
      type: "string"
    }
  ],
  preview: {
    select: {
      title: "thread"
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
        subtitle: `Thread`
      };
    }
  }
};
