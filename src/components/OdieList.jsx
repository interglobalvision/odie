import React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import OdieListItem from './OdieListItem';

const OdieList = ({ odies }) => {
  if (!isLoaded(odies)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(odies)) { // …else. If is empty…
    return 'You don\'t have any Odie\'s yet.'; // …show 'empty list'
  } else {
    return (
      <section className="margin-bottom-basic">
        <header className='grid-row margin-bottom-tiny font-size-small font-bold'>
          <div className='grid-item item-s-9 item-m-3'>
            <h3>Subdomain</h3>
          </div>
          <div className='grid-item item-s-0 item-m-5'>
            <h3>Title</h3>
          </div>
          <div className='grid-item item-s-0 item-m-2'>
            <h3>Views</h3>
          </div>
          <div className='grid-item item-s-3 item-m-2'>
            <h3>Options</h3>
          </div>
        </header>
        <div className="list-rows-holder">
          { Object.keys(odies).map( // …else map thru noticias
            (key, id) => <OdieListItem key={key} id={id} odie={odies[key]} />
          ) }
        </div>
      </section>
    );
  }

};

export default OdieList;
