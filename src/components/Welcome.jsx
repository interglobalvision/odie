import React from 'react';
import AsciiOdie from './AsciiOdie';
import LoginForm from './Login';
import WelcomeHeader from './WelcomeHeader';

const Welcome = () => (
  <div className='container'>
    <WelcomeHeader />
    <div className='grid-row justify-around'>
      <div className='grid-item item-s-12 item-m-5 item-l-3'>
        <AsciiOdie />
      </div>
      <div className='grid-item item-s-12 item-m-5 item-l-3 grid-row align-content-start padding-top-small'>
        <h3 className="margin-bottom-tiny">Login to view, create, & edit your Odie’s</h3>
        <LoginForm />
        <div className="margin-bottom-basic">Want to make an Odie? Create an account!</div>
      </div>
      <div className='grid-item item-s-12 item-l-3 no-gutter grid-row padding-top-tiny'>
        <div className='grid-item item-s-12 item-m-6 item-l-12 margin-bottom-basic'>
          <h3 className='margin-bottom-tiny'>Odie of the Hour:</h3>
        </div>
        <div className='grid-item item-s-12 item-m-6 item-l-12'>
          <h3 className='margin-bottom-tiny'>Odie on Twitter</h3>
        </div>
      </div>
    </div>
  </div>
)

export default Welcome;
