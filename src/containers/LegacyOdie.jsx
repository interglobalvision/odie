import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  setDocUrl,
  setSubdomain,
  verifyLegacySubdomainExists,
  verifyLegacyDocUrlExists,
  verifyLegacyOdie,
} from '../redux/actions/legacyOdieActions';

import LegacyOdieForm from '../components/LegacyOdieForm.jsx';

const mapStateToProps = state =>  {
  return {
    currentUIDs: state.firebase.auth.uid,
    legacyOdie: state.legacyOdie,
  }
}
const mapDispatchToProps = dispatch =>  ({
  setSubdomain: data => {
    dispatch(setSubdomain(data));
    dispatch(verifyLegacySubdomainExists(data));
  },
  setDocUrl: data => {
    dispatch(setDocUrl(data));
    dispatch(verifyLegacyDocUrlExists(data));
  },
  verifyLegacyOdie: () => dispatch(verifyLegacyOdie()),
});

export default compose(
  // Map state to props
  connect(mapStateToProps, mapDispatchToProps)
)(LegacyOdieForm);
