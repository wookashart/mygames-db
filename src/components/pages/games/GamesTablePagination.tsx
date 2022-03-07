import React from 'react';

// == Components === //
import { Box } from '@mui/system';
import { Pagination, PaginationItem } from '@mui/material';

// === Helpers === //
import * as utils from '../../../utils';

// === Styles === //
import { makeStyles } from '@material-ui/core';
import { customColors } from '../../../styles/variables';

// === Types === //
import { GamesFiltersData } from '../../../types/games';

interface GamesTablePaginationProps {
  url: string;
  count: number;
  currentPage: number;
  filters: GamesFiltersData;
}

const GamesTablePagination = ({ count, currentPage, filters, url }: GamesTablePaginationProps) => {
  const useStyles = makeStyles(() => ({
    root: {
      '& .MuiPaginationItem-root': {
        color: customColors.textLight,
      },
    },
  }));
  const classes = useStyles();

  const parameters = utils.addParametersToUrl({ ...filters });
  const parametersArr = Object.keys(parameters);
  const parametersString = parametersArr.map((p) => `${p}=${parameters[p]}`).join('&');

  return (
    <Box py={4} display="flex" justifyContent="center">
      <Pagination
        count={count}
        page={currentPage}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
        className={classes.root}
        renderItem={(item) => (
          <PaginationItem
            component="a"
            href={`${url}/${item.page}${
              parametersString && parametersString !== '' ? `?${parametersString}` : ''
            }`}
            {...item}
          />
        )}
      />
    </Box>
  );
};

export default GamesTablePagination;
