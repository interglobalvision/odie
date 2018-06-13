import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { ChromePicker } from 'react-color';

import { setIsLoading, setIsLoaded } from '../redux/actions/loadingStatusActions'

import AsciiOdie from './AsciiOdie'
import DonationLink from './DonationLink'

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
    subdomainValid: true,
    docUrl: '',
    docUrlValid: true,
    description: '',
    displayColorPicker: false,
    bgColor: '',
    isLoading: false,
    isValid: true,
  }

  constructor(props) {
    super(props);

    // If component recieves obra as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.odie };

    // Bind
    this.handleSubdomainChange = this.handleSubdomainChange.bind(this);
    this.validateSubdomain = this.validateSubdomain.bind(this);

    this.handleDocUrlChange = this.handleDocUrlChange.bind(this);
    this.validateDocUrl = this.validateDocUrl.bind(this);

    this.escapeHtml = this.escapeHtml.bind(this);

    this.handleColorClick = this.handleColorClick.bind(this);
    this.handleColorClose = this.handleColorClose.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  componentWillMount() {
    const escapedTitle = this.state.title;
    const escapedDescription = this.state.description;

    this.setState({
      title: this.unescapeHtml(escapedTitle),
      description: this.unescapeHtml(escapedDescription),
    })
  }

  addOdie() {
    const { subdomain, docUrl,  bgColor, subdomainValid, docUrlValid } = this.state;
    let { title, description } = this.state;

    this.setState({ isLoading: true })
    this.props.setIsLoading();

    title = this.escapeHtml(title);
    description = this.escapeHtml(description);

    this.props.firebase
      .push('odies', {
        title,
        subdomain,
        docUrl,
        description,
        bgColor,
        views: 0,
        uid: this.props.currentUID,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.setIsLoaded();
        this.props.history.push('/');
      })

  }

  updateOdie() {
    const { subdomain, docUrl,  bgColor, subdomainValid, docUrlValid } = this.state;
    let { title, description } = this.state;

    this.setState({ isLoading: true })
    this.props.setIsLoading();

    title = this.escapeHtml(title);
    description = this.escapeHtml(description);

    if (subdomainValid && docUrlValid) {
      this.setState({ isValid: true });

      this.props.firebase
        .update(`odies/${this.props.id}`, {
          title,
          subdomain,
          docUrl,
          description,
          bgColor,
          uid: this.props.currentUID,
        })
        .then(() => {
          this.setState({ isLoading: false })
          this.props.setIsLoaded();
          this.props.history.push('/');
        })
    } else {
      this.setState({
        isLoading: false,
        isValid: false,
      })
      this.props.setIsLoaded();
    }
  }

  handleSubdomainChange(event) {
    this.setState({
      subdomain: event.target.value,
      subdomainValid: this.validateSubdomain(event.target.value)
    })
  }

  validateSubdomain(subdomain) {
    const specialChars = /[ !@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/;

    // true if no special characters present in string
    const isValid = !specialChars.test(subdomain);

    return isValid;
  }

  handleDocUrlChange(event) {
    this.setState({
      docUrl: event.target.value,
      docUrlValid: this.validateDocUrl(event.target.value)
    })
  }

  validateDocUrl(docUrl) {
    // create <a> element and set href attr to docUrl
    const parser = document.createElement('a');
    parser.href = docUrl;

    // split path into parts
    const pathArray = parser.pathname.split("/");

    const isValid =
      parser.protocol === 'https:' &&
      parser.hostname === 'docs.google.com' &&
      pathArray[1] === 'document' &&
      pathArray[5] === 'pub';

    return isValid;
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  unescapeHtml(safe) {
    return safe
      .replace('&amp;', '&')
      .replace('&lt;', '<')
      .replace('&gt;', '>')
      .replace('&quot;', '"')
      .replace('&#039;', '\'');
  }

  handleColorClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleColorClose() {
    this.setState({ displayColorPicker: false })
  }

  handleColorChange(color) {
    this.setState({ bgColor: color.hex })
  }

  render() {
    const headerText = this.props.match.path === '/create' ? 'Create a new Odie' : 'Edit your Odie';

    return (
      <section className='grid-row'>
        <header className='grid-item item-s-12 margin-bottom-tiny'>
          <h2>{headerText}</h2>
        </header>

        <form className='grid-item item-s-12 item-xl-9 no-gutter' onSubmit={event => event.preventDefault()}>
          <div className='grid-row'>
            <div className='grid-item item-s-12 margin-bottom-small'>
              <div className='border-top'></div>
            </div>

            <div id="form-odie-subdomain" className='grid-item item-s-12 item-m-4 item-xl-9-3 margin-bottom-small'>
              <input
                id='subdomain'
                name='subdomain'
                type='text'
                placeholder='subdomain'
                disabled={this.state.isLoading}
                value={this.state.subdomain}
                onChange={ this.handleSubdomainChange }
                className={'margin-bottom-micro input-valid-' + this.state.subdomainValid}
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
                onChange={ this.handleDocUrlChange }
                className={'margin-bottom-micro input-valid-' + this.state.docUrlValid}
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

            <div id="form-odie-title" className='grid-item item-s-12 item-m-5 item-l-6 item-xl-9-4 margin-bottom-small'>
              <input
                id='title'
                name='title'
                type='text'
                placeholder='title'
                disabled={this.state.isLoading}
                value={this.state.title}
                onChange={ event => this.setState({ title: event.target.value })}
                className='margin-bottom-micro'
              />
              <label htmlFor='title' className='font-size-small u-inline-block'>
                <div>Give it a name!</div>
                <div>This will appear in the browser tab and on social media feeds</div>
              </label>
            </div>

            <div id="form-odie-bg-color" className='grid-item item-s-12 item-m-3 item-l-2 item-xl-9-2 margin-bottom-small'>
              <input
                id='bg-color'
                name='bg-color'
                placeholder='#FFFFFF'
                disabled={this.state.isLoading}
                value={this.state.bgColor}
                readOnly={true}
                className='margin-bottom-micro font-uppercase hide-input-caret'
                onClick={ this.handleColorClick }
              />
              <div
                className="color-input-swatch"
                style={{backgroundColor: this.state.bgColor}}
                onClick={ this.handleColorClick }
              ></div>
              <label className='font-size-small u-inline-block' onClick={ this.handleColorClick }>
                <div>Choose a background color</div>
              </label>
              { this.state.displayColorPicker ?
                <div className='colorPickerHolder'>
                  <div className='colorPickerCover' onClick={ this.handleColorClose }/>
                  <ChromePicker color={ this.state.bgColor } disableAlpha={ true } onChange={ this.handleColorChange } />
                </div>
              : null }
            </div>

            <div id="form-odie-description" className='grid-item item-s-12 item-m-5 item-xl-9-4 margin-bottom-small'>
              <textarea
                id='description'
                name='description'
                placeholder='brief description'
                disabled={this.state.isLoading}
                value={this.state.description}
                onChange={ event => this.setState({ description: event.target.value })}
                className='margin-bottom-micro'
                rows='3'
              />
              <label htmlFor='description' className='font-size-small u-inline-block'>
                <div>1 or 2 sentences describing the content of this Odie</div>
                <div>This will appear on social media feeds</div>
              </label>
            </div>
          </div>

          <div className='grid-row margin-bottom-basic justify-end align-items-center'>
            { !this.state.isValid ? <div className='grid-item font-size-small color-error'>Some values are invalid.</div> : null }
            <div className='grid-item'>
              <button className='button-link-style font-size-large' onClick={() => this.props.id ? this.updateOdie() : this.addOdie()}>
                { this.props.id ? 'Save' : 'Create'}
              </button>
            </div>

          </div>

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

export default OdieForm;
