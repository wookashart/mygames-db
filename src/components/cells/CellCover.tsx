import React from 'react';

// === Components === //
import { colors, TableCell } from '@mui/material';
import Img from 'react-cool-img';

interface CellCoverProps {
  cover: string;
  alt: string;
}

const CellCover = ({ cover, alt }: CellCoverProps) => {
  const imageSrc = cover && cover !== '' ? `/img/games/${cover}` : '/img/nocover.jpg';

  return (
    <TableCell width={100}>
      <Img
        src={imageSrc}
        alt={alt}
        style={{ backgroundColor: colors.grey[500], width: '80', height: '110' }}
        width={80}
      />
    </TableCell>
  );
};

export default CellCover;
