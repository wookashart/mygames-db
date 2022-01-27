import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import Title from './content-sections/Title';
import Platforms from './content-sections/Platforms';
import Tags from './content-sections/Tags';
import Informations from './content-sections/Informations';
import UserFunctionalities from './content-sections/UserFunctionalities';

// === Types === //
import { GameDetailData, UserFunctionData } from '../../../types/games';
import { UserData } from '../../../types/users';

interface GameDetailContentProps {
  game: GameDetailData | null;
  user: UserData | null;
  userLoading: boolean;
  funcLoading: boolean;
  funcData: UserFunctionData | null;
  userRatio: number | null;
  handleSetRatio: Function;
  handleRequestRatio: Function;
}

const GameDetailContent = ({
  game,
  user,
  userLoading,
  funcLoading,
  funcData,
  userRatio,
  handleSetRatio,
  handleRequestRatio,
}: GameDetailContentProps) => {
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
          <UserFunctionalities
            funcLoading={funcLoading}
            funcData={funcData}
            user={user}
            userLoading={userLoading}
            userRatio={userRatio}
            handleSetRatio={handleSetRatio}
            handleRequestRatio={handleRequestRatio}
          />
        </Box>
      ) : null}
    </>
  );
};

export default GameDetailContent;
