// const sanityClient = require("@sanity/client")

exports.handler = (event, _, callback) => {
  var body = JSON.parse(event.body)
  console.log(body)

  // const players = data.squad.map(player => {
  //   const p = { _ref: player, _key: player, _type: "reference" }
  //   return p
  // })

  // const doc = {
  //   _type: "playmaker",
  //   phone: data.phone,
  //   email: data.email,
  //   createdAt: new Date(),
  //   players: players,
  // }

  try {
    // const sanity = sanityClient({
    //   projectId: "0jt5x7hu",
    //   dataset: "production",
    //   token: process.env.SANITY_WRITE_TOKEN,
    //   useCdn: false,
    // })

    // sanity.create(doc)
    console.log("Hii")

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
