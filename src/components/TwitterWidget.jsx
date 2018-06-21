import React, {Component} from 'react';
import axios from 'axios';
import {OdiePhpApis} from '../utilities/constants';
import moment from 'moment-twitter';

export default class TwitterWidget extends Component {
  state = {
    tweet: null,
    error: {
      message: ''
    },
    isLoading: false
  }

  componentWillMount() {
    this.setState({ isLoading: true });

    axios.get(OdiePhpApis + '/twitter.php', {
      mode: 'no-cors',
    }).then((response) => {
      if (response.data.length) {
        this.setState({
          tweet: response.data[0],
          isLoading: false,
        });
      }
    }).catch((error) => {
      console.error(error);
      this.setState({
        error: error,
        isLoading: false,
      });
    });
  }

  render() {
    const { isLoading, tweet } = this.state;

    if (!isLoading && tweet !== null) {
      const fromNow = moment(tweet.created_at).twitter();
      const tweetMedia = tweet.entities.media || [];

      return (
        <a id="twitter-widget-holder" href="https://twitter.com/odiedotus">
          <h3 className='u-inline-block'><span className="font-bold">{tweet.user.name}</span> @<span id='twitter-handle'>{tweet.user.screen_name}</span></h3> • <span id='tweet-from-now'>{fromNow}</span>
          <div id="tweet-content" className="margin-top-micro">
            <div id='tweet-text'>
              <span>{tweet.text}</span>
            </div>
            { tweetMedia.length
              ? <div id='tweet-media' className='margin-top-tiny'>
                  <a href={tweetMedia[0].media_url}>
                    <img src={tweetMedia[0].media_url} alt={tweet.text} className='twitter-media' />
                  </a>
                </div>
              : null
            }
          </div>
        </a>
      );
    }

    return null;
  }
}
