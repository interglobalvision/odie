import React from 'react';
import AsciiOdie from './AsciiOdie';
import LoginForm from './Login';
import { Link } from 'react-router-dom';

const Welcome = () => (
  <div className='container'>
    <div id='welcome-row' className='grid-row'>
      <div className='grid-item item-s-12 item-m-6 item-l-5 item-xl-3 code-holder text-align-center padding-top-small padding-bottom-small'>
        <AsciiOdie />
      </div>
      <div className='grid-item item-s-12 item-m-6 item-l-5 item-xl-3 padding-top-small'>
        <h3 className='margin-bottom-tiny'>Login to view, create, & edit your Odies</h3>
        <LoginForm />
        <div className='margin-bottom-basic'>Want to make an Odie? <Link className='u-inline-block link-underline' to={'/createaccount'}>Create an account!</Link></div>
      </div>
      <div className='grid-item item-s-12 item-m-12 item-l-10 item-xl-3 no-gutter grid-row padding-top-small align-content-start'>
        <div className='grid-item item-s-12 item-m-6 item-xl-12 margin-bottom-basic'>
          <h3 className='margin-bottom-tiny'>Odie of the Hour:</h3>
          <h4 className='font-size-large'><a href='http://someodie.odie.us' className='link-underline'>Some Odie</a></h4>
        </div>
        <div className='grid-item item-s-12 item-m-6 item-xl-12'>
          <h3 className='margin-bottom-tiny'>Odie on Twitter</h3>
        </div>
      </div>
    </div>
  </div>
)

export default Welcome;
