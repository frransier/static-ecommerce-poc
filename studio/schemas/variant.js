export default {
  name: "variant",
  title: "Variant",
  type: "document",
  fieldsets: [{ name: "prices", title: "Prices" }],
  fields: [
    {
      title: "Article number",
      name: "articleNumber",
      type: "string",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "attributes",
      title: "Attributes",
      type: "array",
      of: [
        { type: "barrelLength" },
        { type: "caliber" },
        { type: "color" },
        { type: "experience" },
        { type: "sizeClothes" },
        { type: "sizeGloves" },
        { type: "sizeHats" },
        { type: "sizeOther" },
        { type: "sizePants" },
        { type: "sizeShoes" },
        { type: "stance" },
        { type: "thread" },
      ],
    },
    {
      name: "parentIdentifier",
      title: "Parent Id",
      type: "string",
    },

    {
      title: "Standard",
      name: "standard",
      type: "string",
      fieldset: "prices",
    },
    {
      title: "Discount",
      name: "discount",
      type: "string",
      fieldset: "prices",
    },
    {
      title: "Club Jaktia",
      name: "clubJaktia",
      type: "string",
      fieldset: "prices",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "articleNumber",
    },
  },
};
