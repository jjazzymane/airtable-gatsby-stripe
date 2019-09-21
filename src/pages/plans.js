import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"/* 
import Image from "../components/image"
import SEO from "../components/seo" */

class Products extends React.Component { 

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
        const { amount, id, currency, nickname } = this.props;
        const priceFloat = (amount/100).toFixed(2)
        const formattedPrice = Intl.NumberFormat('en-US',{style:'currency', currency}).format(priceFloat)

        return ( 
            <form onSubmit={this.handleSubmit(id)}>
                <h2> {nickname}({formattedPrice})</h2>
                <button type='submit'>Subscribe</button>
            </form>
        )
    }
}

export default () => (<StaticQuery
        query={graphql`
        query CoachClaraSubscribe {
            Plans: allStripePlan {
              edges {
                node {
                  id
                  amount
                  currency
                  object
                  nickname
                }
                
              }
            }
            
          }
          
        `}
        render={data=>(
            <Layout>
              {data.Plans.edges.map(({node: plan }) => (
                      
                <Products
                    id ={plan.id}
                    currency ={plan.currency}
                    price = {plan.amount}
                    nickname = {plan.nickname}
                />
              ))} 
                
            </Layout>
        )}
        />
) 


/*              {data.Plans.edges.map(({node: plan }) => (
                    
                  <Products
                      id ={plan.id}
                      currency ={plan.currency}
                      price = {plan.amount}
                      nickname = {plan.nickname}
                  />
                ))} 
*/