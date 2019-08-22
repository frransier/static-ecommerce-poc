export default {
  widgets: [
    {
      name: "document-list",
      options: {
        title: "Latest items",
        order: "_createdAt desc",
        types: ["product", "variant", "page", "story", "news"],
      },
      layout: { width: "medium", height: "small" },
    },
    {
      name: "netlify",
      layout: {
        width: "small",
        height: "small",
      },
      options: {
        title: "My Netlify deploys",
        sites: [
          {
            title: "Live site",
            apiId: "f6f724d9-0f2a-4877-b11b-6a8c3eb7d879",
            buildHookId: "5d5d54d1d2170d2924901151",
            name: "static-ecommerce-poc",
          },
        ],
      },
    },
    { name: "minesweeper" },
  ],
};
