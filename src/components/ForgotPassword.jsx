import React, { Component } from 'react';
import { getFirebase } from 'react-redux-firebase';
import { Link, withRouter } from 'react-router-dom';
import AsciiOdie from './AsciiOdie'
import { validateEmail } from '../utilities/validation';

export class ForgotPasswordForm extends Component {
  state = {
    email: '',
    error: {
      message: '',
    },
    isLoading: false,
  }

  constructor(props) {
    super(props);

    // Bind
    this.resetPassword = this.resetPassword.bind(this);
  }

  componentDidMount() {
    this.email.focus()
  }

  resetPassword() {
    const { email } = this.state;
    const firebase = getFirebase();

    this.setState({ isLoading: true });

    if (validateEmail(email)) {
      // Call create user function
      firebase.auth().sendPasswordResetEmail(email).then(() => {

        // Redirect to dashboard OdieList
        window.alert('A reset link has been emailed to you.')
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
      this.setState({
        isLoading: false,
        error: {
          message: 'Your email is invalid.',
        }
      })
    }
  }

  render() {
    return (
      <section className='grid-row justify-center'>
        <header className='grid-item item-s-12 margin-bottom-tiny grid-row no-gutter justify-center'>
          <h2 className='grid-item item-s-12 item-l-8'>Reset Password</h2>
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
                <div>Enter the email address associated with your account.</div>
              </label>
            </div>
          </div>

          <div className='grid-row margin-bottom-basic justify-end align-items-center'>
            { this.state.error.message !== ''
              ? <div className='grid-item font-size-small color-error item-s-7'>{this.state.error.message}</div>
              : null
            }
            <div className='grid-item item-s-5 text-align-center'>
              <button
                className='button-link-style font-size-large'
                onClick={() => this.resetPassword()}
                disabled={this.state.isLoading}
              >
                Reset
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

export default withRouter(ForgotPasswordForm);
