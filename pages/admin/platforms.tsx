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

// === Styles === //
import { customColors } from '../../src/styles/variables';

class Platforms extends Component {
  state = {
    platforms: [],
    totalCount: 0,
    searchInput: '',
  };

  handleChangeSearchInput = (value: string) => {
    this.setState({ searchInput: value });
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
                    <Box mr={{ xs: 0, md: 2 }} mb={{ xs: 2, md: 0 }}>
                      <TextField
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
                    >
                      Dodaj platformę
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Container>
        </>
      </Page>
    );
  }
}

export default Platforms;
