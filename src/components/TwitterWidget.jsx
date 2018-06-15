import React from 'react';
import axios from 'axios';

const TwitterWidget = () => {
  axios.get('http://interglobal.vision/odie-php-apis/twitter.php', {
    mode: 'no-cors',
  }).then((response) => {
    console.log(response);
  }).catch(function (error) {
    console.error(error);
  });

  return (
    <a id="twitter-widget-holder" href="https://twitter.com/odiedotus">
      <h3 className='u-inline-block'><span className="font-bold">Odie</span> @<span id='twitter-handle'>odiedotus</span></h3> • <span id='tweet-from-now'>1d</span>
      <div id="tweet-content" className="margin-top-micro">
        Some recent tweet
      </div>
    </a>
  );
}

export default TwitterWidget;
