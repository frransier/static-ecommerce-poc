const sanityClient = require("@sanity/client")
const btoa = require("btoa")
const axios = require("axios")

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
    auth: {
      username: Username,
      password: Password,
    },
    withCredentials: true,
  }
  // const PROXY_URL = "https://cors-anywhere.herokuapp.com/"
  const pushUrl = `https://api.playground.klarna.com/ordermanagement/v1/orders/${event.queryStringParameters.klarna_order_id}/acknowledge`
  try {
    sanity
      .patch(event.queryStringParameters.klarna_order_id)
      .set({ acknowledged: true })
      .commit()
      .catch(err => console.log(err))

    console.log(`posting`)
    axios
      .post(pushUrl, config)
      .then(res => console.log("post:", res))
      .catch(err => console.log("Post ERROR :", err))
    callback(null, {
      statusCode: 200,
      body: `OK`,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
