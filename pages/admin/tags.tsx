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
import TagsTable from '../../src/components/pages/admin-tags/TagsTable';
import TagCreateEdit from '../../src/components/pages/admin-tags/TagCreateEdit';
import TagDelete from '../../src/components/pages/admin-tags/TagDelete';

// === Styles === //
import { customColors } from '../../src/styles/variables';

// === Types === //
import { TagData } from '../../src/types/admin';

class Tags extends Component {
  state = {
    tags: [],
    totalCount: 0,
    searchInput: '',
    createEditOpen: false,
    deleteOpen: false,
    editItem: null,
  };

  componentDidMount() {
    this.handleGetTags();
  }

  handleGetTags = () => {
    const params =
      this.state.searchInput && this.state.searchInput !== ''
        ? `?tag=${this.state.searchInput}`
        : '';

    fetch(`/api/tags${params}`, {
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
            tags: json.items,
            totalCount: json.items.length,
          });
        }
      });
  };

  handleOpenEditModal = (item: TagData) => {
    this.setState({
      createEditOpen: true,
      editItem: item,
    });
  };

  handleOpenDeleteModal = (item: TagData) => {
    this.setState({
      deleteOpen: true,
      editItem: item,
    });
  };

  handleChangeSearchInput = (value: string) => {
    this.setState({ searchInput: value }, () => {
      this.handleGetTags();
    });
  };

  render() {
    return (
      <Page seo={{ title: 'Tagi', description: '' }} pageType="admin">
        <>
          <Breadcrumbs
            options={[
              { current: false, label: 'Strona główna', href: '/' },
              { current: true, label: 'Tagi', href: '/admin/tags' },
            ]}
          />
          <Container maxWidth="lg">
            <PageHeader title="Tagi" />

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
                      Wszystkich tagów: {this.state.totalCount}
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
                      Dodaj tag
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
              <Box px={2} pb={2}>
                <TagsTable
                  items={this.state.tags}
                  handleOpenEditModal={(item: TagData) => this.handleOpenEditModal(item)}
                  handleOpenDeleteModal={(item: TagData) => this.handleOpenDeleteModal(item)}
                />
              </Box>
            </Paper>

            <TagCreateEdit
              editItem={this.state.editItem}
              open={this.state.createEditOpen}
              handleClose={() => this.setState({ createEditOpen: false, editItem: null })}
              handleReloadData={this.handleGetTags}
            />
            <TagDelete
              editItem={this.state.editItem}
              open={this.state.deleteOpen}
              handleClose={() => this.setState({ deleteOpen: false, editItem: null })}
              handleReloadData={this.handleGetTags}
            />
          </Container>
        </>
      </Page>
    );
  }
}

export default Tags;
