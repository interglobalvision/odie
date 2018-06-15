import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import Donate from '../components/Donate.jsx';

const Donations = ({ userEmail }) => {
  return (
    <Donate userEmail={userEmail} />
  );
};

export default compose(
  firebaseConnect(),
  connect(({ firebase }) => {
    return ({
      userEmail: firebase.auth.email,
    })
  })
)(Donations);
