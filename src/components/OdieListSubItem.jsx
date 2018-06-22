/* global confirm */
import React from 'react';
import { Link } from 'react-router-dom';
import { getFirebase } from 'react-redux-firebase';
import { unescapeHtml } from '../utilities/validation';

const OdieListSubItem = ({ odie }) => {
  const { key } = odie;
  const { title, subdomain, path, views } = odie;
  const { remove } = getFirebase;

  const removeOdie = (key) => {

    remove('odies/' + key)
    .then(() => {

      // Display success toast
      console.log('success');

    });
  };

  return(
    <div className='list-rows-item grid-item item-s-12 no-gutter grid-row padding-top-small align-items-center'>
      <div className='grid-item item-s-4 offset-s-4 item-m-2 offset-m-2 item-xl-9-2 offset-xl-9-2'>
        <span>/ </span><a className="link-underline" href={window.location.protocol + '//' + subdomain + '.' + window.location.host + '/' + path} target="_blank">{path}</a>
      </div>
      <div className='grid-item hide-mobile item-m-3 item-xl-9-2'>
        {unescapeHtml(title)}
      </div>
      <div className='grid-item hide-mobile item-m-1 item-xl-9-1'>
        {views}
      </div>
      <div className='grid-item item-s-4 item-m-3 item-xl-9-2 grid-row no-gutter'>
        <div className='grid-item item-s-4 item-m-auto'>
          <Link className='font-bold' to={'/edit/' + key} title='Edit'>
            <img src='/img/icon-edit.png' alt='Edit Odie' className='icon' />
          </Link>
        </div>
        <div className='grid-item item-s-4 item-m-auto'>
          <a className='u-pointer' onClick={() => { if (window.confirm('Are you sure you want to erase this Odie?')) removeOdie(key) }} title='Erase'>
            <img src='/img/icon-erase.png' alt='Remove Odie' className='icon' />
          </a>
        </div>
      </div>
    </div>
  );
}

export default OdieListSubItem;
