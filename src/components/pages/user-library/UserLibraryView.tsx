import React, { Component } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { colors, Container, Paper } from '@mui/material';
import Page from '../../layout/Page';
import Breadcrumbs from '../../common/Breadcrumbs';
import PageHeader from '../../common/PageHeader';
import GamesViewSearchbar from '../games/GamesViewSearchbar';
import GamesTablePagination from '../games/GamesTablePagination';
import UserLibraryAdvancedFilters from './UserLibraryAdvancedFilters';
import UserLibraryTable from './UserLibraryTable';
import GamesTableLoading from '../games/GamesTableLoading';
import UserLibraryTiles from './UserLibraryTiles';
import GamesTilesLoading from '../games/GamesTilesLoading';

// === Types === //
import { UserData } from '../../../types/users';
import { GamesFiltersData } from '../../../types/games';

interface UserLibraryViewProps {
  userId: number;
  pageId: number | undefined;
  filters: GamesFiltersData;
}

class UserLibraryView extends Component<UserLibraryViewProps> {
  state = {
    user: null as UserData | null,
    loading: true,

    games: [],
    totalCount: 0,
    advancedFiltersOpen: false,
    activeView: 0,

    // filters:
    searchInput: '',
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState(
        {
          searchInput: this.props.filters.name,
        },
        () => {
          this.getUserData();
          this.checkViewType();
          this.handleGetGames();
        }
      );
    }, 200);
  }

  getUserData = () => {
    const id = this.props.userId || 0;

    this.setState({ loading: true }, () => {
      fetch(`/api/user/${id}`, {
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
              user: json.user,
            });
          }
          this.setState({ loading: false });
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.error(error);
        });
    });
  };

  handleGetGames = () => {
    const id = this.props.userId || 0;

    this.setState({ loading: true }, () => {
      const filters = [];

      if (this.state.searchInput && this.state.searchInput !== '') {
        filters.push(`&name=${this.state.searchInput}`);
      }

      const filtersJoined = filters.join('');

      fetch(`/api/user/${id}/library?pageId=${this.props.pageId}${filtersJoined}`, {
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
  handleChangeSearchInput = (value: string) => this.setState({ searchInput: value });
  handleSearchByName = () => {
    this.handleGetGames();
  };

  render() {
    const { user, loading } = this.state;
    const { pageId, filters } = this.props;

    return (
      <Page
        seo={{
          title: `Kolekcja gier użytkownika ${!loading && user ? user.name : ''}`,
          description: '',
        }}
        pageType="userLibrary"
      >
        <Box>
          <Breadcrumbs
            options={[
              { current: false, label: 'Strona główna', href: '/' },
              {
                current: false,
                label: `${user?.name || ''}`,
                href: `/user/${user?.id || 0}`,
              },
              {
                current: true,
                label: `Kolekcja gier`,
                href: `/user/${user?.id || 0}/library`,
              },
            ]}
          />

          <Container maxWidth="lg">
            <PageHeader title="Kolekcja gier" />

            <Paper elevation={6} sx={{ backgroundColor: colors.grey[800], marginBottom: 4 }}>
              <Box px={3} py={3}>
                <GamesViewSearchbar
                  redirectPath={`/user/${user?.id || 0}/library/1`}
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
                    <UserLibraryTable items={this.state.games} />
                  )}
                </>
              ) : (
                <>
                  {this.state.loading ? (
                    <GamesTilesLoading />
                  ) : (
                    <UserLibraryTiles items={this.state.games} />
                  )}
                </>
              )}

              <GamesTablePagination
                url={`/user/${user?.id || 0}/library`}
                count={Math.ceil(this.state.totalCount / 30)}
                currentPage={pageId ? Number(pageId) : 1}
                filters={filters}
              />
            </Paper>
          </Container>

          <UserLibraryAdvancedFilters
            open={this.state.advancedFiltersOpen}
            handleClose={() => this.setState({ advancedFiltersOpen: false })}
          />
        </Box>
      </Page>
    );
  }
}

export default UserLibraryView;
