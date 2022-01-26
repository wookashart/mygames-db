import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { colors, Link, Paper, Typography } from '@mui/material';
import GameDate from '../../../common/GameDate';

// === Helpers === //
import dateFormat from 'dateformat';

// === Styles === //
import { animation, customColors } from '../../../../styles/variables';

// === Types === //
import { GameDatesData, GameDetailData, PlatformsData } from '../../../../types/games';

interface InformationsProps {
  game: GameDetailData;
}

const Informations = ({ game }: InformationsProps) => {
  const setPremierDates = (
    dates: GameDatesData[],
    firstDate: Date | string | null,
    platforms: PlatformsData[] | null
  ) => {
    const modifyPlatforms = [];

    if (dates.length > 0) {
      const datesArr = dates.map((d) => d.date);
      const uniq = [...new Set(datesArr)];

      uniq.forEach((date) => {
        const dPlatforms = dates.filter((dObj) => dObj.date === date);

        modifyPlatforms.push({
          date: dateFormat(date, 'dd.mm.yyyy'),
          platforms: dPlatforms.map((p) => p.platformCode),
        });
      });
    } else {
      if (firstDate && firstDate !== '0000-00-00' && platforms && platforms.length > 0) {
        modifyPlatforms.push({
          date: dateFormat(firstDate, 'dd.mm.yyyy'),
          platforms: platforms.map((p) => p.code),
        });
      }
    }

    return modifyPlatforms;
  };

  return (
    <Box mt={4}>
      <Paper
        elevation={6}
        sx={{ backgroundColor: colors.grey[700], marginBottom: 4, marginTop: 2 }}
      >
        <Box display="flex" flexWrap="wrap">
          <Box display="flex" p={2}>
            <Typography color={customColors.textLight} variant="subtitle2" component="p" mr="5px">
              Producent
            </Typography>
            {game.producer && game.producer.name !== '' ? (
              <Link
                href={`/games?producer=${game.producer.id}`}
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  transition: `color ${animation.fast}ms ease-out`,
                  '&:hover': {
                    color: colors.blue[600],
                  },
                }}
                variant="subtitle2"
              >
                {game.producer.name}
              </Link>
            ) : (
              <Typography color="white" variant="subtitle2" component="p">
                -
              </Typography>
            )}
          </Box>
          <Box display="flex" p={2}>
            <Typography color={customColors.textLight} variant="subtitle2" component="p" mr="5px">
              Wydawca
            </Typography>
            {game.distributor && game.distributor.name !== '' ? (
              <Link
                href={`/games?distributor=${game.distributor.id}`}
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  transition: `color ${animation.fast}ms ease-out`,
                  '&:hover': {
                    color: colors.blue[600],
                  },
                }}
                variant="subtitle2"
              >
                {game.distributor.name}
              </Link>
            ) : (
              <Typography color="white" variant="subtitle2" component="p">
                -
              </Typography>
            )}
          </Box>
          <Box display="flex" p={2}>
            <Typography color={customColors.textLight} variant="subtitle2" component="p" mr="5px">
              Wydawca w Polsce
            </Typography>
            {game.distributorPl && game.distributorPl.name !== '' ? (
              <Link
                href={`/games?distributorPl=${game.distributorPl.id}`}
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  transition: `color ${animation.fast}ms ease-out`,
                  '&:hover': {
                    color: colors.blue[600],
                  },
                }}
                variant="subtitle2"
              >
                {game.distributorPl.name}
              </Link>
            ) : (
              <Typography color="white" variant="subtitle2" component="p">
                -
              </Typography>
            )}
          </Box>
        </Box>

        <Box px={2} py={game.earlyAccess ? 1 : 2} display="flex" alignItems="center">
          <Typography color={customColors.textLight} variant="subtitle2" component="p" mr="5px">
            Premiera
          </Typography>

          {setPremierDates(game.dates ? game.dates : [], game.firstDate, game.platforms).length >
          0 ? (
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'row wrap',
              }}
            >
              {setPremierDates(game.dates ? game.dates : [], game.firstDate, game.platforms).map(
                (item, index) => (
                  <Box key={index} ml={3}>
                    <GameDate data={item} />
                  </Box>
                )
              )}
            </Box>
          ) : (
            <Typography color="white" variant="subtitle2" component="p">
              -
            </Typography>
          )}
        </Box>

        {game.earlyAccess && (
          <Box px={2} py={2}>
            <Typography color="white" variant="h6" component="h6" fontSize="1rem">
              Gra we wczesnym dostępie!
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Informations;
