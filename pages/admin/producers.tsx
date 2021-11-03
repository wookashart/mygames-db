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
import ProducersTable from '../../src/components/pages/admin-producers/ProducersTable';
// import PlatformCreateEdit from '../../src/components/pages/admin-platforms/PlatformCreateEdit';
// import PlatformDelete from '../../src/components/pages/admin-platforms/PlatformDelete';

// === Styles === //
import { customColors } from '../../src/styles/variables';

// === Types === //
import { ProducerData } from '../../src/types/admin';

class Producers extends Component {
  state = {
    producers: [],
    totalCount: 0,
    searchInput: '',
    createEditOpen: false,
    deleteOpen: false,
    editItem: null,
  };

  componentDidMount() {
    this.handleGetProducers();
  }

  handleGetProducers = () => {
    const params =
      this.state.searchInput && this.state.searchInput !== ''
        ? `?producer=${this.state.searchInput}`
        : '';

    fetch(`/api/producers${params}`, {
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
            producers: json.items,
            totalCount: json.items.length,
          });
        }
      });
  };

  handleChangeSearchInput = (value: string) => {
    this.setState({ searchInput: value }, () => {
      this.handleGetProducers();
    });
  };

  handleOpenEditModal = (item: ProducerData) => {
    this.setState({
      createEditOpen: true,
      editItem: item,
    });
  };

  handleOpenDeleteModal = (item: ProducerData) => {
    this.setState({
      deleteOpen: true,
      editItem: item,
    });
  };

  render() {
    return (
      <Page seo={{ title: 'Producenci', description: '' }} pageType="admin">
        <>
          <Breadcrumbs
            options={[
              { current: false, label: 'Strona główna', href: '/' },
              { current: true, label: 'Producenci', href: '/admin/producers' },
            ]}
          />
          <Container maxWidth="xl">
            <PageHeader title="Producenci" />

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
                      Wszystkich producentów: {this.state.totalCount}
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
                      Dodaj producenta
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
              <Box px={2} pb={2}>
                <ProducersTable
                  items={this.state.producers}
                  handleOpenEditModal={(item: ProducerData) => this.handleOpenEditModal(item)}
                  handleOpenDeleteModal={(item: ProducerData) => this.handleOpenDeleteModal(item)}
                />
              </Box>
            </Paper>

            {/* <PlatformCreateEdit
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
            /> */}
          </Container>
        </>
      </Page>
    );
  }
}

export default Producers;
