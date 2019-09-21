import React from "react"
import { StaticQuery } from "gatsby"

import Layout from "../components/layout"
/* import Image from "../components/image"
import SEO from "../components/seo" */

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

//Update Stripe
class SyncButton extends React.Component {
  componentDidMount() {
    this.stripe = window.Stripe(`${process.env.STRIPE_TEST_KEY}`);
  }

  handleSubmit( name, amount, interval, nickname, interval_count ) {
    return event => { 
      event.preventDefault();

      this.stripe.plans.create({
        amount: {amount},
        interval: {interval},
        product: {
          name: {name},
          type: 'service',
          statement_descriptor: 'COACHCLARA.IO'
        },
        currency: "usd",
        nickname: {nickname},
        trial_period_days: 7,
        interval_count: {interval_count}
      });

      /* if ( error ) {
        console.error('Error:', error)
      } */

    }
  } 

  render() {
    
    const { newProduct, amount, interval, nickname, interval_count } = this.props;

    return (
      <form 
      style={{backgroundColor:"yellow"}}
      onSubmit={this.handleSubmit( newProduct, amount, interval, nickname, interval_count )}>
        <h6>{`${nickname} at $${amount}`}</h6> 
        <button>{newProduct}</button>
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

export default () => ( <StaticQuery
    query = {graphql`
        {    
            magic: allCoachClaraAirtable(filter: 
                {newProducts: 
                    {ne: "FILTER_ME_OUT"}
                }
            ) {
                edges {
                    node { 
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
          <h1> Products to Add to Checkout </h1>
          <h3> press the button next to each offering to add to the coach clara checkout </h3>
          <h4> all FULL </h4>
          <div style= {{display:"grid",
            gridTemplateColumns: "5rem 6rem 5rem 5rem",
            gridTemplateRows: "auto",
            gridColumnGap: "2rem",
          }} >
            {data.magic.edges.map(({node})=>(
              <SyncButton
                newProduct={node.titleProduct}
                amount = {node.planFULL}
                interval = "year"
                nickname = 'pay-in-full'
                interval_count = '1'
              />
            ))
          }
          </div>
              
          <h4>all BI-WEEKLY</h4>
          <div style= {{display:"grid",
            gridTemplateColumns: "5rem 6rem 5rem 5rem",
            gridTemplateRows: "auto",
            gridColumnGap: "2rem",
          }} >
            {data.magic.edges.map(({node})=>(
              <SyncButton
                newProduct={node.titleProduct}
                amount = {node.planBWKLY}
                interval = "week"
                nickname = 'bi-weekly'
                interval_count = '2'
              />
            ))
          }
          </div>
          <h4>all MONTHLY</h4>
          <div style= {{display:"grid",
            gridTemplateColumns: "5rem 6rem 5rem 5rem",
            gridTemplateRows: "auto",
            gridColumnGap: "2rem",
          }} >
            {data.magic.edges.map(({node})=>(
              <SyncButton
                newProduct={node.titleProduct}
                amount = {node.planMONTHLY}
                interval = "month"
                nickname = 'monthly'
                interval_count = '1'
              />
            ))
          }
          </div>
          <h4>all groups of 15</h4>
          <h4>all groups of 25</h4>
        </Layout>
    )}
    
/>)