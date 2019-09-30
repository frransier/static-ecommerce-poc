exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body)
  const kontext = JSON.parse(context)

  try {
    console.log("event.body: ", JSON.stringify(body))
    console.log("event.context: ", JSON.stringify(kontext))

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
