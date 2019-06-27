import React from "react"
import { useGraphQL } from "@brightleaf/react-hooks"

const Inventory = props => {
  const id = props.id

  const { data, loading, error } = useGraphQL(
    "https://39k0k3q1.api.sanity.io/v1/graphql/production/default",
    `query 
            Product($id: ID!) {
                Product(id:$id) {
                    defaultProductVariant {
                        inventory
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

    return <div>Error getting inventory</div>
  }

  return (
    <div>
      Got inventory from Sanity: {data.Product.defaultProductVariant.inventory}
    </div>
  )
}

export default Inventory
