import React from 'react';

// === Components === //
import Page from '../../src/components/layout/Page';
import GameDetailView from '../../src/components/pages/game/GameDetailView';

// === Helpers === //
import fetch from 'cross-fetch';

// === Types === //
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GetServerSidePropsContext } from 'next';
import { GameDetailData } from '../../src/types/games';

interface GameDetailProps {
  id: number;
  game: GameDetailData | null;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;

  const gameRes = await fetch(`http://localhost:3000/api/game/${id}`, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'GET',
    credentials: 'include',
  });
  const gameData = await gameRes.json();

  return {
    props: {
      id: Number(id),
      game: gameData ? gameData.game : null,
    },
  };
};

const GameDetail = (props: GameDetailProps) => {
  const { game } = props;

  return (
    <Page
      seo={{
        title: game ? (game.namePl && game.namePl !== '' ? game.namePl : game.name) : '',
        description: '',
      }}
      pageType="game"
    >
      <GameDetailView game={game} />
    </Page>
  );
};

export default GameDetail;
