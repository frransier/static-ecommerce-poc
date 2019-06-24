const algoliasearch = require("algoliasearch")
const request = require("request")

const ndjson = require("ndjson")
const { bindNodeCallback } = require("rxjs")
const { streamToRx } = require("rxjs-stream")
const { bufferCount, map, mergeMap, toArray, tap } = require("rxjs/operators")

// Algolia configuration
const algoliaApp = "8EDH67ODRS"
const algoliaIndex = "static-ecommerce-poc"
// Sanity configuration
const projectId = "39k0k3q1"
const dataset = "production"
const sanityExportURL = `https://${projectId}.api.sanity.io/v1/data/export/${dataset}`

exports.handler = (event, context) => {
  // Initiate an Algolia client
  const client = algoliasearch(algoliaApp, "14b5dd6cde119a02ac5fd5231c7c6c0b")
  // Initiate the Algolia index
  const index = client.initIndex(algoliaIndex)

  // bind the update function to use it as an observable
  const partialUpdateObjects = bindNodeCallback((...args) =>
    index.saveObjects(...args)
  )
  streamToRx(request(sanityExportURL).pipe(ndjson()))
    .pipe(
      /*
       * Pick and prepare fields you want to index,
       * here we reduce structured text to plain text
       */
      map(function sanityToAlgolia(doc) {
        return {
          objectID: doc._id,

          title: doc.title,

          slug: doc.slug,
        }
      }),
      // buffer batches in chunks of 100
      bufferCount(100),
      // 👇uncomment to console.log objects for debugging
      tap(console.log),
      // submit actions, one batch at a time
      mergeMap(docs => partialUpdateObjects(docs), 1),
      // collect all batches and emit when the stream is complete
      toArray()
    )
    .subscribe(batchResults => {
      const totalLength = batchResults.reduce(
        (count, batchResult) => count + batchResult.objectIDs.length,
        0
      )

      return {
        statusCode: 2000,
        body: `Updated ${totalLength} documents in ${batchResults.length} batches`,
      }
    })
}
