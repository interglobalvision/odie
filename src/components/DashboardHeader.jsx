import React from 'react';
import DashboardNav from './DashboardNav';
import { Link } from 'react-router-dom';

const DashboardHeader = () => (
  <header className='header container grid-row justify-between'>
    <div className='grid-item item-s-3 padding-top-small'>
      <h1 className='font-size-large'><Link to='/'>Odie</Link></h1>
    </div>
    <DashboardNav />
  </header>
)

export default DashboardHeader;
