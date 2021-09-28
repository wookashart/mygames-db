import React from 'react';

// === Types === //
import { SeoData } from '../../types/layout';

// === Components === //
import Helmet from 'react-helmet';

interface SEOProps {
  seo: SeoData;
}

const SEO = ({ seo }: SEOProps) => {
  return (
    <Helmet>
      <title>{seo.title} | MyGames DB</title>
      <meta name="description" content={seo.description} />
    </Helmet>
  );
};

export default SEO;
