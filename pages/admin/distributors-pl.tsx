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
import DistributorsPlTable from '../../src/components/pages/admin-distributors-pl/DistributorsPlTable';
// import DistributorCreateEdit from '../../src/components/pages/admin-distributors/DistributorCreateEdit';
// import DistributorDelete from '../../src/components/pages/admin-distributors/DistributorDelete';

// === Styles === //
import { customColors } from '../../src/styles/variables';

// === Types === //
import { DistributorPlData } from '../../src/types/admin';

class DistributorsPl extends Component {
  state = {
    distributorsPl: [],
    totalCount: 0,
    searchInput: '',
    createEditOpen: false,
    deleteOpen: false,
    editItem: null,
  };

  componentDidMount() {
    this.handleGetDistributorPl();
  }

  handleGetDistributorPl = () => {
    const params =
      this.state.searchInput && this.state.searchInput !== ''
        ? `?distributorPl=${this.state.searchInput}`
        : '';

    fetch(`/api/distributors-pl${params}`, {
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
            distributorsPl: json.items,
            totalCount: json.items.length,
          });
        }
      });
  };

  handleChangeSearchInput = (value: string) => {
    this.setState({ searchInput: value }, () => {
      this.handleGetDistributorPl();
    });
  };

  handleOpenEditModal = (item: DistributorPlData) => {
    this.setState({
      createEditOpen: true,
      editItem: item,
    });
  };

  handleOpenDeleteModal = (item: DistributorPlData) => {
    this.setState({
      deleteOpen: true,
      editItem: item,
    });
  };

  render() {
    return (
      <Page seo={{ title: 'Wydawcy w Polsce', description: '' }} pageType="admin">
        <>
          <Breadcrumbs
            options={[
              { current: false, label: 'Strona główna', href: '/' },
              { current: true, label: 'Wydawcy w Polsce', href: '/admin/distributors-pl' },
            ]}
          />
          <Container maxWidth="xl">
            <PageHeader title="Wydawcy w Polsce" />

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
                      Wszystkich polskich wydawców: {this.state.totalCount}
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
                      Dodaj polskiego wydawcę
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
              <Box px={2} pb={2}>
                <DistributorsPlTable
                  items={this.state.distributorsPl}
                  handleOpenEditModal={(item: DistributorPlData) => this.handleOpenEditModal(item)}
                  handleOpenDeleteModal={(item: DistributorPlData) =>
                    this.handleOpenDeleteModal(item)
                  }
                />
              </Box>
            </Paper>

            {/* <DistributorCreateEdit
              editItem={this.state.editItem}
              open={this.state.createEditOpen}
              handleClose={() => this.setState({ createEditOpen: false, editItem: null })}
              handleReloadData={this.handleGetDistributorPl}
            /> */}
            {/* <DistributorDelete
              editItem={this.state.editItem}
              open={this.state.deleteOpen}
              handleClose={() => this.setState({ deleteOpen: false, editItem: null })}
              handleReloadData={this.handleGetDistributorPl}
            /> */}
          </Container>
        </>
      </Page>
    );
  }
}

export default DistributorsPl;
