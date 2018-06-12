import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import OdieList from '../components/OdieList';
import Loading from '../components/Loading';

const Odies = ({ odies }) => {

  if (!isLoaded(odies)) { // If not loaded…
    return <Loading />; // …show 'loading'
  } else {
    return <OdieList odies={odies} />
  }

};

export default compose(
  // Get noticia path from firebase based on params prop (route params from react-router)
  firebaseConnect((props, store) => ([{
    path: 'odies',
    queryParams: ['orderByChild=uid', `equalTo=${store.getState().firebase.auth.uid}`]
  }])),
  // Map state to props
  // firebase = state.firebase
  // ordered = state.firebase.ordered
  connect(({ firebase: { ordered } }) => {
    return ({
      odies: ordered.odies,
    })
  })
)(Odies);
