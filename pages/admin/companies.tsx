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
import CompaniesTable from '../../src/components/pages/admin-companies/CompaniesTable';
import CompanyCreateEdit from '../../src/components/pages/admin-companies/CompanyCreateEdit';
import CompanyDelete from '../../src/components/pages/admin-companies/CompanyDelete';

// === Styles === //
import { customColors } from '../../src/styles/variables';

// === Types === //
import { CompanyData } from '../../src/types/admin';

class Companies extends Component {
  state = {
    companies: [],
    totalCount: 0,
    searchInput: '',
    createEditOpen: false,
    deleteOpen: false,
    editItem: null,
    user: null,
  };

  componentDidMount() {
    this.handleGetCompanies();
    this.handleCheckUserSession();
  }

  handleGetCompanies = () => {
    const params =
      this.state.searchInput && this.state.searchInput !== ''
        ? `?producer=${this.state.searchInput}`
        : '';

    fetch(`/api/companies${params}`, {
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
            companies: json.items,
            totalCount: json.items.length,
          });
        }
      });
  };

  handleCheckUserSession = () => {
    this.setState({ userLoading: true }, () => {
      fetch(`/api/me`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((json) => {
          if (json && !json.error && json.user) {
            this.setState({ user: json.user });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  handleChangeSearchInput = (value: string) => {
    this.setState({ searchInput: value }, () => {
      this.handleGetCompanies();
    });
  };

  handleOpenEditModal = (item: CompanyData) => {
    this.setState({
      createEditOpen: true,
      editItem: item,
    });
  };

  handleOpenDeleteModal = (item: CompanyData) => {
    this.setState({
      deleteOpen: true,
      editItem: item,
    });
  };

  render() {
    return (
      <Page seo={{ title: 'Firmy', description: '' }} pageType="admin">
        <>
          <Breadcrumbs
            options={[
              { current: false, label: 'Strona główna', href: '/' },
              { current: true, label: 'Firmy', href: '/admin/companies' },
            ]}
          />
          <Container maxWidth="lg">
            <PageHeader title="Firmy" />

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
                      Wszystkich firm: {this.state.totalCount}
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
                      Dodaj firmę
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
              <Box px={2} pb={2}>
                <CompaniesTable
                  items={this.state.companies}
                  handleOpenEditModal={(item: CompanyData) => this.handleOpenEditModal(item)}
                  handleOpenDeleteModal={(item: CompanyData) => this.handleOpenDeleteModal(item)}
                />
              </Box>
            </Paper>

            <CompanyCreateEdit
              editItem={this.state.editItem}
              open={this.state.createEditOpen}
              user={this.state.user}
              handleClose={() => this.setState({ createEditOpen: false, editItem: null })}
              handleReloadData={this.handleGetCompanies}
            />
            <CompanyDelete
              editItem={this.state.editItem}
              open={this.state.deleteOpen}
              handleClose={() => this.setState({ deleteOpen: false, editItem: null })}
              handleReloadData={this.handleGetCompanies}
            />
          </Container>
        </>
      </Page>
    );
  }
}

export default Companies;
