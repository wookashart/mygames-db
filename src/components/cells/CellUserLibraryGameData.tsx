import React from 'react';

// === Components === //
import { colors, Link, TableCell, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Chip } from '@material-ui/core';

// === Helpers === //
import dateFormat from 'dateformat';
import * as utils from '../../utils';

// === Styles === //
import { animation, customColors } from '../../styles/variables';

// === Types === //
import { UserLibraryGamesData } from '../../types/users';

interface CellUserLibraryGameDataProps {
  data: UserLibraryGamesData;
}

const CellUserLibraryGameData = ({ data }: CellUserLibraryGameDataProps) => {
  return (
    <TableCell>
      <Box>
        <Box>
          <Link
            href={`/game/${data.gameId}`}
            variant="h6"
            sx={{
              color: 'white',
              textDecoration: 'none',
              transition: `color ${animation.fast}ms ease-out`,
              '&:hover': {
                color: colors.blue[600],
              },
            }}
          >
            {data.namePl && data.namePl !== '' ? data.namePl : data.name}
          </Link>
          {data.namePl && data.namePl !== '' ? (
            <Typography color={customColors.textLight} variant="subtitle2" component="p">
              {data.name}
            </Typography>
          ) : null}
        </Box>
        <Box mt={1}>
          {data.userLibrary.map((ul, index) => (
            <Box key={index} display="inline-block" mr="5px">
              <Chip
                label={`${ul.platform?.code || ''} - ${ul.distributionName}`}
                variant="outlined"
                component="a"
                href={`/games?platform=${ul.platform?.id || 0}`}
                clickable
                size="small"
                color="primary"
              />
            </Box>
          ))}
        </Box>
        <Box mt={1} display="flex">
          <Box display="flex" alignItems="center">
            <Typography color={customColors.textLight} variant="subtitle2" component="p" mr="5px">
              Dodano do kolekcji
            </Typography>
            <Typography color="white" variant="subtitle2" component="p">
              {data.addDate ? dateFormat(data.addDate, 'dd.mm.yyyy') : '-'}
            </Typography>
          </Box>
          <Box display="flex" ml={4} alignItems="center">
            <Typography color={customColors.textLight} variant="subtitle2" component="p" mr="5px">
              Czas grania
            </Typography>
            <Typography color="white" variant="subtitle2" component="p">
              {data.playedTime && data.playedTime !== 0
                ? `${utils.minutesToHoursAndMinutes(data.playedTime).hours}h:${
                    utils.minutesToHoursAndMinutes(data.playedTime).minutes
                  }m`
                : '-'}
            </Typography>
          </Box>
          <Box display="flex" ml={4} alignItems="center">
            <Typography color={customColors.textLight} variant="subtitle2" component="p" mr="5px">
              Status
            </Typography>
            <Typography
              color={data.status ? utils.setStatusColor(data.status) : 'white'}
              variant="subtitle2"
              component="p"
            >
              {utils.statusName(data.status) || '-'}
              {data.status && data.statusDetail && data.statusDetail !== 'null'
                ? ` (${utils.statusDetailName(data.statusDetail)})`
                : ''}
            </Typography>
          </Box>
        </Box>
      </Box>
    </TableCell>
  );
};

export default CellUserLibraryGameData;
