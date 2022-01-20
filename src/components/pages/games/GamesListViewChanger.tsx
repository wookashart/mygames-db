import React from 'react';

// === Components === //
import { Box, Button, ButtonGroup, ButtonProps, colors } from '@mui/material';
import { List, ViewComfy } from '@mui/icons-material';

// === Styles === //
import { customColors } from '../../../styles/variables';
import { styled } from '@material-ui/styles';

interface GamesListViewChangerProps {
  activeItem: number;
}

const GamesListViewChanger = ({ activeItem }: GamesListViewChangerProps) => {
  const ColorButtonList = styled(Button)<ButtonProps>(() => ({
    backgroundColor: activeItem === 0 ? colors.blue[700] : colors.grey[700],
    transition: 'background-color 250ms ease-out',
    '&:hover': {
      backgroundColor: activeItem === 0 ? colors.blue[600] : colors.grey[600],
    },
  }));
  const ColorButtonTiles = styled(Button)<ButtonProps>(() => ({
    backgroundColor: activeItem === 1 ? colors.blue[700] : colors.grey[700],
    transition: 'background-color 250ms ease-out',
    '&:hover': {
      backgroundColor: activeItem === 1 ? colors.blue[600] : colors.grey[600],
    },
  }));

  return (
    <Box>
      <ButtonGroup variant="contained" aria-label="games list view changer">
        <ColorButtonList>
          <List
            sx={{
              color: activeItem === 0 ? 'white' : customColors.textLight,
              height: '30px',
              width: '30px',
            }}
          />
        </ColorButtonList>
        <ColorButtonTiles>
          <ViewComfy
            sx={{
              color: activeItem === 1 ? 'white' : customColors.textLight,
              height: '30px',
              width: '30px',
            }}
          />
        </ColorButtonTiles>
      </ButtonGroup>
    </Box>
  );
};

export default GamesListViewChanger;
