import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

import OdieList from '../components/OdieList';

const Odies = ({ odies }) => (
  <section>

    <header className='grid-row margin-bottom-basic'>
      <div className='grid-item'>
        <h1 className='font-size-large'>Your Odies</h1>
      </div>
    </header>

    <div className='grid-row margin-bottom-basic justify-end'>
      <div className='grid-item'>
        <Link className='button' to='/odies/create'>Create Odie</Link>
      </div>
    </div>

    <OdieList odies={odies} />

  </section>
);

export default compose(
  // Get noticia path from firebase based on params prop (route params from react-router)
  firebaseConnect((props, store) => ([{
    path: 'odies',
    queryParams: ['orderByChild=uid', `equalTo=${store.getState().firebase.auth.uid}`]
  }])),
  // Map state to props
  // firebase = state.firebase
  // ordered = state.firebase.ordered
  connect(({ firebase: { ordered } }) => {
    return ({
      odies: ordered.odies,
    })
  })
)(Odies);
