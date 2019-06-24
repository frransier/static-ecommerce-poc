require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const algoliaQuery = `
{
  allSanityProduct {
    edges {
      node {
        title
        slug {
          current
        }
        tags
        categories {
          title
          slug {
            current
          }
        }
      }
    }
  }
}
`

const queries = [
  {
    query: algoliaQuery,
    transformer: ({ data }) =>
      data.allSanityProduct.edges.map(({ node }) => node),
  },
]

module.exports = {
  siteMetadata: {
    title: `Static ecommerce poc`,
    description: `This is a statically generated ecommerce PWA`,
    author: `@wipcore`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP,
        apiKey: process.env.ALGOLIA_KEY,
        indexName: process.env.ALGOLIA_INDEX, // for all queries
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "39k0k3q1",
        dataset: "production",
        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_READ,
      },
    },
    {
      resolve: "gatsby-plugin-snipcart",
      options: {
        apiKey: process.env.SNIPCART,
        autopop: true,
      },
    },
  ],
}
