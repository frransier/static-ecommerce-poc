exports.handler = (event, context, callback) => {
  try {
    console.log("first: ", event)
    console.log("second: ", context)
    console.log("third: ", JSON.parse(event))
    console.log("fourth: ", JSON.stringify(event))

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
