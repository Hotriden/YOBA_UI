import React from 'react';
import MetaTags from 'react-meta-tags';

const MetaTagsForHttp = () => {
    return (
        <div class="wrapper">
          <MetaTags>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
          </MetaTags>
        </div>
      )
  }

export default MetaTagsForHttp;