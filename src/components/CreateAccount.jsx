import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import AsciiOdie from './AsciiOdie'

class CreateAccount extends Component {
  state = {
    email: '',
    password: '',
    error: {
      message: '',
    },
    isLoading: false,
  }

  componentDidMount() {
    this.email.focus()
  }

  signup() {
    const { email, password } = this.state;

    this.setState({ isLoading: true });

    this.props.firebase
      .login({email, password})
      .then(() => {
        this.setState({ isLoading: false })
        // this is where we can redirect to another route
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        this.setState({ error });
        console.log('there was an error', error)
      })

  }

  render() {
    return (
      <section className='grid-row justify-center'>
        <header className='grid-item item-s-12 margin-bottom-tiny grid-row no-gutter justify-center'>
          <h2 className='grid-item item-s-6'>Create your account</h2>
        </header>

        <form onSubmit={event => event.preventDefault()} className='grid-item item-s-12 item-m-6 item-l-4 item-xl-3'>
          <div className='grid-row'>
            <div className='grid-item item-s-12 margin-bottom-small no-gutter'>
              <div className='border-top'></div>
            </div>

            <div className='grid-item item-s-12 margin-bottom-small no-gutter'>
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
            <div className='grid-item item-s-12 margin-bottom-small no-gutter'>
              <input
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
            <div className='grid-item item-s-4 offset-s-8 text-align-center no-gutter'>
              <button onClick={() => this.signup()} className='font-size-large button-link-style'>
                Signup
              </button>
            </div>
            <div className='grid-item item-s-12 no-gutter'>
              <p>{this.state.error.message}</p>
              <p>{this.state.loading}</p>
            </div>
          </div>
        </form>

        <div className='grid-item grid-item item-s-12 item-m-6 item-l-4 item-xl-3 align-self-start'>
          <div className='hide-mobile hide-portrait hide-landscape text-align-center'>
            <div className='code-holder padding-top-small padding-bottom-small'>
              <AsciiOdie />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default firebaseConnect()(CreateAccount);
