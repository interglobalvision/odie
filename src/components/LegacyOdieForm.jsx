import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { ChromePicker } from 'react-color';

import { escapeHtml, unescapeHtml } from '../utilities/validation';

import AsciiOdie from './AsciiOdie'
import DonationLink from './DonationLink'

class LegacyOdieForm extends Component {

  state =  {
    isLoading: false,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { odie } = this.props;

    return (
      <section className='grid-row'>
        <header className='grid-item item-s-12 margin-bottom-tiny'>
          <h2>Legacy</h2>
        </header>

        <form className='grid-item item-s-12 item-xl-9 no-gutter' onSubmit={event => event.preventDefault()}>
          <div className='grid-row'>
            <div className='grid-item item-s-12 margin-bottom-small'>
              <div className='border-top'></div>
            </div>

            <div id="form-odie-subdomain" className='grid-item item-s-12 item-m-4 item-xl-9-3 margin-bottom-small'>
              <input
                id='subdomain'
                focus='true'
                name='subdomain'
                type='text'
                placeholder='subdomain'
                disabled={this.state.isLoading}
                value={this.props.odie.subdomain}
                onChange={ event => this.props.setSubdomain(event.target.value)}
                ref={ ref => this.subdomain = ref}
                className={'margin-bottom-micro input-valid-' + this.props.odie.subdomainValid}
              />
              <label htmlFor='subdomain' className='font-size-small u-inline-block'>
                <div>The web address for your Odie</div>
                <div>Allowed characters: A-Z, 0-9, and - (hyphen)</div>
              </label>
            </div>

            <div id='form-odie-doc-url' className='grid-item item-s-12 item-m-7 item-xl-9-5 margin-bottom-small'>
              <input
                id='docUrl'
                name='docUrl'
                type='text'
                placeholder='google doc url'
                disabled={this.state.isLoading}
                value={this.state.docUrl}
                onChange={ event => this.props.setDocUrl(event.target.value)}
                className={'margin-bottom-micro input-valid-' + this.props.odie.docUrlValid}
              />
              <label htmlFor='docUrl' className='font-size-small u-inline-block'>
                <div className='margin-bottom-micro'>This is where we will pull the Odie content from</div>
                <ol>To retrieve this URL:
                  <li>Open your google doc</li>
                  <li>Click File > Publish to the web…</li>
                  <li>Click Publish in the following dialog</li>
                  <li>Copy the Link URL that is displayed</li>
                  <li>Come back here and paste it!</li>
                </ol>
              </label>
            </div>
          </div>

          <div className='grid-row margin-bottom-basic justify-end align-items-center'>
            { !this.props.odie.docUrlAndSubdomainMatch ? <div className='grid-item font-size-small color-error'>Your subdomain and google doc url doesn't match any legacy odies.</div> : null }
          </div>


          { this.props.odie.verificationHash ? <div className='grid-row margin-bottom-basic justify-end align-items-center'><div className='grid-item item-s-12 item-m-6 margin-bottom-micro'>copy/paste this code into your google doc and <i>verify</i></div><div className='grid-item item-s-12 item-m-6 margin-bottom-micro'><input type="text" disabled value={this.props.odie.verificationHash} /></div></div> : null }
          { this.props.odie.verificationHash ? <div className='grid-row margin-bottom-basic justify-end align-items-center'>
            <div className='grid-item'>
              <button className='button-link-style font-size-large' onClick={ event => this.props.verifyLegacyOdie() }>Verify</button>
            </div>
          </div> : null }

        </form>

        <div className='grid-item item-s-12 item-xl-3 align-self-start'>
          <div className='hide-mobile hide-portrait hide-landscape text-align-center'>
            <div className='code-holder padding-top-small padding-bottom-small'>
              <AsciiOdie />
            </div>
          </div>
          <DonationLink />
        </div>
      </section>
    );
  }
};

export default LegacyOdieForm;
