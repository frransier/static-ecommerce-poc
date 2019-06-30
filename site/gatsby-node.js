async function createProjectPages(graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions
  const result = await graphql(`
    {
      categories: allSanityCategory(
        filter: { slug: { current: { ne: null } } }
      ) {
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

    reporter.info(`Creating product page: ${path}`)

    createPage({
      path,
      component: require.resolve("./src/templates/product.js"),
      context: { id },
    })

    createPageDependency({ path, nodeId: id })
  })

  categoryEdges.forEach(edge => {
    const id = edge.node.id
    const slug = edge.node.slug.current
    const path = `/${slug}/`

    reporter.info(`Creating category page: ${path}`)

    createPage({
      path,
      component: require.resolve("./src/templates/category.js"),
      context: { id },
    })

    createPageDependency({ path, nodeId: id })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createProjectPages(graphql, actions, reporter)
}
