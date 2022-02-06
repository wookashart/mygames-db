import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import Carousel from '../../../common/Carousel';

// === Types === //
import { GameRelatedTitlesData } from '../../../../types/games';
import { Typography } from '@mui/material';

interface RelatedTitlesProps {
  list: GameRelatedTitlesData[];
}

const RelatedTitles = ({ list }: RelatedTitlesProps) => {
  return (
    <Box p={2}>
      <Typography textAlign="center" color="white" variant="h2" component="h2" fontSize="1.5rem">
        Podobne tytuły
      </Typography>

      <Box mt={2}>
        <Carousel
          items={list.map((item) => ({
            id: item.id,
            linkUrl: `/game/${item.id}`,
            img: item.cover && item.cover !== '' ? `/img/games/${item.cover}` : '/img/nocover.jpg',
            title: item.namePl && item.namePl !== '' ? item.namePl : item.name,
          }))}
        />
      </Box>
    </Box>
  );
};

export default RelatedTitles;
