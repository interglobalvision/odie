import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

import { setIsLoading, setIsLoaded } from '../redux/actions/loadingStatusActions'

const mapDispatchToProps = dispatch =>  ({
  setIsLoaded: () => dispatch(setIsLoaded()),
  setIsLoading: () => dispatch(setIsLoading()),
});

@firebaseConnect()
@withRouter
@connect(null, mapDispatchToProps)

class OdieForm extends Component {

  state = {
    title: '',
    subdomain: '',
    docUrl: '',
    description: '',
    error: {
      message: '',
    },
    isLoading: false,
  }

  constructor(props) {
    super(props);

    // If component recieves obra as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.odie };

    // Bind
  }

  componentWillMount() {

  }

  addOdie() {
    const { title, subdomain, docUrl, description } = this.state;

    this.setState({ isLoading: true })
    this.props.setIsLoading();

    this.props.firebase
      .push('odies', {
        title,
        subdomain,
        docUrl,
        description,
        uid: this.props.currentUID,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.setIsLoaded();
        this.props.history.push('/odies');
      })

  }

  updateOdie() {
    const { title, subdomain, docUrl, description } = this.state;

    this.setState({ isLoading: true })
    this.props.setIsLoading();

    this.props.firebase
      .update(`odies/${this.props.id}`, {
        title,
        subdomain,
        docUrl,
        description,
        uid: this.props.currentUID,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.setIsLoaded();
      })

  }

  render() {
    console.log(this.props);
    return (
      <div>
        <header className='grid-row margin-bottom-basic'>
          <div className='grid-item'>
            <h1 className='font-size-large'>Edit Odie</h1>
          </div>
        </header>

        <form onSubmit={event => event.preventDefault()}>

          <div className='grid-row'>
            <div className='grid-item item-s-12 margin-bottom-basic'>
              <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='title'>Title</label></h4>
              <input
                id='title'
                name='title'
                type='text'
                disabled={this.state.isLoading}
                value={this.state.title}
                onChange={ event => this.setState({ title: event.target.value })}
              />
            </div>

            <div className='grid-item item-s-12 margin-bottom-basic'>
              <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='subdomain'>Subdomain</label></h4>
              <input
                id='subdomain'
                name='subdomain'
                type='text'
                disabled={this.state.isLoading}
                value={this.state.subdomain}
                onChange={ event => this.setState({ subdomain: event.target.value })}
              />
            </div>

            <div className='grid-item item-s-12 margin-bottom-basic'>
              <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='docUrl'>google doc URL</label></h4>
              <input
                id='docUrl'
                name='docUrl'
                type='text'
                disabled={this.state.isLoading}
                value={this.state.docUrl}
                onChange={ event => this.setState({ docUrl: event.target.value })}
              />
            </div>

            <div className='grid-item item-s-12 margin-bottom-basic'>
              <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='description'>Description</label></h4>
              <input
                id='description'
                name='description'
                type='text'
                disabled={this.state.isLoading}
                value={this.state.description}
                onChange={ event => this.setState({ description: event.target.value })}
              />
            </div>
          </div>

          <div className='grid-row margin-bottom-basic justify-end'>
            <div className='grid-item'>
              <button className='button' onClick={() => this.props.id ? this.updateOdie() : this.addOdie()}>
                { this.props.id ? 'Save' : 'Create'}
              </button>
            </div>
          </div>

        </form>
      </div>
    );
  }
};

export default OdieForm;
