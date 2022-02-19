import React from 'react';

// === Components === //
import { colors, TableCell } from '@mui/material';
import Img from 'react-cool-img';

interface CellCoverProps {
  cover: string;
  alt: string;
  type?: 'game' | 'dlc' | 'company';
}

const CellCover = ({ cover, alt, type = 'game' }: CellCoverProps) => {
  let imageSrc = '';

  if (type === 'game') {
    imageSrc = cover && cover !== '' ? `/img/games/${cover}` : '/img/nocover.jpg';
  } else if (type === 'company') {
    imageSrc = cover && cover !== '' ? `/img/companies/${cover}` : '/img/nocover.jpg';
  }

  const style = {
    backgroundColor: colors.grey[500],
    width: '80',
    height: type === 'company' ? '80' : '110',
  };

  return (
    <TableCell width={100}>
      <Img src={imageSrc} alt={alt} style={style} width={80} />
    </TableCell>
  );
};

export default CellCover;
