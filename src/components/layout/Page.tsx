import React, { Component } from 'react';

// === Types === //
import { SeoData } from '../../types/layout';

// === Components === //
import SEO from './SEO';
import Header from './Header';

interface PageProps {
  children: React.ReactChild;
  seo: SeoData;
}

class Page extends Component<PageProps> {
  state = {
    loading: false,
    user: null,
  };

  render() {
    return (
      <>
        <SEO seo={this.props.seo} />

        <Header />
        {this.props.children}
      </>
    );
  }
}

export default Page;
