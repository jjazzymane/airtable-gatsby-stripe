import React from "react"
import { Link, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

/* class Button extends React.Component { 
  componentDidMount() { 
    this.stripe = window.Stripe('pk_test_J0vBBBvZ1FRmzLuWxQwtJLFa00ry4Fbxlp');
  }

  render() {
    return(
      <form 
      onSubmit={event => {
        event.preventDefault();
        this.stripe.redirectToCheckout({
          items: [{plan: 'plan_Fj105QkpVE8j1O', quantity: 1}],
    
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
      }}>
      <button
        style={{backgroundColor:"#6772E5", color:"#FFF",padding:"8px 12px",border:"0",borderRadius:"4px",fontSize:"1em"}}
        id="checkout-button-plan_Fj105QkpVE8j1O"
        role="link"
      >
        Checkout to coach claraaaa
      </button>
    </form>
    )
  }
} */


class SyncButton extends React.Component {
  componentDidMount() {
    this.stripe = window.Stripe('sk_test_c7B3EeHhSn7sw609f42jDc4X00UJjeKup6');
  }

  handleSubmit(name) {
    return event => { 
      event.preventDefault();

      this.stripe.products.create({
        name:{name},
        type: 'service',
      }, function(err, product) {
        // asynchronously called
      });
    }
  }

  render() {
    
    const { titleAirtable, titleStripe } = this.props;

    return (
      <form onSubmit={this.handleSubmit(titleAirtable)}>
        <button type='submit'>Update Stripe</button>
      </form>
    )
  }
}

/* export const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hey you are about to buy below</h1>
    <Button/>
    <Link to='/plans'>hey!</Link>
    <h1>Hey this is a test!! Mommiee</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
) */


export default () => (<StaticQuery
  query = { graphql` 
  {
    
    magic: allCoachClaraAirtable(filter: {newProducts: {ne: "FILTER_ME_OUT"}}) {
      nodes {
        newProducts
      }
    }
    
  }`}

  render = {data => (
    <Layout>
      
      {data.magic.map(({nodes})=> 
        <h1>node.newProducts</h1>
      )}
      

    </Layout>
  )}
  />)