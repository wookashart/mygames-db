import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { IconButton, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@material-ui/core';
import { FilterAlt, Search } from '@mui/icons-material';
import GamesListViewChanger from './GamesListViewChanger';

// === Helpers === //
import { useRouter } from 'next/router';
import * as utils from '../../../utils';

// === Styles === //
import { customColors } from '../../../styles/variables';

interface GamesViewSearchbarProps {
  redirectPath: string;
  totalCount: number;
  searchInput: string;
  activeView: number;
  handleAdvancedFiltersOpen: Function;
  handleChangeSearchInput: Function;
  handleSearchByName: Function;
  handleChangeActiveView: Function;
}

const GamesViewSearchbar = ({
  redirectPath,
  totalCount,
  searchInput,
  activeView,
  handleAdvancedFiltersOpen,
  handleChangeSearchInput,
  handleSearchByName,
  handleChangeActiveView,
}: GamesViewSearchbarProps) => {
  const router = useRouter();

  const onSearchByName = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push(
      {
        pathname: redirectPath,
        query: utils.addParametersToUrl({ name: searchInput }),
      },
      undefined,
      { shallow: true }
    );
    handleSearchByName();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={{ xs: 'center', md: 'space-between' }}
      flexDirection={{ xs: 'column', md: 'row' }}
    >
      <Box>
        <Typography color={customColors.textLight} mb={{ xs: 2, md: 0 }}>
          Wyszukanych gier: {totalCount}
        </Typography>
      </Box>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center">
        <Box mr={{ xs: 0, md: 1 }} mb={{ xs: 2, md: 0 }}>
          <IconButton onClick={() => handleAdvancedFiltersOpen(true)}>
            <FilterAlt
              sx={{
                color: customColors.textLight,
              }}
            />
          </IconButton>
        </Box>
        <form>
          <Box
            mr={{ xs: 0, md: 1 }}
            mb={{ xs: 2, md: 0 }}
            sx={{ width: 330 }}
            display="flex"
            height="42px"
          >
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Wyszukaj po nazwie"
              variant="standard"
              size="small"
              type="search"
              value={searchInput}
              onChange={(e) => handleChangeSearchInput(e.target.value)}
            />
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => onSearchByName(e)}
            >
              <Search />
            </LoadingButton>
          </Box>
        </form>
        <GamesListViewChanger
          activeItem={activeView}
          handleChangeActiveView={handleChangeActiveView}
        />
      </Box>
    </Box>
  );
};

export default GamesViewSearchbar;
