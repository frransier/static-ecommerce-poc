const sanityClient = require("@sanity/client")
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
    // const Username = "PK04103_3d21aa53e7a6"
    // const Password = "MD2ifgWSytidwwUV"
    // const config = {
    //   headers: {
    //     Authorization: "Basic " + btoa(`${Username}:${Password}`),
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json",
    //   },
    // }
    // const PROXY_URL = "https://cors-anywhere.herokuapp.com/"
    // const pushUrl = `https://api.playground.klarna.com/ordermanagement/v1/orders/${klarna_order_id}/acknowledge`
    // axios
    //   .post(PROXY_URL + pushUrl, config)
    //   .then(res => console.log("post:", res))
    //   .catch(err => console.log("Post ERROR :", err))

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
