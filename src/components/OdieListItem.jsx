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
    <div className='list-rows-item grid-item item-s-12 no-gutter grid-row padding-top-small align-items-center'>
      <div className='grid-item item-s-9 item-m-4 item-xl-9-3'>
        <a className="link-underline" href={window.location.protocol + '//' + subdomain + '.' + window.location.host} target="_blank">{subdomain}</a>
      </div>
      <div className='grid-item hide-mobile item-m-4 item-xl-9-3'>
        {title}
      </div>
      <div className='grid-item hide-mobile item-m-1 item-xl-9-1'>
        {views}
      </div>
      <div className='grid-item item-s-3 item-m-3 item-xl-9-2 grid-row no-gutter'>
        <div className='grid-item'>
          <Link className='font-bold' to={'/edit/' + key}>Edit</Link>
        </div>
        <div className='grid-item'>
          <button className='u-pointer font-bold' onClick={() => removeOdie(key)}>Delete</button>
        </div>
      </div>
      <div className='grid-item item-s-12 margin-top-small'>
        <div className='border-top'></div>
      </div>
    </div>
  );
}

export default withFirebase(OdieListItem);
