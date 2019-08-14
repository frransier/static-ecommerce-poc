const sanityClient = require("@sanity/client")
var btoa = require("btoa")

exports.handler = (event, context, callback) => {
  var acknowledge = false
  const sanity = sanityClient({
    projectId: process.env.SANITY_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_WRITE,
    useCdn: false,
  })
  const Username = "PK04103_3d21aa53e7a6"
  const Password = "MD2ifgWSytidwwUV"
  const config = {
    headers: {
      Authorization: "Basic " + btoa(`${Username}:${Password}`),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  }
  const targetUrl = `https://cors-anywhere.herokuapp.com/https://api.playground.klarna.com/ordermanagement/v1/orders/${event.queryStringParameters.klarna_order_id}/acknowledge`
  const acknowledeKlarnaOrder = () => {
    axios.post(targetUrl, config)
  }

  if (event.queryStringParameters.klarna_order_id !== undefined) {
    acknowledge = true
  } else {
    acknowledge = false
    const boo = JSON.parse(event.body)
    const data = boo.params

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
  }

  try {
    console.log(acknowledge)

    acknowledge
      ? sanity
          .patch(event.queryStringParameters.klarna_order_id)
          .set({ acknowledged: true })
          .commit()
          .then(updated => {
            console.log("Order acknowledged: ", updated)
          })
          .finally(acknowledeKlarnaOrder())
      : sanity.create(doc)

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
