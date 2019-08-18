export default {
  name: "vendors",
  title: "Featured brands",
  type: "object",
  fields: [
    {
      title: "Featured brands",
      name: "brands",
      type: "array",
      of: [{ type: "reference", to: { type: "vendor" } }]
    }
  ],
  preview: {
    select: {
      title: "vendor.title"
    }
  }
};
