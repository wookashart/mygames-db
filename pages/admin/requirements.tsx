import React, { Component } from 'react';

// === Components === //
import { colors, Container, Paper } from '@mui/material';
import Page from '../../src/components/layout/Page';
import Breadcrumbs from '../../src/components/common/Breadcrumbs';
import PageHeader from '../../src/components/common/PageHeader';
import Tab from '../../src/components/common/Tab';
import DirectXTabView from '../../src/components/pages/admin-requirements/DirectXTabView';
import WindowsTabView from '../../src/components/pages/admin-requirements/WindowsTabView';

class requirements extends Component {
  render() {
    return (
      <Page seo={{ title: 'Wymagania sprzętowe', description: '' }} pageType="admin">
        <>
          <Breadcrumbs
            options={[
              { current: false, label: 'Strona główna', href: '/' },
              { current: true, label: 'Wymagania sprzętowe', href: '/admin/requirements' },
            ]}
          />
          <Container maxWidth="lg">
            <PageHeader title="Wymagania sprzętowe" />

            <Paper elevation={6} sx={{ backgroundColor: colors.grey[800], marginBottom: 4 }}>
              <Tab
                tabs={[
                  { header: 'DirectX', content: <DirectXTabView /> },
                  { header: 'Windows', content: <WindowsTabView /> },
                ]}
              />
            </Paper>
          </Container>
        </>
      </Page>
    );
  }
}

export default requirements;
