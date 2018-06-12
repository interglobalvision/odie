import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import OdieForm from '../components/OdieForm.jsx';

const UpdateOdie = ({ firebase, odie, id, dispatch, currentUID }) => {

  if (!isLoaded(odie)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(odie)) { // …else. If is empty…
    return 'Error'; // …show 'Error?'
  } else {
    return (
      <OdieForm id={id} odie={odie} dispatch={dispatch} currentUID={currentUID} />
    );
  }
};

export default compose(
  // Get noticia path from firebase based on params prop (route params from react-router)
  firebaseConnect( ({ match: { params } }) => ([{
    path: `odies/${params.key}`, // connect with '/odies/:key'
    storeAs: 'odie' // Store this data in `odie`
  }])),
  // Map state to props
  connect(({ firebase }, { match }) => {
    return ({ // used to pass data from the redux store (state.fireabase) to the component as prop (odie)
      odie: firebase.data.odie,
      currentUID: firebase.auth.uid,
      id: match.params.key,
    })
  })
)(UpdateOdie);
