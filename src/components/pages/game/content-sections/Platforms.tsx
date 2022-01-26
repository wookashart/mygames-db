import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { Chip } from '@material-ui/core';
import HtmlTooltip from '../../../common/HtmlTooltip';

// === Helpers === //
import dateFormat from 'dateformat';

// === Types === //
import { PlatformsData } from '../../../../types/games';

interface PlatformsProps {
  platforms: PlatformsData[];
}

const Platforms = ({ platforms }: PlatformsProps) => {
  return (
    <Box mt={2}>
      {platforms.map((platform) => (
        <Box key={platform.id} display="inline-block" mr="5px">
          <HtmlTooltip
            label={`<p><strong>${platform.name}${
              platform.producerName && platform.producerName !== ''
                ? `<span> (${platform.producerName})</span>`
                : ''
            }</strong>${
              platform.date && platform.date !== '0000-00-00'
                ? `<span> - ${dateFormat(platform.date, 'dd.mm.yyyy')}</span>`
                : ''
            }</p>${platform.description}`}
            placement="top"
          >
            <Chip
              label={platform.code}
              variant="outlined"
              component="a"
              href={`/games?platform=${platform.id}`}
              clickable
              color="primary"
            />
          </HtmlTooltip>
        </Box>
      ))}
    </Box>
  );
};

export default Platforms;
