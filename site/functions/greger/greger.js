exports.handler = (event, context, callback) => {
  try {
    console.log(event)
    console.log(context)
    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
