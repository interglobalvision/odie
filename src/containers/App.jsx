import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase';

import LoginForm from '../components/Login.jsx';
import ControlPanel from '../components/ControlPanel.jsx';
import NoMatch from '../components/NoMatch.jsx';
import RenderOdie from '../components/RenderOdie.jsx';

const App = (props) => {
  const { auth } = props;
  const subdomain = window.location.hostname.split('.')[0];

  if (subdomain.length && subdomain !== 'localhost') {

    return (
      <div>
        <Switch>
          <Route path='/' render={(props) => <RenderOdie {...props} subdomain={subdomain} />}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }

  if (!isLoaded(auth)) {
    return (
      <div>
        <span>Loading</span>
      </div>
    )
  }

  if (isEmpty(auth)) {

    return (
      <div>
        <Switch>
          <Route exact path='/' component={LoginForm} />
          <Route exact path='/login' component={LoginForm} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }

  return (
    <div>
      <Switch>
        <Route path='/' component={ControlPanel} />
        <Route component={NoMatch}/>
      </Switch>
    </div>
  );
};

// sync /todos from firebase into redux
const firebaseWrapped = firebaseConnect()(App);

export default withRouter(connect(({firebase}) => ({
    authError: getVal(firebase, 'authError'),
    auth: getVal(firebase, 'auth'),
    profile: getVal(firebase, 'profile')
  })
)(firebaseWrapped));
