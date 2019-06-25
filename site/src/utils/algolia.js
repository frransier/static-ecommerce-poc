const algoliaQuery = `
{
  products: allSanityProduct {
      edges {
        node {
          id
          title
          categories {
            slug {
              current
            }
            title
          }
          slug {
            current
          }
          defaultProductVariant {
            price
            images {
              asset {
                fixed(height: 70, width: 70) {
                  src
                }
              }
            }
          }
        }
      }
    }
}
`
const flatten = arr =>
  arr.map(({ node: { ...rest } }) => ({
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const query = [
  {
    query: algoliaQuery,
    transformer: ({ data }) => flatten(data.products.edges),
    settings,
  },
]

module.exports = query
