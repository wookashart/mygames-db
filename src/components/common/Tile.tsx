import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import Link from 'next/link';
import { Typography } from '@mui/material';
import { animation } from '../../styles/variables';

interface TileProps {
  image: string;
  alt: string;
  title: string;
  url: string;
}

const Tile = ({ image, alt, title, url }: TileProps) => {
  return (
    <Box
      sx={{
        maxWidth: '200px',
        padding: 1,
        margin: 'auto',
      }}
    >
      <Link href={url}>
        <a>
          <Box
            position="relative"
            sx={{
              '&:hover': {
                '.title-wrapper': {
                  opacity: 1,
                },
              },
            }}
          >
            <img className="tile-image" src={image} alt={alt} title={title} />
            <style jsx>{`
              .tile-image {
                max-width: 100%;
              }
            `}</style>
            <Box
              className="title-wrapper"
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                opacity: 0,
                transition: `opacity ease-out ${animation.fast}ms`,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                color="white"
                sx={{
                  textAlign: 'center',
                  padding: 2,
                  fontSize: '16px',
                  width: '100%',
                }}
              >
                {title}
              </Typography>
            </Box>
          </Box>
        </a>
      </Link>
    </Box>
  );
};

export default Tile;
