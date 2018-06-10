/* global confirm */
import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';

const OdieListItem = ({ odie, firebase: { remove } }) => {
  const { key } = odie;
  const { title } = odie.value;

  const removeOdie = (key) => {

    remove('odies/' + key)
    .then(() => {

      // Display success toast
      console.log('success');

    });
  };

  return(
    <div className='list-rows-item grid-row padding-top-micro padding-bottom-micro align-items-center'>
      <div className='grid-item'>
        <span><Link className="link-underline" to={'/odies/edit/' + key}>{title}</Link></span>
      </div>
      <div className='grid-item flex-grow grid-row no-gutter justify-end'>
        <div className='grid-item'>
          <Link className='font-bold' to={'/odies/edit/' + key}>Edit</Link>
        </div>
        <div className='grid-item'>
          <button className='u-pointer font-bold' onClick={() => removeOdie(key)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default withFirebase(OdieListItem);
