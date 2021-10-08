import React, { Component } from 'react';

// === Components === //
import SEO from './SEO';
import Header from './Header';
import Login from './Login';
import ErrorPage from 'next/error';

// === Styles === //
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { colors } from '@mui/material';

// === Types === //
import { SeoData } from '../../types/layout';
import { UserData } from '../../types/users';

interface PageProps {
  children: React.ReactChild;
  seo: SeoData;
  pageType: string;
}

class Page extends Component<PageProps> {
  state = {
    user: null as UserData | null,
    userLoading: true,
    loginOpened: false,
  };

  componentDidMount() {
    this.handleCheckUserSession();
  }

  handleCheckUserSession = () => {
    this.setState({ userLoading: true }, () => {
      fetch(`/api/me`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((json) => {
          if (json && !json.error && json.user) {
            this.setUserData(json.user);
          }
          this.toggleUserLoading(false);
        })
        .catch((error) => {
          this.toggleUserLoading(false);
          console.error(error);
        });
    });
  };

  handleLogout = () => {
    this.setState({ userLoading: true }, () => {
      fetch(`/api/logout`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then(() => {
          this.toggleUserLoading(false);
          this.setUserData(null);
        })
        .catch((error) => {
          this.toggleUserLoading(false);
          console.error(error);
        });
    });
  };

  toggleUserLoading = (value: boolean) => this.setState({ userLoading: value });
  setUserData = (value: UserData | null) => this.setState({ user: value });

  render() {
    const pagesBlockedForLoggedUser: string[] = ['register'];
    const theme = createTheme({
      typography: {
        h1: {
          fontSize: '1rem',
        },
      },
      palette: {
        type: 'dark',
        primary: colors.blue,
        secondary: colors.indigo,
      },
    });

    return (
      <>
        {this.state.userLoading ? (
          <ThemeProvider theme={theme}>
            <Header
              pageType="placeholder"
              userLoading={this.state.userLoading}
              user={this.state.user}
              handleOpenLoginModal={() => this.setState({ loginOpened: true })}
              handleLogout={this.handleLogout}
            />
          </ThemeProvider>
        ) : (
          <>
            {(this.state.user &&
              pagesBlockedForLoggedUser.find((item) => item === this.props.pageType)) ||
            (this.state.user && this.state.user.type === 0 && this.props.pageType === 'admin') ||
            (!this.state.user && this.props.pageType === 'admin') ? (
              <ErrorPage statusCode={404} />
            ) : (
              <>
                <SEO seo={this.props.seo} />
                <ThemeProvider theme={theme}>
                  <Header
                    pageType={this.props.pageType}
                    userLoading={this.state.userLoading}
                    user={this.state.user}
                    handleOpenLoginModal={() => this.setState({ loginOpened: true })}
                    handleLogout={this.handleLogout}
                  />
                  {this.props.children}

                  <Login
                    pageType={this.props.pageType}
                    open={this.state.loginOpened}
                    handleClose={() => this.setState({ loginOpened: false })}
                    handleSetUser={this.setUserData}
                    toggleUserLoading={this.toggleUserLoading}
                  />
                </ThemeProvider>
              </>
            )}
          </>
        )}

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
