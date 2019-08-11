import React, { useState, useContext, useCallback } from "react"
import axios from "axios"
import { CartContext } from "../context/LayoutStore"
import Layout from "../components/layout"

const CheckoutPage = () => {
  const [loading, setLoading] = useState(true)
  const [cart, dispatch] = useContext(CartContext)
  const [snippet, setSnippet] = useState("")

  if (cart[0].articleNo.length > 0) {
  }
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

  console.log("logg", total)
  const sum = total.length > 0 ? total.reduce((sum, x) => sum + x) : 0
  const merchantUrls = {
    terms: "https://static-ecommerce-poc.netlify.com/terms",
    checkout: "https://static-ecommerce-poc.netlify.com/checkout",
    confirmation: "https://static-ecommerce-poc.netlify.com/confirmation",
    push: "https://static-ecommerce-poc.netlify.com/.netlify/functions/klarna",
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
  console.log(orderLines)

  const klarnaOrder = {
    purchase_country: "SE",
    purchase_currency: "SEK",
    locale: "sv-SE",
    order_amount: sum,
    order_tax_amount: sum * 0.2,
    order_lines: orderLines,
    merchant_urls: merchantUrls,
  }
  console.log(klarnaOrder)

  const PROXY_URL = "https://cors-anywhere.herokuapp.com/"
  const targetUrl = "https://api.playground.klarna.com/checkout/v3/orders"

  const getKlarnaCheckout = () => {
    axios.post(PROXY_URL + targetUrl, klarnaOrder, config).then(res => {
      setSnippet(res.data.html_snippet)
      setLoading(false)
    })
  }
  return (
    <Layout>
      <button onClick={getKlarnaCheckout}>Render Checkout</button>
      {loading ? (
        <div>LOADING</div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: snippet }}></div>
      )}
    </Layout>
  )
}

export default CheckoutPage
