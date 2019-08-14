const sanityClient = require("@sanity/client")
const axios = require("axios")
const btoa = require("btoa")

exports.handler = (event, context, callback) => {
  const sanity = sanityClient({
    projectId: process.env.SANITY_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_WRITE,
    useCdn: false,
  })
  try {
    sanity
      .patch(event.queryStringParameters.klarna_order_id)
      .set({ acknowledged: true })
      .commit()
      .then(updated => {
        console.log("Order acknowledged: ", updated)
      })

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
