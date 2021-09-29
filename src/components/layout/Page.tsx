import React, { Component } from 'react';

// === Components === //
import SEO from './SEO';
import Header from './Header';

// === Styles === //
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { colors } from '@mui/material';

// === Types === //
import { SeoData } from '../../types/layout';

interface PageProps {
  children: React.ReactChild;
  seo: SeoData;
  pageType: string;
}

class Page extends Component<PageProps> {
  state = {
    loading: false,
    user: null,
  };

  render() {
    const theme = createTheme({
      typography: {
        h1: {
          fontSize: '3rem',
        },
      },
      palette: {
        type: 'dark',
      },
    });

    return (
      <>
        <SEO seo={this.props.seo} />

        <ThemeProvider theme={theme}>
          <Header pageType={this.props.pageType} />
          {this.props.children}
        </ThemeProvider>
        <style jsx global>{`
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
            background-color: ${colors.grey[900]};
          }
        `}</style>
      </>
    );
  }
}

export default Page;
