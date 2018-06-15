import React, {Component} from 'react';
import axios from 'axios';
import {OdiePhpApis} from '../utilities/constants';
import moment from 'moment';

export default class TwitterWidget extends Component {
  state = {
    tweet: '',
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
      console.log(response);

      if (response.data.length) {
        this.setState({
          tweet: response.data[0],
          isLoading: false,
        });
      }
    }).catch(function (error) {
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
      const fromNow = moment(tweet.created_at).fromNow();
      const tweetUrl = tweet.entities.urls[0] || null;

      return (
        <div id="twitter-widget-holder">
          <h3 className='u-inline-block'><a href="https://twitter.com/odiedotus"><span className="font-bold">{tweet.user.name}</span> @<span id='twitter-handle'>{tweet.user.screen_name}</span></a></h3> • <span id='tweet-from-now'>{fromNow}</span>
          <div id="tweet-content" className="margin-top-micro">
            { tweetUrl !== null
              ? <a href={tweetUrl.url} className='link-underline'>{tweet.text}</a>
              : <span>{tweet.text}</span>
            }
          </div>
        </div>
      );
    }

    return null;
  }
}
