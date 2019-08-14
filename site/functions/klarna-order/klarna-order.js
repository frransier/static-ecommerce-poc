const sanityClient = require("@sanity/client")

exports.handler = (event, context, callback) => {
  const sanity = sanityClient({
    projectId: process.env.SANITY_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_WRITE,
    useCdn: false,
  })

  const body = JSON.parse(event.body)
  const data = body.params
  console.log(data.order_lines)

  const items = data.order_lines.map(item => {
    const i = item.reference
    return i
  })

  const doc = {
    _type: "order",
    _id: data.order_id,
    _key: data.order_id,
    name: data.billing_address.given_name + data.billing_address.family_name,
    email: data.billing_address.email,
    orderDate: data.completed_at,
    orderItems: items,
    total: data.order_amount / 100,
    status: data.status,
    acknowledged: false,
    orderId: data.order_id,
  }

  try {
    sanity.create(doc)
    console.log("Created order: ", doc._id)

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
