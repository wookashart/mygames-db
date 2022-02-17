import React, { Component } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { colors, Paper, Typography } from '@mui/material';
import Link from 'next/link';

// === Styles === //
import { animation, customColors } from '../../../styles/variables';

// === Types === //
import { LastAddedGamesData } from '../../../types/admin';

interface LastAddedGamesProps {
  data: LastAddedGamesData[];
  loading: boolean;
}

class LastAddedGames extends Component<LastAddedGamesProps> {
  render() {
    const { data } = this.props;

    return (
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
            {data.map((game: LastAddedGamesData) => {
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
    );
  }
}

export default LastAddedGames;
