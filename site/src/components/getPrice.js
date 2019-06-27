import React, { useState } from "react"
import { useGraphQL } from "../utils/use-graphql"

const GetPrice = props => {
  const [id] = useState(props.queryVariable)

  const { result, loading, error } = useGraphQL(
    "https://39k0k3q1.api.sanity.io/v1/graphql/production/default",
    `query 
            Product($id: ID!) {
                Product(id:$id) {
                    defaultProductVariant {
                        price
                    }
                }
            }      
        `,
    { id }
  )

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.log(error)

    return <div>Error getting price</div>
  }

  return (
    <div>
      The price is fresh{" "}
      {props.parentCallback(result.Product.defaultProductVariant.price)}
      {props.children}
    </div>
  )
}

export default GetPrice
