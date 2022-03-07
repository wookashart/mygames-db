import React from 'react';

// === Components === //
import UserDetailView from '../../src/components/pages/user/UserDetailView';

// === Helpers === //
import { useRouter } from 'next/router';

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <UserDetailView userId={Number(id)} />;
};

export default UserPage;
