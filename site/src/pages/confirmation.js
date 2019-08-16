import React, { useContext, useEffect, useState } from "react"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { KlarnaContext, CartContext } from "../context/LayoutStore"
var btoa = require("btoa")

const ConfirmationPage = () => {
  const [snippet, setSnippet] = useState()
  const [loading, setLoading] = useState(true)
  const [klarnaOrder, setKlarnaOrder] = useState(false)
  const [klarna, klarnaDispatch] = useContext(KlarnaContext)
  const [cart, cartDispatch] = useContext(CartContext)

  const klarnaId =
    typeof window === "undefined" ? "" : localStorage.getItem("klarna-order-id")
  console.log("klarna order object", klarnaOrder)

  const Username = "PK04103_3d21aa53e7a6"
  const Password = "MD2ifgWSytidwwUV"
  const config = {
    headers: {
      Authorization: "Basic " + btoa(`${Username}:${Password}`),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  }
  // const config2 = {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Content-Type": "application/json",
  //   },
  // }
  const PROXY_URL = "https://cors-anywhere.herokuapp.com/"

  const targetUrl = "https://api.playground.klarna.com/checkout/v3/orders/"

  const getKlarnaConfirmation = () => {
    axios
      .get(PROXY_URL + targetUrl + JSON.parse(klarnaId), config)
      .then(res => {
        setSnippet(res.data.html_snippet)
        setLoading(false)
        setKlarnaOrder(res.data)
        //klarnaDispatch({ type: "clear-klarna-id" })
      })
      .finally(() => cartDispatch({ type: "clear-cart" }))
  }
  const postOrderToSanity = () => {
    axios.post(
      "https://static-ecommerce-poc.netlify.com/.netlify/functions/klarna-order",
      { params: klarnaOrder }
    )
  }
  const acknowledgeKlarnaOrder = () => {
    const order_id = JSON.parse(klarnaId)
    const getUrl = `https://api.playground.klarna.com/ordermanagement/v1/orders/${order_id}/`
    axios
      .get(PROXY_URL + getUrl, config)
      .then(res => console.log("get:", res))
      .catch(err => console.log("Get ERROR: ", err))
    const pushUrl = `https://api.playground.klarna.com/ordermanagement/v1/orders/${order_id}/acknowledge`
    axios
      .post(pushUrl, config)
      .then(res => console.log("post:", res))
      .catch(err => console.log("Post ERROR :", err))
  }

  useEffect(() => {
    getKlarnaConfirmation()
  }, [])
  useEffect(() => {
    if (klarnaOrder !== false) {
      postOrderToSanity()
      acknowledgeKlarnaOrder()
    }
  }, [klarnaOrder])

  return (
    <Layout>
      <SEO title="Order confirmation" />
      {loading ? (
        <div>LOADING</div>
      ) : (
        <div ref={setDangerousHtml.bind(null, snippet)}></div>
      )}
    </Layout>
  )
}

export default ConfirmationPage

function setDangerousHtml(html, el) {
  if (el === null) return
  const range = document.createRange()
  range.selectNodeContents(el)
  range.deleteContents()
  el.appendChild(range.createContextualFragment(html))
}
