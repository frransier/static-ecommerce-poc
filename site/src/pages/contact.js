import React, { useState } from "react"
// import AniLink from "gatsby-plugin-transition-link/AniLink"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  function handleEmail(event) {
    setEmail(event.target.value)
  }

  function handleMessage(event) {
    setMessage(event.target.value)
  }

  return (
    <Layout>
      <SEO title="Kontakta oss" />
      <section className="section section--padding-xl">
        <h1>Kontakta oss</h1>
        <section className="section section--no-x-padding">
          <form
            style={{ maxWidth: "600px" }}
            name="contact"
            method="post"
            action="/thanks/"
            data-netlify="true"
            data-netlify-honeypot="yekshemesh"
          >
            <input
              className="input input--bordered"
              type="hidden"
              name="form-name"
              value="contact"
            />
            <label className="label">Mail:</label>
            <input
              className="input input--bordered"
              value={email}
              onChange={handleEmail}
              name="Email"
              required
            />
            <label className="label h-padding-top-md">Meddelande:</label>
            <textarea
              className="input input--textarea input--bordered"
              value={message}
              onChange={handleMessage}
              name="Message"
              required
            />
            <input type="hidden" name="yekshemesh" />

            <button
              className="button button--red"
              type="submit"
              style={{ marginTop: "2rem" }}
            >
              Skicka meddelande
            </button>
          </form>
        </section>
      </section>
    </Layout>
  )
}

export default ContactPage
