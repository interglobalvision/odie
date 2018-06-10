import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import OdieView from '../components/OdieView.jsx';

const ViewOdie = ({ odie }) => {
  if (isEmpty(odie)) { // …else. If is empty…
    return 'Nope'; // …show 'Error?'
  } else {
    return (
      <section>
        <OdieView odie={odie} />
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
