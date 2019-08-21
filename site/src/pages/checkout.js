import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import { CartContext, KlarnaContext } from "../context/LayoutStore"
import Layout from "../components/layout"
var btoa = require("btoa")

const CheckoutPage = () => {
  const [loading, setLoading] = useState(true)
  const [cart] = useContext(CartContext)
  const [, klarnaDispatch] = useContext(KlarnaContext)
  const [snippet, setSnippet] = useState()

  const orderLines = cart.map(i => {
    return {
      reference: i.articleNo,
      name: i.name,
      quantity: i.quantity,
      unit_price: i.price * 100,
      tax_rate: 2500,
      total_amount: i.quantity * i.price * 100,
      total_tax_amount:
        i.quantity * i.price * 100 -
        (i.quantity * i.price * 100 * 10000) / (10000 + 2500),
    }
  })

  const total = orderLines.map(a => {
    return a.total_amount
  })

  const sum = total.length > 0 ? total.reduce((sum, x) => sum + x) : 0
  const merchantUrls = {
    terms: "https://static-ecommerce-poc.netlify.com/terms",
    checkout: "https://static-ecommerce-poc.netlify.com/checkout",
    confirmation: "https://static-ecommerce-poc.netlify.com/confirmation",
    push:
      "https://static-ecommerce-poc.netlify.com/.netlify/functions/magic?klarna_order_id={checkout.order.id}",
  }

  const Username = "PK04103_3d21aa53e7a6"
  const Password = "MD2ifgWSytidwwUV"
  const config = {
    headers: {
      Authorization: "Basic " + btoa(`${Username}:${Password}`),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  }

  const klarnaOrder = {
    purchase_country: "SE",
    purchase_currency: "SEK",
    locale: "sv-SE",
    order_amount: sum,
    order_tax_amount: sum * 0.2,
    order_lines: orderLines,
    merchant_urls: merchantUrls,
  }

  const PROXY_URL = "https://cors-anywhere.herokuapp.com/"
  const targetUrl = "https://api.playground.klarna.com/checkout/v3/orders"

  const setKlarna = klarnaId => {
    klarnaDispatch({ type: "set-klarna-id", klarnaId: klarnaId })
  }

  const getKlarnaCheckout = () => {
    axios.post(PROXY_URL + targetUrl, klarnaOrder, config).then(res => {
      setSnippet(res.data.html_snippet)
      setLoading(false)
      setKlarna(res.data.order_id)
    })
  }
  useEffect(() => {
    getKlarnaCheckout()
  }, [])

  return (
    <Layout>
      {loading ? (
        <div
          class="spinner spinner--is-visible"
          style={{ height: "30vh" }}
        ></div>
      ) : (
        <div
          style={{ paddingTop: "50px" }}
          ref={setDangerousHtml.bind(null, snippet)}
        ></div>
      )}
    </Layout>
  )
}

export default CheckoutPage

function setDangerousHtml(html, el) {
  if (el === null) return
  const range = document.createRange()
  range.selectNodeContents(el)
  range.deleteContents()
  el.appendChild(range.createContextualFragment(html))
}
