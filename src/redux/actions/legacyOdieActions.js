import { getFirebase } from 'react-redux-firebase';
import * as Hash from 'object-hash';

export function setDocUrl(docUrl) {
  return {
    type: 'SET_DOC_URL',
    docUrl,
  }
}

export function setSubdomain(subdomain) {
  return {
    type: 'SET_SUBDOMAIN',
    subdomain,
  }
}

export function verifySubdomain(subdomain) {
  return dispatch => {
    const firebase = getFirebase();

    firebase.database().ref('odies').orderByChild('subdomain').equalTo(subdomain).once('value')
      .then( snapshot => {

        let verified = false;

        if (snapshot.val()) {
          verified = true;
        }

        dispatch({
          type: 'VERIFY_SUBDOMAIN',
          verified,
        });

        if(verified) {
          dispatch(verifySubdomainAndDocUrl());
        }

      })
  }
}

export function verifyDocUrl(docUrl) {
  return dispatch => {
    const firebase = getFirebase();

    firebase.database().ref('odies').orderByChild('docUrl').equalTo(docUrl).once('value')
      .then( snapshot => {

        let verified = false;

        if (snapshot.val()) {
          verified = true;
        }

        dispatch({
          type: 'VERIFY_DOC_URL',
          verified,
        });

        if(verified) {
          dispatch(verifySubdomainAndDocUrl());
        }

      })
  }
}

export function verifySubdomainAndDocUrl() {
  return (dispatch, getState) => {
    const firebase = getFirebase();
    const { subdomain, docUrl } = getState().legacyOdie;

    if (subdomain && docUrl) {
      firebase.database().ref('odies').orderByChild('subdomain').equalTo(subdomain).limitToFirst(1).once('value')
        .then( snapshot => {
          let verified = false;

          if(snapshot.val()) {
            const key = Object.keys(snapshot.val())[0];
            const data = snapshot.val()[key];

            if(data.subdomain === subdomain && data.docUrl === docUrl) {
              verified = true;

              // Create hash
              const hash = Hash({
                subdomain,
                docUrl,
              });

              dispatch({
                type: 'SET_VERIFICATION_HASH',
                hash,
              });
            }
          }

          dispatch({
            type: 'VERIFY_SUBDOMAIN_AND_DOC_URL',
            verified,
          });

        })
    }
  }
}
