import React, { useState } from "react"
import { Link } from "gatsby"

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
      <SEO title="404: Not found" />
      <Link to="/">Back</Link>
      <form
        name="contact"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="yekshemesh"
      >
        <div>
          <input type="hidden" name="form-name" value="contact" />
          <input onChange={handleEmail} name="Email" required />
          <input onChange={handleMessage} name="Message" required />
          <input type="hidden" name="yekshemesh" />

          <button type="submit">Send</button>
        </div>
      </form>
    </Layout>
  )
}

export default ContactPage
