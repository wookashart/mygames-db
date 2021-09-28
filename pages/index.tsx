import React, { Component } from 'react';

// === Components === //
import Page from '../src/components/layout/Page';

class Index extends Component {
  render() {
    return (
      <Page seo={{ title: 'Strona główna', description: '' }}>
        <div>Homepage</div>
      </Page>
    );
  }
}

export default Index;
