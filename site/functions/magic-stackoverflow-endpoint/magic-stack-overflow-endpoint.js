const https = require("https")
const btoa = require("btoa")

const doPostRequest = order_id => {
  const data = {}

  return new Promise((resolve, reject) => {
    const options = {
      host: `https://api.playground.klarna.com/`,
      path: `ordermanagement/v1/orders/${order_id}/acknowledge`,
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${Username}:${Password}`),
        "Content-Type": "application/json",
      },
    }

    //create the request object with the callback with the result
    const req = https.request(options, res => {
      resolve(JSON.stringify(res.statusCode))
    })

    // handle the possible errors
    req.on("error", e => {
      reject(e.message)
    })

    //do the request
    req.write()

    //finish the request
    req.end()
  })
}

exports.handler = async event => {
  await doPostRequest(event.queryStringParameters.klarna_order_id)
    .then(result => console.log(`Status code: ${result}`))
    .catch(err =>
      console.error(
        `Error doing the request for the event: ${JSON.stringify(
          event
        )} => ${err}`
      )
    )
}
