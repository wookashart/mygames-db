/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

// === Components === //
import UserLibraryView from '../../../../src/components/pages/user-library/UserLibraryView';

// === Helpers === //
import { useRouter } from 'next/router';
import * as utils from '../../../../src/utils';

const UserLibraryPage = () => {
  const router = useRouter();
  const { id, libraryId } = router.query;

  return (
    <UserLibraryView
      userId={id ? Number(id) : 0}
      pageId={libraryId ? Number(libraryId) : 1}
      filters={utils.getFiltersFromRouter(router.query)}
    />
  );
};

export default UserLibraryPage;
