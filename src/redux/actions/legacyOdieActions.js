import axios from 'axios';
import { getFirebase } from 'react-redux-firebase';
import * as Hash from 'object-hash';
import { push } from 'connected-react-router'

import { validateDocUrl } from '../../utilities/validation';

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

    // Clean error message
    dispatch({
      type: 'UNSET_LEGACY_ERROR',
    });

    // Query firebase for a record a single record that matches the subdomain
    firebase.database().ref('odies').orderByChild('subdomain').equalTo(subdomain).limitToFirst(1).once('value')
      .then( snapshot => {

        let verified = false;

        if (snapshot.exists() ) { // Check that a record was found
          const odie = Object.values(snapshot.val())[0]; // Get the first and only one record

          if(odie.uid === undefined) { // Check that record doesn't have a user assinged (UID)
            verified = true;
          } else {
            // Dispatch error
            dispatch({
              type: 'SET_LEGACY_ERROR',
              error: 'This subdomain is already linked to an account',
            });
          }
        }

        // Set the verified value
        dispatch({
          type: 'SET_LEGACY_VERIFY_SUBDOMAIN',
          verified,
        });

        if(verified) { // If it was verified
          // Dispatch action to verify that domain and doc url match in the same odie
          dispatch(verifySubdomainAndDocUrl());
        }

      })
      .catch( error => {
        console.log(error);
        dispatch({
          type: 'SET_LEGACY_ERROR',
        });
      });
  }
}

export const verifyDocUrl = (docUrl) => {
  return dispatch => {
    const firebase = getFirebase();

    // Clean error message
    dispatch({
      type: 'UNSET_LEGACY_ERROR',
    });

    if (validateDocUrl(docUrl)) {
      // Query firebase for a record a single record that matches the docUrl
      firebase.database().ref('odies').orderByChild('docUrl').equalTo(docUrl).once('value')
        .then( snapshot => {

          let verified = false;

          if (snapshot.exists() ) { // Check that a record was found
            const odie = Object.values(snapshot.val())[0]; // Get the first and only one record

            if(odie.uid === undefined) { // Check that record doesn't have a user assinged (UID)
              verified = true;
            } else {
              // Dispatch error
              dispatch({
                type: 'SET_LEGACY_ERROR',
                error: 'This Google Doc is already linked to an account',
              });
            }
          }

          // Set the verified value
          dispatch({
            type: 'SET_LEGACY_VERIFY_DOC_URL',
            verified,
          });

          if(verified) { // If it was verified
            // Dispatch action to verify that domain and doc url match in the same odie
            dispatch(verifySubdomainAndDocUrl());
          }

        })
        .catch( error => {
          console.log(error);
          dispatch({
            type: 'SET_LEGACY_ERROR',
            error: 'An error happened. Please try again later',
          });
        });
    } else {
      dispatch({
        type: 'SET_LEGACY_ERROR',
        error: 'This Google Doc url seems to be wrong',
      });
    }
  }
}

export const verifySubdomainAndDocUrl = () => {
  return (dispatch, getState) => {
    const firebase = getFirebase();
    const { subdomain, docUrl } = getState().legacyOdie;

    // Clean error message
    dispatch({
      type: 'UNSET_LEGACY_ERROR',
    });

    if (subdomain && docUrl) { // Check subdomain and docUrl are set

      // Query firebase for a record a single record that matches the subdomain
      firebase.database().ref('odies').orderByChild('subdomain').equalTo(subdomain).limitToFirst(1).once('value')
        .then( snapshot => {
          let verified = false;

          if (snapshot.exists() ) { // Check that a record was found
            // The data from the record found
            const odie = Object.values(snapshot.val())[0]; // Get the first and only one record

            // Check that the input subdomain and docUrl match the ones in the record
            if(odie.subdomain === subdomain && odie.docUrl === docUrl) {
              verified = true;

              // Create hash. This creats a unique hash based on the subdomain and
              // docUrl. This hash is always the same for the same input values
              const hash = Hash({
                subdomain,
                docUrl,
              });

              // Set the verification hash
              dispatch({
                type: 'SET_LEGACY_VERIFICATION_HASH',
                hash,
              });

            } else { // If subdomain and docUrl don't match
              dispatch({
                type: 'SET_LEGACY_ERROR',
                error: 'The subdomain and the Google Doc don\'t match our records. If you believe this is a mistake feel free to contact us',
              });
            }
          }

          dispatch({
            type: 'SET_LEGACY_VERIFY_SUBDOMAIN_AND_DOC_URL',
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

    // Clean error message
    dispatch({
      type: 'UNSET_LEGACY_ERROR',
    });

    // Set Loading
    dispatch({
      type: 'SET_LEGACY_LOADING',
    });

    // Make a request to the Google Doc pub url
    axios.get(docUrl, {
      mode: 'no-cors',
    }).then( response => {
      const doc = new DOMParser().parseFromString(response.data, 'text/html');
      const contents = doc.getElementById('contents');

      // Find the verification hash in the content
      if (contents.innerText.indexOf(verificationHash) >= 0) {

        // Return the Promise of querying for a record that matches the subdomain
        return firebase.database().ref('odies').orderByChild('subdomain').equalTo(subdomain).limitToFirst(1).once('value');
      }
    }).then( snapshot => {
      if (snapshot.exists() ) { // Check that a record was found
        // Get the record id
        const id = Object.keys(snapshot.val())[0];

        // Return the Promise of updating the record with the uid
        return firebase.database().ref(`odies/${id}`).update({
          uid,
        });
      }
    }).then( response => {
      // Redirect to '/'
      dispatch(push('/'));
      // Reset the legacy part of the store
      dispatch({
        type: 'RESET_LEGACY_FORM',
      });
    }).catch(function (error) {

      console.error(error);

      // Set generic error
      dispatch({
        type: 'SET_LEGACY_ERROR',
      });

      // Unset Loading
      dispatch({
        type: 'UNSET_LEGACY_LOADING',
      });
    });
  }
}
