import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NoMatch from './NoMatch.jsx';
import Odies from '../containers/Odies';
import AddOdie from '../containers/AddOdie';
import UpdateOdie from '../containers/UpdateOdie';
import Donations from '../containers/Donations';

const Dashboard = () => {
  return (
    <div className='container'>
      <Switch>
        <Route exact path='/' component={Odies} />
        <Route path='/create' component={AddOdie} />
        <Route path='/edit/:key' component={UpdateOdie} />
        <Route path='/donate' component={Donations}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  )
};

export default Dashboard;
