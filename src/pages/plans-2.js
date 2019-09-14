import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"

export default () => ( <StaticQuery
    query = {graphql`
        {    
            product: allStripeProduct {
                totalCount
                edges {
                    node {
                        name
                        object
                        id
                    }
                }
            }
            unicorn: allStripePlan {
                group(field: product) {
                  edges {
                    node {
                      id
                      amount
                      currency
                      object
                      nickname
                      product
                    }
                  }
                  totalCount
                  fieldValue
                }
              }
        }
    `}
    render = {data => (
        <Layout>
            {data.map(({unicorn, product}, index)=>(
                <div key={index}>YO</div>
            ))}
        </Layout>
    )}
    
/>)