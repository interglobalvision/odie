import axios from 'axios';
import { getFirebase } from 'react-redux-firebase';
import * as Hash from 'object-hash';
import { push } from 'connected-react-router'

import { requestContent }  from '../../utilities/google';

export const setDocUrl = (docUrl) => {
  return {
    type: 'SET_LEGACY_DOC_URL',
    docUrl,
  }
}

export const setSubdomain = (subdomain) => {
  return {
    type: 'SET_LEGACY_SUBDOMAIN',
    subdomain,
  }
}

export const verifySubdomain = (subdomain) => {
  return dispatch => {
    const firebase = getFirebase();

    firebase.database().ref('odies').orderByChild('subdomain').equalTo(subdomain).once('value')
      .then( snapshot => {

        let verified = false;

        if (snapshot.val()) {
          verified = true;
        }

        dispatch({
          type: 'LEGACY_VERIFY_SUBDOMAIN',
          verified,
        });

        if(verified) {
          dispatch(verifySubdomainAndDocUrl());
        }

      })
  }
}

export const verifyDocUrl = (docUrl) => {
  return dispatch => {
    const firebase = getFirebase();

    firebase.database().ref('odies').orderByChild('docUrl').equalTo(docUrl).once('value')
      .then( snapshot => {

        let verified = false;

        if (snapshot.val()) {
          verified = true;
        }

        dispatch({
          type: 'LEGACY_VERIFY_DOC_URL',
          verified,
        });

        if(verified) {
          dispatch(verifySubdomainAndDocUrl());
        }

      })
  }
}

export const verifySubdomainAndDocUrl = () => {
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
                type: 'SET_LEGACY_VERIFICATION_HASH',
                hash,
              });
            }
          }

          dispatch({
            type: 'LEGACY_VERIFY_SUBDOMAIN_AND_DOC_URL',
            verified,
          });

        })
    }
  }
}

export const verifyLegacyOdie = () => {
  return (dispatch, getState) => {
    const { subdomain, docUrl, verificationHash } = getState().legacyOdie;
    const { uid } = getState().firebase.auth;
    const firebase = getFirebase();

    axios.get(docUrl, {
      mode: 'no-cors',
    }).then( response => {
      const doc = new DOMParser().parseFromString(response.data, 'text/html');
      const contents = doc.getElementById('contents');

      if (contents.innerText.indexOf(verificationHash) >= 0) {

        return firebase.database().ref('odies').orderByChild('subdomain').equalTo(subdomain).limitToFirst(1).once('value');
      }
    }).then( snapshot => {

      if (snapshot.val()) {
        const id = Object.keys(snapshot.val())[0];

        return firebase.database().ref(`odies/${id}`).update({
          uid,
        });
      }
    }).then( response => {
      dispatch(push('/'));
      dispatch({
        type: 'RESET_LEGACY_FORM',
      });
    }).catch(function (error) {
      console.error(error);
    });
  }
}
