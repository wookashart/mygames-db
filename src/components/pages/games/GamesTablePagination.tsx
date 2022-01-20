import React from 'react';

// == Components === //
import { Box } from '@mui/system';
import { Pagination } from '@mui/material';

// === Helpers === //
import { useRouter } from 'next/router';
import * as utils from '../../../utils';

// === Styles === //
import { makeStyles } from '@material-ui/core';
import { customColors } from '../../../styles/variables';

// === Types === //
import { GamesFiltersData } from '../../../types/games';

interface GamesTablePaginationProps {
  count: number;
  currentPage: number;
  filters: GamesFiltersData;
}

const GamesTablePagination = ({ count, currentPage, filters }: GamesTablePaginationProps) => {
  const useStyles = makeStyles(() => ({
    root: {
      '& .MuiPaginationItem-root': {
        color: customColors.textLight,
      },
    },
  }));
  const classes = useStyles();

  const router = useRouter();
  const onChangePage = (page: number) => {
    router.push(
      {
        pathname: `/games/${page}`,
        query: utils.addParametersToUrl({ ...filters }),
      },
      undefined,
      { shallow: true }
    );
  };

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
        onChange={(e, page) => onChangePage(page)}
      />
    </Box>
  );
};

export default GamesTablePagination;
