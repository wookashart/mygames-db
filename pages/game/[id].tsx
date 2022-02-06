import React from 'react';

// === Components === //
import GameDetailMiddleware from '../../src/components/pages/game/GameDetailMiddleware';

// === Helpers === //
import { useRouter } from 'next/router';

const GameDetail = () => {
  const router = useRouter();

  return (
    <>
      <GameDetailMiddleware id={router.query.id || undefined} />
    </>
  );
};

export default GameDetail;
