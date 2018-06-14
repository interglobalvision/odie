import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase';

import Welcome from '../components/Welcome.jsx';
import Dashboard from '../components/Dashboard.jsx';
import NoMatch from '../components/NoMatch.jsx';
import ViewOdie from './ViewOdie.jsx';
import Loading from '../components/Loading.jsx';

const App = (props) => {
  const { auth } = props;
  const subdomain = window.location.hostname.split('.')[0];

  if (subdomain.length && subdomain !== 'localhost') {

    return (
      <div>
        <Switch>
          <Route path='/' render={(props) => <ViewOdie {...props} subdomain={subdomain} />}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }

  if (!isLoaded(auth)) {
    return <Loading />
  }

  if (isEmpty(auth)) {

    return (
      <Welcome />
    );
  }

  return (
    <Dashboard />
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
