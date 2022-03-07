import React, { Component } from 'react';

// === Components === //
import { Box } from '@mui/system';
import Breadcrumbs from '../../common/Breadcrumbs';
import Page from '../../layout/Page';

// === Types === //
import { UserData } from '../../../types/users';

interface UserDetailViewProps {
  userId: number;
}

class UserDetailView extends Component<UserDetailViewProps> {
  state = {
    user: null as UserData | null,
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.getUserData();
    }, 200);
  }

  getUserData = () => {
    const id = this.props.userId || 0;

    this.setState({ loading: true }, () => {
      fetch(`/api/user/${id}`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((json) => {
          if (json && !json.error) {
            this.setState({
              user: json.user,
            });
          }
          this.setState({ loading: false });
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.error(error);
        });
    });
  };

  render() {
    const { user, loading } = this.state;

    return (
      <Page
        seo={{
          title: `Użytkownik ${!loading && user ? user.name : ''}`,
          description: '',
        }}
        pageType="userLibrary"
      >
        <Box>
          <Breadcrumbs
            options={[
              { current: false, label: 'Strona główna', href: '/' },
              {
                current: true,
                label: `${user?.name || ''}`,
                href: `/user/${user?.id || 0}`,
              },
            ]}
          />
        </Box>
      </Page>
    );
  }
}

export default UserDetailView;
