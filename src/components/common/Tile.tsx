import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { colors, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import Link from 'next/link';

// === Styles === //
import { animation } from '../../styles/variables';

interface TileProps {
  image: string;
  alt: string;
  title: string;
  url: string;
  borderColor?: string;
  ratio?: number | null;
}

const Tile = ({ image, alt, title, url, borderColor = 'transparent', ratio = null }: TileProps) => {
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
              borderRadius: '5px',
              '&:hover': {
                '.title-wrapper': {
                  opacity: 1,
                },
              },
            }}
          >
            {borderColor && borderColor !== 'transparent' && (
              <Box
                sx={{
                  position: 'absolute',
                  left: '-2px',
                  bottom: '-2px',
                  width: '40px',
                  height: '40px',
                  overflow: 'hidden',
                  zIndex: 1,
                  boxShadow: '-8px 8px 8px -7px rgba(0, 0, 0, 0.8)',

                  '&::after': {
                    content: `""`,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                    borderWidth: ' 40px 0 0 40px',
                    borderColor: `transparent transparent transparent ${borderColor}`,
                  },
                }}
              />
            )}

            {ratio && ratio > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  zIndex: 1,
                }}
              >
                <Star
                  sx={{
                    color: colors.orange[300],
                    width: '70px',
                    height: '70px',
                  }}
                />
                <Typography
                  color={colors.grey[800]}
                  variant="h6"
                  component="p"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    margin: 'auto',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 0,
                    fontSize: '12px',
                  }}
                >
                  {ratio}
                </Typography>
              </Box>
            )}

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
