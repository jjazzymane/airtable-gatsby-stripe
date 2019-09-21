import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"

export default () => ( <StaticQuery
    query = {graphql`
        {    
            magic: allCoachClaraAirtable(filter: 
                {newProducts: 
                    {ne: "FILTER_ME_OUT"}
                }
            ) {
                nodes { 
                    newProducts
                }
                edges {
                    node { 
                        newProducts
                        titleProduct
                        planFULL
                        planBWKLY
                        planMONTHLY
                        planGROUP15
                        planGROUP25
                    }
                }
            }
            
        }
    `}
    render = {data => (
        <Layout>
            {data.magic.edges.map(({node})=> (
                <div>
                    <p>{node.newProducts}</p>
                    <h2>{node.titleProduct}</h2>
                </div>
            ))}
        </Layout>
    )}
    
/>)