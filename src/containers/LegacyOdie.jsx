import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  setDocUrl,
  setSubdomain,
  verifySubdomain,
  verifyDocUrl,
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
