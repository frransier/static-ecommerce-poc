import React, { useContext, useEffect, useState } from "react"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { KlarnaContext } from "../context/LayoutStore"

const ConfirmationPage = () => {
  const [snippet, setSnippet] = useState()
  const [loading, setLoading] = useState(true)
  const [klarnaId, klarnaDispatch] = useContext(KlarnaContext)

  const Username = "PK04103_3d21aa53e7a6"
  const Password = "MD2ifgWSytidwwUV"
  const config = {
    headers: {
      Authorization: "Basic " + btoa(`${Username}:${Password}`),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  }
  const PROXY_URL = "https://cors-anywhere.herokuapp.com/"
  const targetUrl = `https://api.playground.klarna.com/checkout/v3/orders/${klarnaId}`

  const getKlarnaConfirmation = () => {
    axios.get(PROXY_URL + targetUrl, config).then(res => {
      setSnippet(res.data.html_snippet)
      setLoading(false)
      klarnaDispatch({ type: "clear-klarna-id" })
    })
  }
  useEffect(() => {
    getKlarnaConfirmation()
  }, [])

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
