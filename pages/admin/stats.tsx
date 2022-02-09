import React, { Component } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { colors, Container, Paper, Typography } from '@mui/material';
import Page from '../../src/components/layout/Page';
import Breadcrumbs from '../../src/components/common/Breadcrumbs';
import PageHeader from '../../src/components/common/PageHeader';
import Link from 'next/link';

// === Styles === //
import { animation, customColors } from '../../src/styles/variables';

// === Types === //
import { LastAddedGamesData } from '../../src/types/admin';

class Stats extends Component {
  state = {
    loading: true,
    lastAddedGames: [],
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

            <Paper elevation={6} sx={{ backgroundColor: colors.grey[800], marginBottom: 4 }}>
              <Box px={3} py={3}>
                <Typography
                  color={customColors.textLight}
                  mb={{ xs: 2, md: 0 }}
                  component="h6"
                  variant="h6"
                >
                  Ostatnio dodane gry:
                </Typography>

                <Box display="flex" flexWrap="wrap" justifyContent="center">
                  {this.state.lastAddedGames.map((game: LastAddedGamesData) => {
                    const imgSrc =
                      game && game.cover && game.cover !== ''
                        ? `/img/games/${game.cover}`
                        : '/img/nocover.jpg';

                    return (
                      <Box
                        key={game.id}
                        sx={{
                          maxWidth: '200px',
                          padding: 1,
                        }}
                      >
                        <Link href={`/game/${game.id}`}>
                          <a>
                            <Box
                              position="relative"
                              sx={{
                                '&:hover': {
                                  '.title-wrapper': {
                                    opacity: 1,
                                  },
                                },
                              }}
                            >
                              <img className="lastGame-image" src={imgSrc} alt={game.name} />
                              <style jsx>{`
                                .lastGame-image {
                                  max-width: 100%;
                                }
                              `}</style>
                              <Box
                                className="title-wrapper"
                                sx={{
                                  backgroundColor: colors.grey[900],
                                  position: 'absolute',
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  top: 0,
                                  opacity: 0,
                                  transition: `opacity ease-out ${animation.fast}ms`,
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <Typography
                                  color="white"
                                  sx={{
                                    textAlign: 'center',
                                    padding: 2,
                                    fontSize: '16px',
                                    width: '100%',
                                  }}
                                >
                                  {game.name}
                                </Typography>
                              </Box>
                            </Box>
                          </a>
                        </Link>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Paper>
          </Container>
        </>
      </Page>
    );
  }
}

export default Stats;
