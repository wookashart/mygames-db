import React from 'react';

// === Components === //
import Page from '../../src/components/layout/Page';
import GamesView from '../../src/components/pages/games/GamesView';

// === Helpers === //
import { useRouter } from 'next/router';
import * as utils from '../../src/utils';

const GamesListById = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Page seo={{ title: 'Biblioteka gier', description: '' }} pageType="games">
      <GamesView
        pageId={id ? Number(id) : undefined}
        filters={utils.getFiltersFromRouter(router.query)}
      />
    </Page>
  );
};

export default GamesListById;
