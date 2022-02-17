import React, { Component } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { colors, Paper, Typography } from '@mui/material';
import Link from 'next/link';

// === Styles === //
import { animation, customColors } from '../../../styles/variables';

// === Types === //
import { LastAddedDLCData } from '../../../types/admin';

interface LastAddedDLCProps {
  data: LastAddedDLCData[];
  loading: boolean;
}

class LastAddedDLC extends Component<LastAddedDLCProps> {
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
            Ostatnio dodane DLC:
          </Typography>

          <Box display="flex" flexWrap="wrap" justifyContent="center">
            {data.map((dlc: LastAddedDLCData) => {
              const imgSrc =
                dlc && dlc.cover && dlc.cover !== '' ? `/img/dlc/${dlc.cover}` : '/img/nocover.jpg';

              return (
                <Box
                  key={dlc.id}
                  sx={{
                    maxWidth: '200px',
                    padding: 1,
                  }}
                >
                  <Link href={`/game/${dlc.gameId}/dlc/${dlc.id}`}>
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
                        <img className="lastDlc-image" src={imgSrc} alt={dlc.name} />
                        <style jsx>{`
                          .lastDlc-image {
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
                            {dlc.gameName} - {dlc.name}
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

export default LastAddedDLC;
