/* global confirm */
import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';

const OdieListItem = ({ odie, firebase: { remove } }) => {
  const { key } = odie;
  const { title, subdomain, views } = odie.value;

  const removeOdie = (key) => {

    remove('odies/' + key)
    .then(() => {

      // Display success toast
      console.log('success');

    });
  };

  return(
    <div className='list-rows-item grid-row padding-top-micro padding-bottom-micro align-items-center'>
      <div className='grid-item item-s-9 item-m-3'>
        <a className="link-underline" href={window.location.protocol + '//' + subdomain + '.' + window.location.host} target="_blank">{subdomain}</a>
      </div>
      <div className='grid-item item-s-0 item-m-5'>
        {title}
      </div>
      <div className='grid-item item-s-0 item-m-2'>
        {views}
      </div>
      <div className='grid-item item-s-3 item-m-2 grid-row no-gutter'>
        <div className='grid-item'>
          <Link className='font-bold' to={'/edit/' + key}>Edit</Link>
        </div>
        <div className='grid-item'>
          <button className='u-pointer font-bold' onClick={() => removeOdie(key)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default withFirebase(OdieListItem);
