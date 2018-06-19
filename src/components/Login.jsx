import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

export class LoginForm extends Component {
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

  login() {
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
      <form onSubmit={event => event.preventDefault()} className='grid-row margin-bottom-basic'>
        <div className='grid-item item-s-12 margin-bottom-micro no-gutter'>
          <input
            ref={ ref => this.email = ref}
            type='text'
            placeholder='email'
            onChange={event => this.setState({ email: event.target.value })}
          />
        </div>
        <div className='grid-item item-s-12 margin-bottom-tiny no-gutter'>
          <input
            ref={ ref => this.password = ref}
            type='password'
            placeholder='password'
            onChange={event => this.setState({ password: event.target.value })}
          />
          <Link id="link-forgot-password" className='font-size-small color-grey-mid link-underline' to={'/forgotpassword'}>Forgot?</Link>
        </div>
        <div className='grid-item item-s-4 offset-s-8 text-align-center no-gutter'>
          <button onClick={() => this.login()} className='font-size-large button-link-style'>
            Login
          </button>
        </div>
        <div className='grid-item item-s-12 no-gutter'>
          <span>{this.state.error.message}</span>
          <span>{this.state.loading}</span>
        </div>
      </form>
    )
  }
}

export default firebaseConnect()(LoginForm);
