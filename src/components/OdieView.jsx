import React, { Component } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';

class OdieView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: '',
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
  }

  render() {
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
