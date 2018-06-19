import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import Donate from '../components/Donate.jsx';

const Donations = ({ firebase, authUser }) => {
  return (
    <Donate authUser={authUser} />
  );
};

export default compose(
  firebaseConnect(),
  connect(({ firebase }) => {
    return ({
      authUser: firebase.auth,
    })
  })
)(Donations);
