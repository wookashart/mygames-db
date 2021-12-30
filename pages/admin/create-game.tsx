import React, { Component } from 'react';

// === Components === //
import { colors, Container, Paper } from '@mui/material';
import Page from '../../src/components/layout/Page';
import Breadcrumbs from '../../src/components/common/Breadcrumbs';
import PageHeader from '../../src/components/common/PageHeader';
import CreateEditGameForm from '../../src/components/pages/admin-create-game/CreateEditGameForm';

class CreateGame extends Component {
  state = {
    user: null,
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
            this.setState({ user: json.user });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  render() {
    return (
      <Page seo={{ title: 'Dodaj grę', description: '' }} pageType="admin">
        <>
          <Breadcrumbs
            options={[
              { current: false, label: 'Strona główna', href: '/' },
              { current: true, label: 'Dodaj grę', href: '/admin/create-game' },
            ]}
          />
          <Container maxWidth="xl">
            <PageHeader title="Dodaj grę" />

            <Paper elevation={6} sx={{ backgroundColor: colors.grey[800], marginBottom: 4 }}>
              <CreateEditGameForm editItem={null} user={this.state.user} />
            </Paper>
          </Container>
        </>
      </Page>
    );
  }
}

export default CreateGame;
