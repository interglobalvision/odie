/* global confirm */
import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { unescapeHtml } from '../utilities/validation';

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
      <div className='grid-item item-s-8 item-m-4 item-xl-9-3'>
        <a className="link-underline" href={window.location.protocol + '//' + subdomain + '.' + window.location.host} target="_blank">{subdomain}</a>
      </div>
      <div className='grid-item hide-mobile item-m-4 item-xl-9-3'>
        {unescapeHtml(title)}
      </div>
      <div className='grid-item hide-mobile item-m-1 item-xl-9-1'>
        {views}
      </div>
      <div className='grid-item item-s-4 item-m-3 item-xl-9-2 grid-row no-gutter'>
        <div className='grid-item item-s-6 item-m-auto'>
          <Link className='font-bold' to={'/edit/' + key} title='Edit'>
            <img src='/img/icon-edit.png' alt='Edit Odie' className='icon' />
          </Link>
        </div>
        <div className='grid-item item-s-6 item-m-auto'>
          <a className='u-pointer' onClick={() => { if (window.confirm('Are you sure you want to erase this Odie?')) removeOdie(key) }} title='Erase'>
            <img src='/img/icon-erase.png' alt='Remove Odie' className='icon' />
          </a>
        </div>
      </div>
      <div className='grid-item item-s-12 margin-top-small'>
        <div className='border-top'></div>
      </div>
    </div>
  );
}

export default withFirebase(OdieListItem);
