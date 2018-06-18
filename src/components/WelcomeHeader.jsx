import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeHeader = () => (
  <header id='header-welcome' className='header container grid-row'>
    <div className='grid-item item-s-12 padding-top-small font-size-large'>
      <span className='u-inline-block'><h1 className='u-inline-block font-size-large'><Link to='/'>Odie</Link></h1> makes a webpage</span> <span className='u-inline-block'>with the contents of a google doc</span>
    </div>
  </header>
)

export default WelcomeHeader;
