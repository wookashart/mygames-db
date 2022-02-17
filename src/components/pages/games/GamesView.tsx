import React, { Component } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { colors, Container, Paper } from '@mui/material';
import Breadcrumbs from '../../common/Breadcrumbs';
import PageHeader from '../../common/PageHeader';
import GamesAdvancedFilters from './GamesAdvancedFilters';
import GamesTable from './GamesTable';
import GamesTablePagination from './GamesTablePagination';
import GamesViewSearchbar from './GamesViewSearchbar';
import GamesTableLoading from './GamesTableLoading';
import GamesTiles from './GamesTiles';

// === Helpers === //
import debounce from 'lodash.debounce';

// === Types === //
import { GamesFiltersData } from '../../../types/games';

interface GamesViewProps {
  pageId: number | undefined;
  filters: GamesFiltersData;
}

class GamesView extends Component<GamesViewProps> {
  state = {
    loading: true,
    games: [],
    totalCount: 1,
    advancedFiltersOpen: false,
    activeView: 0,

    // filters:
    searchInput: '',
  };

  debounceFunc = debounce((func: Function) => func(), 300);

  componentDidMount() {
    this.checkViewType();

    this.setState(
      {
        searchInput: this.props.filters.name,
      },
      () => {
        this.handleGetGames();
      }
    );
  }

  checkViewType = () => {
    if (localStorage.getItem('mygames-db-activeView')) {
      this.setState({ activeView: Number(localStorage.getItem('mygames-db-activeView')) });
    }
  };

  handleChangeActiveView = (nr: number) => {
    this.setState({ activeView: nr }, () => {
      localStorage.setItem('mygames-db-activeView', `${nr}`);
    });
  };

  handleGetGames = () => {
    this.setState({ loading: true }, () => {
      const filters = [];

      if (this.state.searchInput && this.state.searchInput !== '') {
        filters.push(`&name=${this.state.searchInput}`);
      }

      const filtersJoined = filters.join('');

      fetch(`/api/games?pageId=${this.props.pageId}${filtersJoined}`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((json) => {
          if (json && !json.error) {
            this.setState({
              games: json.items,
              totalCount: json.totalCount,
              loading: false,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          this.setState({ loading: false });
        });
    });
  };

  handleChangeSearchInput = (value: string) => this.setState({ searchInput: value });
  handleSearchByName = () => {
    this.handleGetGames();
  };

  render() {
    const { pageId, filters } = this.props;

    return (
      <Box>
        <Breadcrumbs
          options={[
            { current: false, label: 'Strona główna', href: '/' },
            {
              current: true,
              label: 'Biblioteka gier',
              href: `/games${pageId ? `/${pageId}` : ''}`,
            },
          ]}
        />

        <Container maxWidth="lg">
          <PageHeader title="Biblioteka gier" />

          <Paper elevation={6} sx={{ backgroundColor: colors.grey[800], marginBottom: 4 }}>
            <Box px={3} py={3}>
              <GamesViewSearchbar
                totalCount={this.state.totalCount}
                searchInput={this.state.searchInput}
                activeView={this.state.activeView}
                handleAdvancedFiltersOpen={(value: boolean) =>
                  this.setState({ advancedFiltersOpen: value })
                }
                handleChangeSearchInput={this.handleChangeSearchInput}
                handleSearchByName={this.handleSearchByName}
                handleChangeActiveView={this.handleChangeActiveView}
              />
            </Box>

            {this.state.activeView === 0 ? (
              <>
                {this.state.loading ? (
                  <GamesTableLoading />
                ) : (
                  <GamesTable items={this.state.games} />
                )}
              </>
            ) : (
              <>
                <GamesTiles items={this.state.games} />
              </>
            )}
            <GamesTablePagination
              count={Math.ceil(this.state.totalCount / 30)}
              currentPage={this.props.pageId ? Number(this.props.pageId) : 1}
              filters={filters}
            />
          </Paper>
        </Container>

        <GamesAdvancedFilters
          open={this.state.advancedFiltersOpen}
          handleClose={() => this.setState({ advancedFiltersOpen: false })}
        />
      </Box>
    );
  }
}

export default GamesView;
