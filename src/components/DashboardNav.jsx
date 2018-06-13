import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

class DashboardNav extends Component {
  logOut() {
    this.props.firebase.logout();
    this.props.history.push('/');
  }

  render() {
    return (
      <nav className='grid-item item-s-12 item-m-6 item-l-5 item-xl-4 padding-top-small justify-between no-gutter grid-row'>
        <div className='grid-item'>
          <Link to='/' className='link-underline'>Your Odies</Link>
        </div>
        <div className='grid-item'>
          <Link to='/create' className='link-underline'>Create</Link>
        </div>
        <div className='grid-item'>
          <Link to='/account' className='link-underline'>Account</Link>
        </div>
        <div className='grid-item'>
          <button className='button-link-style' onClick={this.logOut.bind(this)}>Logout</button>
        </div>
      </nav>
    );
  }
};

export default withRouter(firebaseConnect()(DashboardNav));
