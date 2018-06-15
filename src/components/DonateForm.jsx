import React, {Component} from 'react';
import {injectStripe, CardElement} from 'react-stripe-elements';
import axios from 'axios';
import queryString from 'query-string';
import { firebaseConnect } from 'react-redux-firebase';

class DonateForm extends React.Component {
  state = {
    amount: 25,
    isLoading: false,
    note: '',
    error: null,
    success: null,
    complete: false,
  }

  constructor(props) {
    super(props);

    // Bind
    this.makeCharge = this.makeCharge.bind(this);
  }

  makeCharge() {
    const { amount, note } = this.state;

    this.chargeButton.blur()

    this.setState({
      error: null,
      success: null,
      isLoading: true
    });

    // Get token containing card details
    this.props.stripe.createToken({type: 'card'})
    .then((token) => {
      // Send token and other payment information
      // to our server to complete the payment request
      axios({
        method:'get',
        url:'http://interglobal.vision/odie-donate/charge.php',
        params: {
          amount,
          currency: 'usd',
          token: token.token.id,
          email: this.props.userEmail,
          description: 'Odie donation:' + note,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer sk_test_7neLDJD2qnl7mtbDbzTyvMJR',
        },
        mode: 'no-cors',
      })
      .then((response) => {
        if (response.data === 'authorized') {
          // Success
          this.setState({ success: 'Thank you for your donation! A receipt will be sent to your email.' });
          this.cardElement.clear(); // Clear card details
        } else if (response.status === 200) {
          // Card declined
          this.setState({ error: response.data.message });
        } else {
          // Stripe error
          this.setState({ error: response });
        }

        this.setState({ isLoading: false });
      })
    }).catch((error) => {
      // Axios error
      this.setState({
        error: 'Please try again later.',
        isLoading: false
      });
      console.error(error);
    });
  }

  render() {
    return (
      <form className='grid-item item-s-12 item-l-9 item-xl-6 no-gutter' onSubmit={event => event.preventDefault()}>
        <div className='grid-row'>
          <div className='grid-item item-s-12 margin-bottom-small'>
            <div className='border-top'></div>
          </div>

          <div className='grid-item item-s-12 grid-row align-items-center no-gutter margin-bottom-small'>
            <div className='grid-item flex-grow'>
              <input
                id='amount'
                name='amount'
                type='range'
                min='1'
                max='100'
                step='1'
                disabled={this.state.isLoading}
                value={this.state.amount}
                onChange={ event => this.setState({ amount: event.target.value })}
              />
            </div>
            <div className='grid-item item-s-3 item-m-2 font-size-large'>${this.state.amount} <span className='font-size-small'>USD</span></div>
            <label htmlFor='amount' className='grid-item item-s-12 margin-top-micro font-size-small u-inline-block'>
              <div>Give from $1 - $100</div>
            </label>
          </div>

          <label className='grid-item item-s-12 margin-bottom-small'>
            <CardElement
              onReady={(ref) => this.cardElement = ref}
              onChange={(element) => {
                // Card element form is filled
                this.setState({ complete: element.complete })
              }}
              style={{base: {fontSize: '14px'}}}
            />
            <div className='margin-top-micro font-size-small'>Card details</div>
          </label>

          <div id="form-odie-description" className='grid-item item-s-12 margin-bottom-small'>
            <textarea
              id='note'
              name='note'
              placeholder='note'
              disabled={this.state.isLoading}
              value={this.state.note}
              onChange={ event => this.setState({ note: event.target.value })}
              className='margin-bottom-micro'
              rows='3'
            />
            <label htmlFor='description' className='font-size-small u-inline-block'>
              <div>In case you'd like to say a little something.</div>
            </label>
          </div>
        </div>

        <div className='grid-row margin-bottom-basic justify-end align-items-center'>
          <div className='grid-item font-size-small'>
            <span className='color-error'>{ this.state.error }</span>
            { this.state.success }
          </div>
          <div className='grid-item'>
            <button
              className='button-link-style font-size-large'
              onClick={() => this.makeCharge()}
              ref={(ref) => this.chargeButton = ref}
              disabled={this.state.isLoading || !this.state.complete}
            >
              Make donation
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default injectStripe(DonateForm);
