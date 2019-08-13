const sanityClient = require("@sanity/client")

exports.handler = (event, _, callback) => {
  const boo = JSON.parse(event.body)
  const data = boo.params

  const sanity = sanityClient({
    projectId: process.env.SANITY_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_WRITE,
    useCdn: false,
  })

  const items = data.order_lines.map(item => {
    const i = item.reference
    return i
  })

  const doc = {
    _type: "order",
    name: data.billing_address.given_name + data.billing_address.family_name,
    email: data.billing_address.email,
    orderDate: data.billing_address.completed_at,
    orderItems: items,
    total: data.order_amount / 100,
    status: data.status,
    acknowledged: false,
    orderId: data.order_id,
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
