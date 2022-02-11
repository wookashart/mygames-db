import React, { Component } from 'react';

// === Components === //
import { Container } from '@mui/material';
import Page from '../../src/components/layout/Page';
import Breadcrumbs from '../../src/components/common/Breadcrumbs';
import PageHeader from '../../src/components/common/PageHeader';
import LastAddedGames from '../../src/components/pages/stats/LastAddedGames';
import LastAddedDLC from '../../src/components/pages/stats/LastAddedDLC';

class Stats extends Component {
  state = {
    loading: true,
    lastAddedGames: [],
    lastAddedDLC: [],
  };

  componentDidMount() {
    this.getStats();
  }

  getStats = () => {
    this.setState({ loading: true }, () => {
      fetch(`/api/admin-stats`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json && !json.error) {
            this.setState({
              lastAddedGames: json.lastAddedGames,
              lastAddedDLC: json.lastAddedDLC,
            });
          }
        });
    });
  };

  render() {
    return (
      <Page seo={{ title: 'Statystyki', description: '' }} pageType="admin">
        <>
          <Breadcrumbs
            options={[
              { current: false, label: 'Strona główna', href: '/' },
              { current: true, label: 'Statystyki', href: '/admin/stats' },
            ]}
          />

          <Container maxWidth="lg">
            <PageHeader title="Statystyki" />

            <LastAddedGames data={this.state.lastAddedGames} loading={this.state.loading} />
            <LastAddedDLC data={this.state.lastAddedDLC} loading={this.state.loading} />
          </Container>
        </>
      </Page>
    );
  }
}

export default Stats;
