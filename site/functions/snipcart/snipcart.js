const sanityClient = require("@sanity/client")

exports.handler = (event, _, callback) => {
  const body = JSON.parse(event.body)
  const data = body.content

  const sanity = sanityClient({
    projectId: process.env.SANITY_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_WRITE,
    useCdn: false,
  })

  const items = data.items.map(item => {
    const i = { _ref: item.id, _key: item.id, _type: "reference" }
    return i
  })

  const doc = {
    _type: "order",
    email: data.user.email,
    createdAt: body.createdOn,
    items: items,
    total: data.summary.total,
  }

  try {
    sanity.create(doc)

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
