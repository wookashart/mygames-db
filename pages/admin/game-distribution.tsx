import React, { Component } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { colors, Container, Paper, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import { Add } from '@mui/icons-material';
import Page from '../../src/components/layout/Page';
import Breadcrumbs from '../../src/components/common/Breadcrumbs';
import PageHeader from '../../src/components/common/PageHeader';
import GameDistributionsTable from '../../src/components/pages/admin-game-distribution/GameDistributionsTable';
import GameDistributionCreateEdit from '../../src/components/pages/admin-game-distribution/GameDistributionCreateEdit';
import GameDistributionDelete from '../../src/components/pages/admin-game-distribution/GameDistributionDelete';

// === Styles === //
import { customColors } from '../../src/styles/variables';

// === Types === //
import { GameDistributionData } from '../../src/types/admin';

class GameDistribution extends Component {
  state = {
    gameDistributions: [],
    totalCount: 0,
    searchInput: '',
    createEditOpen: false,
    deleteOpen: false,
    editItem: null,
  };

  componentDidMount() {
    this.handleGetGameDistributions();
  }

  handleGetGameDistributions = () => {
    const params =
      this.state.searchInput && this.state.searchInput !== ''
        ? `?game_distribution=${this.state.searchInput}`
        : '';

    fetch(`/api/game-distributions${params}`, {
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
            gameDistributions: json.items,
            totalCount: json.items.length,
          });
        }
      });
  };

  handleChangeSearchInput = (value: string) => {
    this.setState({ searchInput: value }, () => {
      this.handleGetGameDistributions();
    });
  };

  handleOpenEditModal = (item: GameDistributionData) => {
    this.setState({
      createEditOpen: true,
      editItem: item,
    });
  };

  handleOpenDeleteModal = (item: GameDistributionData) => {
    this.setState({
      deleteOpen: true,
      editItem: item,
    });
  };

  render() {
    return (
      <Page seo={{ title: 'Dystrybucja gier', description: '' }} pageType="admin">
        <>
          <Breadcrumbs
            options={[
              { current: false, label: 'Strona główna', href: '/' },
              { current: true, label: 'Dystrybucja gier', href: '/admin/game-distribution' },
            ]}
          />

          <Container maxWidth="xl">
            <PageHeader title="Dystrybucja gier" />

            <Paper elevation={6} sx={{ backgroundColor: colors.grey[800], marginBottom: 4 }}>
              <Box px={3} py={3}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={{ xs: 'center', md: 'space-between' }}
                  flexDirection={{ xs: 'column', md: 'row' }}
                >
                  <Box>
                    <Typography color={customColors.textLight} mb={{ xs: 2, md: 0 }}>
                      Wszystkich rodzajów dystrybucji: {this.state.totalCount}
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
                    <Box mr={{ xs: 0, md: 2 }} mb={{ xs: 2, md: 0 }} sx={{ width: 230 }}>
                      <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Wyszukaj po nazwie"
                        variant="filled"
                        size="small"
                        value={this.state.searchInput}
                        onChange={(e) => this.handleChangeSearchInput(e.target.value)}
                      />
                    </Box>
                    <LoadingButton
                      type="button"
                      color="primary"
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => this.setState({ createEditOpen: true })}
                    >
                      Dodaj rodzaj dystrybucji
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>

              <Box px={2} pb={2}>
                <GameDistributionsTable
                  items={this.state.gameDistributions}
                  handleOpenEditModal={(item: GameDistributionData) =>
                    this.handleOpenEditModal(item)
                  }
                  handleOpenDeleteModal={(item: GameDistributionData) =>
                    this.handleOpenDeleteModal(item)
                  }
                />
              </Box>
            </Paper>

            <GameDistributionCreateEdit
              editItem={this.state.editItem}
              open={this.state.createEditOpen}
              handleClose={() => this.setState({ createEditOpen: false, editItem: null })}
              handleReloadData={this.handleGetGameDistributions}
            />
            <GameDistributionDelete
              editItem={this.state.editItem}
              open={this.state.deleteOpen}
              handleClose={() => this.setState({ deleteOpen: false, editItem: null })}
              handleReloadData={this.handleGetGameDistributions}
            />
          </Container>
        </>
      </Page>
    );
  }
}

export default GameDistribution;
