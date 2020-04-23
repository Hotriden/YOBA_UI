import React from 'react';
import MetaTags from 'react-meta-tags';

const MetaTags = () => {
    return (
        <div class="wrapper">
          <MetaTags>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
          </MetaTags>
        </div>
      )
  }

export default MetaTags;