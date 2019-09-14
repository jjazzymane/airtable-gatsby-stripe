import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Canceled = () => (
  <Layout>
    <SEO title="Canceled" />
    <h1>Nothing Happened</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Canceled
