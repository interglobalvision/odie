import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router-dom';

import OdieList from './OdieList';
import OdieListItem from './OdieListItem';

describe('<OdieList />', () => {

  it('renders without crashing', () => {
    // Mount the component
    const component = shallow(<OdieList />)
  });

  it('renders empty Odies message', () => {
    // Empty odies
    const odies = {};

    // Mount the component
    const component = shallow(<OdieList odies={odies} />)

    // Expected message
    const emptyMessage = <span>You don’t have any Odies yet… But you can <Link to='/create' className='link-underline'>create one</Link>!</span>;

    expect(component.contains(emptyMessage)).toEqual(true);

  })

  it('renders Odies ', () => {
    // Mock Odies
    // NOTE: Since we are using shallow() to render <OdieList/> the components <OdieListItem /> don't actually
    // get rendered, so it doesn't fail if it's missing props like key, id or odie
    const odies = {
      one: {},
      two: {}
    };

    // Mount the component
    const component = shallow(<OdieList odies={odies} />)

    expect(component.find(OdieListItem).length).toEqual(Object.keys(odies).length);

  })

})
