import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import Tile from '../../common/Tile';

// === Types === //
import { GamesListData } from '../../../types/games';

interface GamesTilesProps {
  items: GamesListData[];
}

const GamesTiles = ({ items }: GamesTilesProps) => {
  return (
    <Box p={2}>
      <Grid container spacing={1}>
        {items.map((item) => {
          const imgSrc =
            item && item.cover && item.cover !== ''
              ? `/img/games/${item.cover}`
              : '/img/nocover.jpg';

          return (
            <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
              <Tile
                image={imgSrc}
                alt={item.name}
                title={item.namePl ? item.namePl : item.name}
                url={`/game/${item.id}`}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default GamesTiles;
