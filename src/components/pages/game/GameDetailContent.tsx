import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import Title from './content-sections/Title';
import Platforms from './content-sections/Platforms';
import Tags from './content-sections/Tags';
import Informations from './content-sections/Informations';

// === Types === //
import { GameDetailData } from '../../../types/games';
import { UserData } from '../../../types/users';

interface GameDetailContentProps {
  game: GameDetailData | null;
  user: UserData | null;
}

const GameDetailContent = ({ game, user }: GameDetailContentProps) => {
  return (
    <>
      {game ? (
        <Box p={2} flex={1}>
          <Title game={game} user={user} />
          {game.platforms && game.platforms.length ? (
            <Platforms platforms={game.platforms} />
          ) : null}
          {game.tags && game.tags.length ? <Tags tags={game.tags} /> : null}
          <Informations game={game} />
        </Box>
      ) : null}
    </>
  );
};

export default GameDetailContent;
