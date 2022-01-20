import React from 'react';

// === Components === //
import { colors, Link, TableCell, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Chip } from '@material-ui/core';
import HtmlTooltip from '../common/HtmlTooltip';

// === Helpers === //
import dateFormat from 'dateformat';

// === Styles === //
import { animation, customColors } from '../../styles/variables';

// === Types === //
import { GamesListData } from '../../types/games';

interface CellGameDataProps {
  data: GamesListData;
}

const CellGameData = ({ data }: CellGameDataProps) => {
  return (
    <TableCell>
      <Box>
        <Box>
          <Link
            href={`/game/${data.id}`}
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
          {data.platforms.map((platform) => (
            <Box key={platform.id} display="inline-block" mr="5px">
              <HtmlTooltip label={platform.description} placement="top">
                <Chip
                  label={platform.code}
                  variant="outlined"
                  component="a"
                  href={`/games?platform=${platform.id}`}
                  clickable
                  size="small"
                  color="primary"
                />
              </HtmlTooltip>
            </Box>
          ))}
        </Box>
        <Box mt={1} display="flex">
          <Box display="flex">
            <Typography color={customColors.textLight} variant="subtitle2" component="p" mr="5px">
              Producent
            </Typography>
            {data.producerName && data.producerName !== '' ? (
              <Link
                href={`/games?producer=${data.producerId}`}
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
                {data.producerName}
              </Link>
            ) : (
              <Typography color="white" variant="subtitle2" component="p">
                -
              </Typography>
            )}
          </Box>
          {data.earlyAccess ? (
            <Box display="flex" ml={4}>
              <Typography color="white" variant="subtitle2" component="p">
                Wczesny dostęp
              </Typography>
            </Box>
          ) : (
            <Box display="flex" ml={4}>
              <Typography color={customColors.textLight} variant="subtitle2" component="p" mr="5px">
                Data premiery
              </Typography>
              <Typography color="white" variant="subtitle2" component="p">
                {data.firstDate ? dateFormat(data.firstDate, 'dd-mm-yyyy') : '-'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </TableCell>
  );
};

export default CellGameData;
