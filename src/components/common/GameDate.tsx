import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { colors, Typography } from '@mui/material';

// === Styles === //
import { customColors } from '../../styles/variables';

interface GameDateProps {
  data: DataData;
}

interface DataData {
  date: Date | string;
  platforms: string[];
}

const GameDate = ({ data }: GameDateProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: colors.grey[600],
        border: `1px solid ${customColors.textLight}`,
      }}
    >
      <Box
        sx={{
          padding: '5px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography color="white" variant="body2" component="p">
          {data.date}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
        }}
      >
        {data.platforms.map((platform: string, index: number) => (
          <Box
            key={index}
            sx={{
              borderLeft: `1px solid ${customColors.textLight}`,
              padding: '5px',
            }}
          >
            <Typography color="white" variant="body2" component="p">
              {platform}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GameDate;
