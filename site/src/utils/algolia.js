const algoliaQuery = `
{
  products: allSanityProduct {
    edges {
      node {
        title
        categories {
          title
        }
        mainImage {
          asset {
            fixed(width: 160) {
              srcWebp
            }
          }
        }
        categories0
        categories1
        slug {
          current
        }
      }
    }
  }
}
`
const flatten = arr =>
  arr.map(({ node: { mainImage, categories0, categories1, ...rest } }) => ({
    ...mainImage,
    "categories.lvl0": categories0,
    "categories.lvl1": categories1,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: algoliaQuery,
    transformer: ({ data }) => flatten(data.products.edges),
    settings,
  },
]

module.exports = queries
