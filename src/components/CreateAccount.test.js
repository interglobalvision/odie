import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import createRouterContext from 'react-router-test-context'

import CreateAccount from './CreateAccount';

/**
 * Setup stuff
 */

// Overrides `router` marked as default in the contextTypes
CreateAccount.contextTypes = {
  router: PropTypes.object
};

// Create a new router context
const context = createRouterContext();

/**
 * Tests
 */
describe('<CreateAccount />', () => {

  it('renders without crashing', () => {
    // Mount the component
    const component = mount(<CreateAccount />, { context })
  });

  it('should handle the email field onChange event and update state', () => {
    const expectedValue = 'test@email.com';

    // Mount the component
    const component = mount(<CreateAccount />, { context });

    // Check initial state
    expect(component.state().email).toEqual('');

    // Call onChange with the expectedValue / Change input value
    component.find('input[placeholder="email"]').prop('onChange')({ target: { value: expectedValue } });

    // Check changed state
    expect(component.state().email).toEqual(expectedValue);
  });

  it('should handle the password field onChange event and update state', () => {
    const expectedValue = '123123';

    // Mount the component
    const component = mount(<CreateAccount />, { context });

    // Check initial state
    expect(component.state().password).toEqual('');

    // Call onChange with the expectedValue / Change input value
    component.find('input[placeholder="password"]').prop('onChange')({ target: { value: expectedValue } });

    // Check changed state
    expect(component.state().password).toEqual(expectedValue);
  });

  it('should call createUser() on button click', () => {
    // Override login() with a mock function
    CreateAccount.prototype.createUser = jest.fn();

    // Set spy for login function
    const spy = jest.spyOn(CreateAccount.prototype, 'createUser');

    // Mount the component
    const component = mount(<CreateAccount />, { context });

    // Simulate click in Login button
    component.find('button').simulate('click');

    expect(spy).toHaveBeenCalled();

  });

})
