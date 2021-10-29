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
import PlatformCreateEdit from '../../src/components/pages/admin-platforms/PlatformCreateEdit';
import PlatformsTable from '../../src/components/pages/admin-platforms/PlatformsTable';

// === Styles === //
import { customColors } from '../../src/styles/variables';

// === Types === //
import { PlatformsData } from '../../src/types/admin';
import PlatformDelete from '../../src/components/pages/admin-platforms/PlatformDelete';

class Platforms extends Component {
  state = {
    platforms: [],
    totalCount: 0,
    searchInput: '',
    createEditOpen: false,
    deleteOpen: false,
    editItem: null,
  };

  componentDidMount() {
    this.handleGetPlatforms();
  }

  handleGetPlatforms = () => {
    const params =
      this.state.searchInput && this.state.searchInput !== ''
        ? `?platform=${this.state.searchInput}`
        : '';

    fetch(`/api/platforms${params}`, {
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
            platforms: json.items,
            totalCount: json.items.length,
          });
        }
      });
  };

  handleChangeSearchInput = (value: string) => {
    this.setState({ searchInput: value }, () => {
      this.handleGetPlatforms();
    });
  };

  handleOpenEditModal = (item: PlatformsData) => {
    this.setState({
      createEditOpen: true,
      editItem: item,
    });
  };
  handleOpenDeleteModal = (item: PlatformsData) => {
    this.setState({
      deleteOpen: true,
      editItem: item,
    });
  };

  render() {
    return (
      <Page seo={{ title: 'Platformy', description: '' }} pageType="admin">
        <>
          <Breadcrumbs
            options={[
              { current: false, label: 'Strona główna', href: '/' },
              { current: true, label: 'Platformy', href: '/admin/platforms' },
            ]}
          />
          <Container maxWidth="xl">
            <PageHeader title="Platformy" />

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
                      Wszystkich platform: {this.state.totalCount}
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
                    <Box mr={{ xs: 0, md: 2 }} mb={{ xs: 2, md: 0 }} sx={{ width: 230 }}>
                      <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Wyszukaj po nazwie/kodzie"
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
                      Dodaj platformę
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
              <Box px={2} pb={2}>
                <PlatformsTable
                  items={this.state.platforms}
                  handleOpenEditModal={(item: PlatformsData) => this.handleOpenEditModal(item)}
                  handleOpenDeleteModal={(item: PlatformsData) => this.handleOpenDeleteModal(item)}
                />
              </Box>
            </Paper>

            <PlatformCreateEdit
              editItem={this.state.editItem}
              open={this.state.createEditOpen}
              handleClose={() => this.setState({ createEditOpen: false, editItem: null })}
              handleReloadData={this.handleGetPlatforms}
            />
            <PlatformDelete
              editItem={this.state.editItem}
              open={this.state.deleteOpen}
              handleClose={() => this.setState({ deleteOpen: false, editItem: null })}
              handleReloadData={this.handleGetPlatforms}
            />
          </Container>
        </>
      </Page>
    );
  }
}

export default Platforms;
