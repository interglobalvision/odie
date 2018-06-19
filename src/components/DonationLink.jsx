import React from 'react';
import { Link } from 'react-router-dom';

const Bone = () => (
  <div className='margin-top-micro text-align-right font-size-small'>
    <Link to={'/donate'} className='link-underline'>Give a dog a bone</Link> ($)
  </div>
)

export default Bone;
