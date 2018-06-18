import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

const UserAccount = ({ firebase, dispatch, currentUID, Layout }) => {
  return (
    <Layout dispatch={dispatch} currentUID={currentUID} />
  );
};

export default compose(
  // Map state to props
  connect(({ firebase }) => {
    return ({ // used to pass data from the redux store (state.fireabase) to the component as prop (odie)
      currentUID: firebase.auth.uid,
    })
  })
)(UserAccount);
