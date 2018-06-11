import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

class Nav extends Component {
  logOut() {
    this.props.firebase.logout();
    this.props.history.push('/');
  }

  render() {
    return (
      <nav>
        <div className='grid-row justify-between'>
          <div className='grid-item item-s-3'>
            <h1><Link to='/'>Odie</Link></h1>
          </div>
          <div className='grid-item item-flex'>
            <div className='grid-row'>
              <div className='grid-item'>
                <Link to='/'>Your Odies</Link>
              </div>
              <div className='grid-item'>
                <Link to='/create'>Create</Link>
              </div>
              <div className='grid-item'>
                <Link to='/account'>Account</Link>
              </div>
              <div className='grid-item item-flex'>
                <button onClick={this.logOut.bind(this)}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default withRouter(firebaseConnect()(Nav));
