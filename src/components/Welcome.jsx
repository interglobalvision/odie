import React from 'react';
import AsciiOdie from './AsciiOdie';
import LoginForm from './Login';
import WelcomeHeader from './WelcomeHeader';

const Welcome = () => (
  <div className='container'>
    <WelcomeHeader />
    <div className='grid-row'>
      <div className='grid-item item-s-12 item-m-5 item-l-3'>
        <AsciiOdie />
      </div>
      <div className='grid-item item-s-12 item-m-5 item-l-3 no-gutter grid-row align-content-start'>
        <h3>Login to view, create, & edit your Odie’s</h3>
        <LoginForm />
        <div>Want to make an Odie? Create an account!</div>
      </div>
      <div className='grid-item item-s-12 item-l-3 no-gutter grid-row'>
        <div className='grid-item item-s-12 item-m-6 item-l-12'>
          Odie of the Hour:
        </div>
        <div className='grid-item item-s-12 item-m-6 item-l-12'>
          Odie on Twitter
        </div>
      </div>
    </div>
  </div>
)

export default Welcome;
