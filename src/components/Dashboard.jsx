import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NoMatch from '../components/NoMatch.jsx';

import Odies from '../containers/Odies';
import AddOdie from '../containers/AddOdie';
import UpdateOdie from '../containers/UpdateOdie';
import DashboardHeader from './DashboardHeader.jsx';
import Footer from './Footer.jsx';

const Dashboard = () => {
  return (
    <div id='main-container'>
      <DashboardHeader />
      <main id='main-content'>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Odies} />
            <Route path='/create' component={AddOdie} />
            <Route path='/edit/:key' component={UpdateOdie} />
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </main>
      <Footer />
    </div>
  )
};

export default Dashboard;
