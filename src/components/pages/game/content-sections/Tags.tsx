import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { colors, Link, Typography } from '@mui/material';
import HtmlTooltip from '../../../common/HtmlTooltip';

// === Styles === //
import { animation, customColors } from '../../../../styles/variables';

// === Types === //
import { TagsData } from '../../../../types/games';

interface TagsProps {
  tags: TagsData[];
}

const Tags = ({ tags }: TagsProps) => {
  const compare = (a: TagsData, b: TagsData) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  };

  return (
    <Box mt={2}>
      {tags.sort(compare).map((tag, index) => (
        <Box key={tag.id} display="inline-block" mr="10px">
          <HtmlTooltip label={tag.description} placement="top">
            <Box display="flex">
              <Link
                href={`/games?tag=${tag.id}`}
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  transition: `color ${animation.fast}ms ease-out`,
                  '&:hover': {
                    color: colors.blue[600],
                  },
                }}
                variant="subtitle2"
              >
                {tag.name}
              </Link>
              {index !== tags.length - 1 && (
                <Typography color={customColors.textLight} sx={{ marginLeft: '10px' }}>
                  |
                </Typography>
              )}
            </Box>
          </HtmlTooltip>
        </Box>
      ))}
    </Box>
  );
};

export default Tags;
