import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { colors, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';

// === Styles === //
import { customColors } from '../../../styles/variables';

// === Types === //
import { GameDetailData } from '../../../types/games';

interface GameDetailSidebarProps {
  game: GameDetailData | null;
}

const GameDetailSidebar = ({ game }: GameDetailSidebarProps) => {
  const imgSrc =
    game && game.cover && game.cover !== '' ? `/img/games/${game.cover}` : '/img/nocover.jpg';

  return (
    <>
      <Box p={2}>
        <Box width="250px" textAlign="center" margin="auto">
          <img className="gameDetail-cover" src={imgSrc} alt={game ? game.name : ''} />
        </Box>
        <Box
          sx={{
            border: `1px solid ${colors.grey[700]}`,
          }}
          p={1}
          display="flex"
          alignItems="center"
        >
          <Star
            sx={{
              color: colors.orange[300],
              width: '35px',
              height: '35px',
              marginRight: '5px',
            }}
          />
          <Typography color={customColors.textLight} variant="h6" component="p">
            {game?.ratioInfo.ratio || '-'}
          </Typography>
          <Typography color={customColors.textLight} variant="subtitle2" component="p" ml={4}>
            ( głosów: {game?.ratioInfo.ratedCount || '0'} )
          </Typography>
        </Box>
      </Box>

      <style jsx>{`
        .gameDetail-cover {
          max-width: 100%;
          margin: auto;
        }
      `}</style>
    </>
  );
};

export default GameDetailSidebar;
