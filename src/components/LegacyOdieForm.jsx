import React, { Component } from 'react';

import AsciiOdie from './AsciiOdie'
import DonationLink from './DonationLink'

class LegacyOdieForm extends Component {
  componentDidMount() {
    this.subdomain.focus();
  }

  render() {
    const { legacyOdie } = this.props;

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
                disabled={legacyOdie.loading}
                value={legacyOdie.subdomain}
                onChange={ event => this.props.setSubdomain(event.target.value)}
                ref={ ref => this.subdomain = ref}
                className={'margin-bottom-micro input-valid-' + legacyOdie.subdomainValid}
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
                disabled={legacyOdie.loading}
                value={legacyOdie.docUrl}
                onChange={ event => this.props.setDocUrl(event.target.value)}
                className={'margin-bottom-micro input-valid-' + legacyOdie.docUrlValid}
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
            { legacyOdie.error ? <div className='grid-item font-size-small color-error'>{legacyOdie.error}</div> : null }
          </div>


          { legacyOdie.verificationHash && ! legacyOdie.verified ?
          <div className='grid-row margin-bottom-basic justify-end align-items-center'>
            <div className='grid-item item-s-12 item-m-6 margin-bottom-micro'>
              <span>copy/paste this code into your google doc and <i>verify</i></span>
            </div>
            <div className='grid-item item-s-12 item-m-6 margin-bottom-micro'>
              <input type="text" disabled value={legacyOdie.verificationHash} />
              <span className="font-size-small">google docs can take up to 5 minutes to update</span>
            </div>
          </div> : null }

          { legacyOdie.verificationHash ?
          <div className='grid-row margin-bottom-basic justify-end align-items-center'>
            <div className='grid-item'>
              <button className='button-link-style font-size-large' onClick={ () => this.props.verifyLegacyOdie() }>Verify</button>
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
