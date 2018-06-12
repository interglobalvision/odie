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
      <nav className='grid-item item-flex grid-row'>
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
          <button className='button-link-style' onClick={this.logOut.bind(this)}>Logout</button>
        </div>
      </nav>
    );
  }
};

export default withRouter(firebaseConnect()(DashboardNav));
