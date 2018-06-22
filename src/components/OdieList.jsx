import React from 'react';
import { isEmpty } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import OdieListItem from './OdieListItem';
import OdieListSubItem from './OdieListSubItem';
import AsciiOdie from './AsciiOdie';
import DonationLink from './DonationLink'

const OdieList = ({ odies }) => {
  return (
    <section className='grid-row'>
      <header className='grid-item item-s-12 item-xl-9 margin-bottom-tiny no-gutter grid-row'>
        <div className='grid-item item-s-4 item-m-2 item-xl-9-2'>
          <h3>Subdomain</h3>
        </div>
        <div className='grid-item item-s-4 item-m-2 item-xl-9-2'>
          <h3>Path</h3>
        </div>
        <div className='grid-item hide-mobile item-m-3 item-xl-9-2'>
          <h3>Title</h3>
        </div>
        <div className='grid-item hide-mobile item-m-1 item-xl-9-1'>
          <h3>Views</h3>
        </div>
        <div className='grid-item item-s-4 item-m-3 item-xl-9-2'>
          <h3>Options</h3>
        </div>
      </header>
      <div className="grid-item item-s-12 item-xl-9 no-gutter margin-bottom-small">
        <div className='grid-row'>
          <div className='grid-item item-s-12'>
            <div className='border-top'></div>
          </div>
          { isEmpty(odies) ?
            <div className='grid-item item-s-12 margin-top-basic margin-bottom-basic font-size-large'>
              <span>You don’t have any Odies yet… But you can <Link to='/create' className='link-underline'>create one</Link>!</span>
            </div> :
            Object.keys(odies).map( // …else map thru noticias
              (key, id) => {
                const paths = odies[key].value.paths || {};

                return (
                  <div key={'odie-item-holder-' + key} className='grid-item item-s-12 no-gutter grid-row'>
                    <OdieListItem key={key} id={id} odie={odies[key]} />
                    {
                      Object.keys(paths).map( // …else map thru noticias
                        (subkey, id) => {
                          return (
                            <OdieListSubItem key={subkey} id={id} odie={paths[subkey]} />
                          )
                        }
                      )
                    }
                    <div className='grid-item item-s-12 margin-top-small'>
                      <div className='border-top'></div>
                    </div>
                  </div>
                )
              }
            )
          }
        </div>
      </div>
      <div className='grid-item item-s-12 item-xl-3 text-align-center align-self-start'>
        <div className='code-holder padding-top-small padding-bottom-small'>
          <AsciiOdie />
        </div>
        <DonationLink />
      </div>
    </section>
  );
};

export default OdieList;
