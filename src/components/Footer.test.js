import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer', () => {
  /**
   * Smoke test, renders without throwing
   *
   * This test mounts a component and makes sure that it didn’t throw during rendering.
   **/
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Footer />, div);
  });

  /**
   * Shallow test
   *
   * Test components in isolation from the child components they render
   **/
  it('renders "Universal basic income NOW"', () => {
    const wrapper = shallow(<Footer />);
    const textHeader = <p>Universal basic income NOW</p>;
    expect(wrapper.contains(textHeader)).toEqual(true);
  });

  it('renders "Made by interglobal.vison"', () => {
    const wrapper = shallow(<Footer />);
    const textHeader = <p>Made by <a className='link-underline' href="http://interglobal.vision">interglobal.vision</a></p>;
    expect(wrapper.contains(textHeader)).toEqual(true);
  });
})
