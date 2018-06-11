import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import OdieView from '../components/OdieView.jsx';

const ViewOdie = ({ firebase, odie, dispatch }) => {

  if (!isLoaded(odie)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(odie)) { // …else. If is empty…
    return '404'; // …show 'Error?'
  } else {
    return (
      <section>
        <OdieView odie={odie} dispatch={dispatch} />
      </section>
    );
  }
};

export default compose(
  firebaseConnect((props) => ([{
    path: 'odies',
    queryParams: ['orderByChild=subdomain', `equalTo=${props.subdomain}`],
    storeAs: 'odie'
  }])),
  connect(({ firebase }) => {
    return ({
      odie: firebase.data.odie,
    })
  })
)(ViewOdie);
