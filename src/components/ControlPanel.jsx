import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from './Nav';
import Welcome from './Welcome';
import NoMatch from '../components/NoMatch.jsx';

import Odies from '../containers/Odies';
import AddOdie from '../containers/AddOdie';
import UpdateOdie from '../containers/UpdateOdie';

const ControlPanel = () => {
  return (
    <div className='container'>
      <Nav />
      <div>
        <Switch>
          <Route exact path='/odies' component={Odies} />
          <Route path='/odies/create' component={AddOdie} />
          <Route path='/odies/edit/:key' component={UpdateOdie} />
          <Route exact path='/' component={Welcome} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    </div>
  )
};

export default ControlPanel;
