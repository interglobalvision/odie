import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isLoaded, isEmpty, firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';
import { CloudFunctionsUrl } from '../utilities/constants.js';
import { setIsLoading, setIsLoaded } from '../redux/actions/loadingStatusActions'

const mapDispatchToProps = dispatch =>  ({
  setIsLoaded: () => dispatch(setIsLoaded()),
  setIsLoading: () => dispatch(setIsLoading()),
});

@firebaseConnect()
@withRouter
@connect(null, mapDispatchToProps)

class OdieView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: null,
    }

    // Bind
    this.handleResponse = this.handleResponse.bind(this);
  }

  componentWillMount() {
    this.requestContent();
  }

  requestContent() {
    const _this = this;
    const odie = this.props.odie[Object.keys(this.props.odie)[0]]

    this.setState({ isLoading: true })
    this.props.setIsLoading();

    axios.get(odie.docUrl, {
      mode: 'no-cors',
    }).then(this.handleResponse).catch(function (error) {
      console.error(error);
    });
  }

  handleResponse(response) {
    const doc = new DOMParser().parseFromString(response.data, 'text/html');
    const contents = doc.getElementById('contents');

    this.setState({
      contents: contents.innerHTML
    });

    this.setState({ isLoading: false })
    this.props.setIsLoaded();

    this.updateViewCount()
  }

  updateViewCount() {
    const key = Object.keys(this.props.odie)[0];

    // Increment views function url
    const incrementViewsFunction = CloudFunctionsUrl + '/incrementViews';

    // Call create user function
    axios.get(incrementViewsFunction, {
      params: {
        odie: key,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'no-cors'
    }).catch(error => {
      // Error handling
      if (error.response) {
        console.log(error.response.data);
      }
    });
  }

  render() {
    if (this.state.contents == null) {
      return (
        <div>
          404
        </div>
      )
    }
    
    const odie = this.props.odie[Object.keys(this.props.odie)[0]]
    const meta = {
      title: odie.title,
      description: odie.description,
      meta: {
        charset: 'utf-8',
        name: {
          'og:title': odie.title,
          'og:description': odie.description,
        }
      }
    };

    return (
      <DocumentMeta {...meta}>
        <div className="container padding-top-basic padding-bottom-basic" dangerouslySetInnerHTML={{__html: this.state.contents}} />
      </DocumentMeta>
    )

  }
};

export default OdieView;
