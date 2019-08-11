import React, { useState, useContext, useCallback } from "react"
import axios from "axios"
import { CartContext } from "../context/LayoutStore"
import Layout from "../components/layout"

const CheckoutPage = () => {
  const [loading, setLoading] = useState(true)
  const [cart, dispatch] = useContext(CartContext)
  console.log(cart)
  const total = Math.round(
    cart.map(a => a.price * a.quantity).reduce((a, b) => a + b, 0) * 1.25
  )
  const orderLines = cart.map(i => {
    return {
      reference: i.articleNo,
      name: i.name,
      quantity: i.quantity,
      unit_price: i.price * 100,
      tax_rate: 2500,
      total_amount: i.quantity * i.price * 100,
      total_tax_amount: i.price * 100 * 0.8,
    }
  })
  const merchantUrls = {
    terms: "https://static-ecommerce-poc.netlify.com/terms",
    checkout: "https://static-ecommerce-poc.netlify.com/checkout",
    confirmation: "https://static-ecommerce-poc.netlify.com/confirmation",
    push: "https://static-ecommerce-poc.netlify.com/.netlify/functions/klarna",
  }

  const auth = {
    Username: "PK04103_3d21aa53e7a6",
    Password: "MD2ifgWSytidwwUV",
  }

  console.log(orderLines)

  const klarnaOrder = {
    purchase_country: "SE",
    purchase_currency: "SEK",
    locale: "sv-SE",
    order_amount: total,
    order_tax_amount: total * 0.2,
    order_lines: orderLines,
    merchant_urls: merchantUrls,
  }

  let headers = new Headers()
  headers.set(
    "Authorization",
    "Basic " + btoa(`${auth.Username}:${auth.Password}`)
  )
  const getKlarnaCheckout = () => {
    fetch("https://api.playground.klarna.com", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(klarnaOrder),
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        console.log(data)
      })
  }
  return (
    <Layout>
      {/* <SEO title="Categories" />
      <AniLink fade to="/" duration={0.6}>
        Back to shop
      </AniLink> */}
      <button onClick={getKlarnaCheckout}>Render Checkout</button>
      {loading ? <div>LOADING</div> : <div>NOT</div>}
    </Layout>
  )
}

export default CheckoutPage
