import React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import OdieListItem from '../components/OdieListItem';

const OdieList = ({ odies }) => {
  if (!isLoaded(odies)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(odies)) { // …else. If is empty…
    return 'You don\'t have any Odie\'s yet.'; // …show 'empty list'
  } else {
    return (
      <section className="margin-bottom-basic">
        <header className='grid-row margin-bottom-tiny font-size-small font-bold'>
          <div className='grid-item item-s-3'>
            <h3>Subdomain</h3>
          </div>
          <div className='grid-item item-s-0 item-m-auto'>
            <h3>Title</h3>
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
