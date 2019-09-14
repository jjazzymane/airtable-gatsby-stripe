import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"

class Plans extends React.Component { 

    componentDidMount() { 
        this.stripe = window.Stripe('pk_test_J0vBBBvZ1FRmzLuWxQwtJLFa00ry4Fbxlp');
    }

    handleSubmit(plan) {
        return event => { 
            event.preventDefault();

            this.stripe.redirectToCheckout({
                items: [{plan, quantity: 1}],
          
                // Do not rely on the redirect to the successUrl for fulfilling
                // purchases, customers may not always reach the success_url after
                // a successful payment.
                // Instead use one of the strategies described in
                // https://stripe.com/docs/payments/checkout/fulfillment
                successUrl: 'http://localhost:8000/success',
                cancelUrl: 'http://localhost:8000/canceled',
              })
              .then(function (result) {
                if (result.error) {
                  // If `redirectToCheckout` fails due to a browser or network
                  // error, display the localized error message to your customer.
                  var displayError = document.getElementById('error-message');
                  displayError.textContent = result.error.message;
                }
              });
        }
    }

    render() { 
        const { amount, id, currency, nickname} = this.props;
        const priceFloat = (amount/100).toFixed(2)
        const formattedPrice = Intl.NumberFormat('en-US',{style:'currency', currency}).format(priceFloat)

        return ( 
            <form onSubmit={this.handleSubmit(id)}>
                <h2> {nickname}({formattedPrice})</h2>
                <button type='submit' style={{
                    backgroundColor:"#6772E5", 
                    color:"#FFF",
                    padding:"1rem 5rem",
                    border:"0",
                    borderRadius:"0.3rem",
                    fontSize:"1em",
                    margin:"0.5rem"
                }}>Subscribe</button>
            </form>
        )
    }
}

export default () => ( <StaticQuery
    query = {graphql`
    {
        unicorn: allStripePlan(sort: {fields: product}) {
          group(field: product) {
            fieldValue
            edges {
              node {
                nickname
                product
                id
                currency
                amount
              }
            }
            productName
          }
        }
      }
    `}
    render = {data => (
        <Layout>
              {data.unicorn.group.map(({edges, fieldValue, productName})=>(
                  <div key={fieldValue}
                    style={{
                        backgroundColor:"#9dff00", 
                        color:"#FFF",
                        padding:"1rem 5rem",
                        border:"0",
                        borderRadius:"0.3rem",
                        fontSize:"1em",
                        margin:"0.5rem"
                    }}
                  > 
                    <h1>{productName}</h1>
                    {edges.map(({node})=>(
                        <Plans
                            amount={node.amount}
                            currency={node.currency}
                            id={node.id}
                            nickname={node.nickname}
                        />
                    ))} 
                  
                  </div>
              ))}    
            
        </Layout>
    )}
    
/>)

/*
<Layout>
            <div style={{
                    backgroundColor:"#6772E5", 
                    color:"#FFF",
                    padding:"1rem 5rem",
                    border:"0",
                    borderRadius:"0.3rem",
                    fontSize:"1em",
                    margin:"0.5rem"
                }}>
                    {data.Product.edges.map(({node:prdct}) => (
                        <h1>{prdct.name}</h1>
                    ))}
                    {data.Plann.group.edges.map(({node:pln})=>(
                        <Plans
                            amount={pln.amount}
                            id={pln.id}
                            currency={pln.currency}
                            nickname ={pln.nickname}
                        />
                    ))}
                </div>
            
        </Layout>

*/