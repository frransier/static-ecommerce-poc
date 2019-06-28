const sanityClient = require("@sanity/client")

exports.handler = (event, _, callback) => {
  var body = JSON.parse(event.body)
  var data = body.content

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
    const sanity = sanityClient({
      projectId: process.env.SANITY_ID,
      dataset: process.env.SANITY_DATASET,
      token: process.env.SANITY_WRITE,
      useCdn: false,
    })
    sanity.create(doc)

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
