import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

interface CarouselComponentProps {
  items: CarouselItemData[];
}

interface CarouselItemProps {
  item: CarouselItemData;
}

interface CarouselItemData {
  id: number;
  linkUrl: string;
  img: string;
  title: string;
}

const CarouselComponent = ({ items }: CarouselComponentProps) => {
  return (
    <Box>
      <Carousel animation="slide">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </Carousel>
    </Box>
  );
};

const Item = ({ item }: CarouselItemProps) => {
  return (
    <Paper>
      <h2>{item.title}</h2>
    </Paper>
  );
};

export default CarouselComponent;
