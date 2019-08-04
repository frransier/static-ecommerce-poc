async function createProjectPages(graphql, actions) {
  const { createPage } = actions
  const result = await graphql(`
    {
      categories: allSanityCategory {
        edges {
          node {
            slug {
              current
            }
            id
          }
        }
      }
      products: allSanityProduct(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const productEdges = (result.data.products || {}).edges || []
  const categoryEdges = (result.data.categories || {}).edges || []

  productEdges.forEach(edge => {
    const id = edge.node.id
    const slug = edge.node.slug.current
    const path = `/products/${slug}/`

    createPage({
      path,
      component: require.resolve("./src/templates/product.js"),
      context: { id },
    })
  })

  categoryEdges.forEach(edge => {
    const id = edge.node.id
    const slug = edge.node.slug.current
    const path = `/${slug}/`

    createPage({
      path,
      component: require.resolve("./src/templates/category.js"),
      context: { id },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  await createProjectPages(graphql, actions)
}
