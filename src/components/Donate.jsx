// MyStoreCheckout.js
import React, { Component } from 'react';
import ScriptLoader from 'react-script-loader-hoc';
import AsciiOdie from './AsciiOdie'
import Loading from './Loading'
import DonateForm from './DonateForm'
import {StripeProvider} from 'react-stripe-elements';
import {Elements} from 'react-stripe-elements';
import {StripeKeys} from '../utilities/stripeKeys';

class Donate extends Component<{}, {stripe: null | StripeShape}> {
  constructor(props) {
    super(props);

    this.state = {
      stripe: null,
    };
  }

  componentDidMount() {
    // inject Stripe.js
    const stripeJs = document.createElement('script');
    stripeJs.src = 'https://js.stripe.com/v3/';
    stripeJs.async = true;
    stripeJs.onload = () => {
      this.setState({
        stripe: window.Stripe(StripeKeys.test),
      });
    };
    document.body && document.body.appendChild(stripeJs);
  }

  render() {
    return (
      <section className='grid-row justify-center'>
        <header className='grid-item item-s-12 item-l-9 margin-bottom-tiny'>
          <h2>Help keep Odie online</h2>
        </header>

        <StripeProvider stripe={this.state.stripe}>
          <Elements>
            <DonateForm stripe={this.state.stripe} userEmail={this.props.userEmail} />
          </Elements>
        </StripeProvider>

        <div className='grid-item item-s-12 item-l-9 item-xl-3 align-self-start'>
          <div className='text-align-center'>
            <div className='code-holder padding-top-small padding-bottom-small'>
              <AsciiOdie />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Donate;
