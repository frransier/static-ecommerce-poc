// import React, { useContext, useEffect, useState } from "react"
import React from "react"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"
// import { KlarnaContext, CartContext } from "../context/LayoutStore"
var btoa = require("btoa")

const TestPage = () => {
  // const [snippet, setSnippet] = useState()
  // const [loading, setLoading] = useState(true)
  // const [klarnaOrder, setKlarnaOrder] = useState(false)
  // const [klarna, klarnaDispatch] = useContext(KlarnaContext)
  // const [cart, cartDispatch] = useContext(CartContext)

  const klarnaId =
    typeof window === "undefined" ? "" : localStorage.getItem("klarna-order-id")

  const Username = "PK04103_3d21aa53e7a6"
  const Password = "MD2ifgWSytidwwUV"
  const config = {
    headers: {
      Authorization: "Basic " + btoa(`${Username}:${Password}`),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  }

  const acknowledgeKlarnaOrder = () => {
    const order_id = JSON.parse(klarnaId)
    console.log(klarnaId)

    // const PROXY_URL = "https://cors-anywhere.herokuapp.com/"
    const pushUrl = `https://api.playground.klarna.com/ordermanagement/v1/orders/${order_id}/acknowledge`
    axios
      .post(pushUrl, config)
      .then(res => console.log("post:", res))
      .catch(err => console.log("Post ERROR :", err))
  }

  return (
    <Layout>
      <SEO title="Order confirmation" />
      <div onClick={acknowledgeKlarnaOrder}>HEJ</div>
    </Layout>
  )
}

export default TestPage
