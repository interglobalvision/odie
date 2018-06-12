import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase';

import Welcome from '../components/Welcome.jsx';
import WelcomeHeader from '../components/WelcomeHeader.jsx';
import ControlPanel from '../components/ControlPanel.jsx';
import NoMatch from '../components/NoMatch.jsx';
import Footer from '../components/Footer.jsx';
import ViewOdie from './ViewOdie.jsx';

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
    return (
      <div>
        <span>Loading</span>
      </div>
    )
  }

  if (isEmpty(auth)) {

    return (
      <div>
        <WelcomeHeader />
        <main id="main-content">
          <Switch className='main-content'>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/login' component={Welcome} />
            <Route component={NoMatch}/>
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <main id="main-content">
        <Switch>
          <Route path='/' component={ControlPanel} />
          <Route component={NoMatch}/>
        </Switch>
      </main>
      <Footer />
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
