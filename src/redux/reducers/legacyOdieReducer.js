// This is our initial state
const initialState = {
  loading: false,
  error: false,
  subdomain: '',
  subdomainValid: true,
  docUrl: '',
  docUrlValid: true,
  isLoading: false,
  isValid: true,
  docUrlAndSubdomainMatch: true,
  verificationHash: '',
};

// The loading reducer
export const legacyOdieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LEGACY_DOC_URL':
      return Object.assign({}, state, {
        docUrl: action.docUrl,
      });
    case 'SET_LEGACY_SUBDOMAIN':
      return Object.assign({}, state, {
        subdomain: action.subdomain
      });
    case 'SET_LEGACY_VERIFY_SUBDOMAIN':
      return Object.assign({}, state, {
        subdomainValid: action.verified,
      });
    case 'SET_LEGACY_VERIFY_DOC_URL':
      return Object.assign({}, state, {
        docUrlValid: action.verified,
      });
    case 'SET_LEGACY_VERIFY_SUBDOMAIN_AND_DOC_URL':
      return Object.assign({}, state, {
        docUrlAndSubdomainMatch: action.verified,
      });
    case 'SET_LEGACY_VERIFICATION_HASH':
      return Object.assign({}, state, {
        verificationHash: action.hash,
      });
    case 'SET_LEGACY_LOADING':
      return Object.assign({}, state, {
        loading: true,
      });
    case 'UNSET_LEGACY_LOADING':
      return Object.assign({}, state, {
        loading: false,
      });
    case 'SET_LEGACY_ERROR':
      return Object.assign({}, state, {
        error: action.error || 'An error happened. Please try again later',
      });
    case 'UNSET_LEGACY_ERROR':
      return Object.assign({}, state, {
        error: false,
      });
    case 'RESET_LEGACY_FORM':
      return initialState;
    default:
      return state
  }
}
