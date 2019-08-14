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
  console.log(targetUrl)

  try {
    axios.post(targetUrl, config).catch(err => console.log("ERROR :", err))

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
