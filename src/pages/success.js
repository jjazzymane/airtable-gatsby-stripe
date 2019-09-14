import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Success = () => (
  <Layout>
    <SEO title="Success" />
    <h1>Successful Payment!</h1>
    <p>Thank you! Now lets get started. Got to the scheduler.</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Success