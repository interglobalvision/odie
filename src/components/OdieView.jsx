import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isLoaded, isEmpty, firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';
import { CloudFunctionsUrl } from '../utilities/constants.js';
import { setIsLoading, setIsLoaded } from '../redux/actions/loadingStatusActions'
import { unescapeHtml } from '../utilities/validation';

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
      currentOdie: null,
      contents: null,
      error: false,
    }

    // Bind
    this.handleResponse = this.handleResponse.bind(this);
  }

  componentWillMount() {
    const parentOdie = this.props.odie[Object.keys(this.props.odie)[0]];

    // First set the parent as the current odie
    this.currentOdie = parentOdie;

    // Check if the URL has a path and that the parent odie has paths
    if (this.props.location.pathname !== undefined && parentOdie.paths !== undefined) {

      // Remove the '/' from the path
      const path = this.props.location.pathname.substring(1);

      if (parentOdie.paths[path] !== undefined) { // the path exists in the parent

        // Set path as the current odie
        this.currentOdie = parentOdie.paths[path];
      }

    }

    this.requestContent();
  }

  requestContent() {
    const _this = this;
    const odie = this.currentOdie;

    this.setState({ isLoading: true })
    this.props.setIsLoading();

    axios.get(odie.docUrl, {
      mode: 'no-cors',
    }).then(this.handleResponse).catch(function (error) {
      console.error(error);
      this.props.setIsLoaded();

      this.setState({ error: true })
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
    if (this.state.error) {
      return 'Error';
    }

    const odie = this.currentOdie;
    const title = unescapeHtml(odie.title);
    const description = unescapeHtml(odie.description)
    const meta = {
      title: title,
      description: description,
      meta: {
        charset: 'utf-8',
        name: {
          'og:title': title,
          'og:description': description,
        }
      }
    };

    document.documentElement.style.backgroundColor = odie.bgColor;

    return (
      <DocumentMeta {...meta}>
        <div id='viewer' className='padding-top-basic padding-bottom-basic' dangerouslySetInnerHTML={{__html: this.state.contents}} />
      </DocumentMeta>
    )

  }
};

export default OdieView;
