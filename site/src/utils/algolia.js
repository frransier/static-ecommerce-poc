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
        slug {
          current
        }
      }
    }
  }
}
`
const transform = arr =>
  arr.map(({ node: { mainImage, categories, ...rest } }) => ({
    ...mainImage,
    "categories.lvl0": categories[0].title,
    "categories.lvl1": `${categories[0].title} > ${categories[1].title}`,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: algoliaQuery,
    transformer: ({ data }) => transform(data.products.edges),
    settings,
  },
]

module.exports = queries
