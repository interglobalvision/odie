import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import { setIsLoading, setIsLoaded } from '../redux/actions/loadingStatusActions'
import {
  setDocUrl,
  setSubdomain,
  verifySubdomain,
  verifyDocUrl,
  verifyLegacyOdie,
} from '../redux/actions/legacyOdieActions';

import LegacyOdieForm from '../components/LegacyOdieForm.jsx';

const mapStateToProps = state =>  {
  return { // used to pass data from the redux store (state.fireabase) to the component as prop (odie)
    currentUIDs: state.firebase.auth.uid,
    odie: state.legacyOdie,
  }
}
const mapDispatchToProps = dispatch =>  ({
  setSubdomain: data => {
    dispatch(setSubdomain(data));
    dispatch(verifySubdomain(data));
  },
  setDocUrl: data => {
    dispatch(setDocUrl(data));
    dispatch(verifyDocUrl(data));
  },
  verifyLegacyOdie: () => dispatch(verifyLegacyOdie()),
});

export default compose(
  // Map state to props
  connect(mapStateToProps, mapDispatchToProps)
)(LegacyOdieForm);
