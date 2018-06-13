import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import createRouterContext from 'react-router-test-context'

import { LoginForm } from './Login';

describe('Login Form', () => {

  it('renders without crashing', () => {

    // Overrides `router` marked as default in the contextTypes
    LoginForm.contextTypes = {
      router: PropTypes.object
    };

    // Create a new router context
    const context = createRouterContext();

    // Mock the firebase
    // https://github.com/prescottprue/react-redux-firebase/issues/114
    const mockFirebase = {
      login: jest.fn(() => Promise.resolve({ email: "test@example.com" }))
    };

    // Mount the component
    const component = mount(<LoginForm
      fireabase={mockFirebase}
      />, { context })
  });
})
