import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import AsciiOdie from './AsciiOdie'
import axios from 'axios';
import { validateEmail, validatePassword } from '../utilities/validation';
import { CloudFunctionsUrl } from '../utilities/constants.js';
import { withRouter } from 'react-router-dom';

export class CreateAccountForm extends Component {
  state = {
    email: '',
    password: '',
    error: {
      message: '',
    },
    isLoading: false,
  }

  constructor(props) {
    super(props);

    // Bind
    this.createUser = this.createUser.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    this.email.focus()
  }

  createUser() {
    const { email, password } = this.state;

    // Create user function url
    const createUserFunction = CloudFunctionsUrl + '/createUser';

    this.setState({ isLoading: true });

    if (this.validateForm()) {
      // Call create user function
      this.props.firebase.createUser(
        { email, password }, // auth user
        { email }  // user profile
      ).then(() => {

        // Redirect to dashboard OdieList
        this.props.history.push('/');

      }).catch(error => {

        this.setState({
          isLoading: false,
          error: {
            message: 'An error has occurred.'
          }
        })

        // Error handling
        if (error) {
          console.error(error);
        }

      });

    } else {

      // Invalid form
      this.setState({ isLoading: false })
    }
  }

  validateForm() {
    const { email, password, passwordConfirm } = this.state;

    if (!validateEmail(email)) {
      this.setState({
        error: {
          message: 'Your email is invalid.',
        }
      })
      return false
    } else if (!validatePassword(password)) {
      this.setState({
        error: {
          message: 'Your password is invalid.',
        }
      })
      return false
    } else if (password !== passwordConfirm) {
      this.setState({
        error: {
          message: 'Your password doesn\'t match.',
        }
      })
      return false
    } else {
      return true
    }
  }

  render() {
    return (
      <section className='grid-row justify-center'>
        <header className='grid-item item-s-12 margin-bottom-tiny grid-row no-gutter justify-center'>
          <h2 className='grid-item item-s-12 item-l-8'>Create your account</h2>
        </header>

        <form onSubmit={event => event.preventDefault()} className='grid-item item-s-12 item-m-6 item-l-4 no-gutter'>
          <div className='grid-row'>
            <div className='grid-item item-s-12 margin-bottom-small'>
              <div className='border-top'></div>
            </div>

            <div className='grid-item item-s-12 margin-bottom-tiny'>
              <input
                id='email'
                ref={ ref => this.email = ref}
                type='text'
                placeholder='email'
                className='margin-bottom-micro'
                onChange={event => this.setState({ email: event.target.value })}
              />
              <label htmlFor='email' className='font-size-small'>
                <div>We will only email you about account issues or big updates. And we will never share your email with anyone else.</div>
              </label>
            </div>
            <div className='grid-item item-s-12 margin-bottom-tiny'>
              <input
                id='password'
                ref={ ref => this.password = ref}
                type='password'
                placeholder='password'
                className='margin-bottom-micro'
                onChange={event => this.setState({ password: event.target.value })}
              />
              <label htmlFor='password' className='font-size-small'>
                <div>Minimum 8 characters.</div>
                <div>At least one uppercase letter, one lowercase letter, and one number, please.</div>
              </label>
            </div>
            <div className='grid-item item-s-12 margin-bottom-small'>
              <input
                id='password-confirm'
                ref={ ref => this.password = ref}
                type='password'
                placeholder='confirm password'
                className='margin-bottom-micro'
                onChange={event => this.setState({ passwordConfirm: event.target.value })}
              />
              <label htmlFor='password-confirm' className='font-size-small'>
                <div>Please confirm your password.</div>
              </label>
            </div>
          </div>

          <div className='grid-row margin-bottom-basic justify-end align-items-center'>
            { this.state.error.message !== ''
              ? <div className='grid-item font-size-small color-error item-s-7'>{this.state.error.message}</div>
              : null
            }
            <div className='grid-item item-s-5 text-align-center'>
              <button className='button-link-style font-size-large' onClick={() => this.createUser()}>
                Sign up
              </button>
            </div>
          </div>
        </form>

        <div className='grid-item grid-item item-s-12 item-m-6 item-l-4 align-self-start'>
          <div className='text-align-center'>
            <div className='code-holder padding-top-small padding-bottom-small'>
              <AsciiOdie />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default firebaseConnect()(withRouter(CreateAccountForm));
