/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { colors, Paper, Typography } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import Slider from 'react-slick';
import Link from 'next/link';

// === Styles === //
import { animation } from '../../styles/variables';
import { Button } from '@mui/material';

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
  const slidesToShow = (number: number) => {
    let toShow = number;

    if (items.length > number) {
      toShow = number;
    } else {
      toShow = items.length;
    }

    return toShow;
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow(5),
    slidesToScroll: 1,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow(3),
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: slidesToShow(2),
          slidesToScroll: 1,
          initialSlide: 2,
          swipeToSlide: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: slidesToShow(1),
          slidesToScroll: 1,
          swipeToSlide: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Box pb={4}>
      <Slider {...settings}>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </Slider>
    </Box>
  );
};

const Item = ({ item }: CarouselItemProps) => {
  return (
    <>
      <Paper
        elevation={6}
        sx={{
          backgroundColor: 'transparent',
          overflow: 'hidden',
          maxWidth: '200px',
          margin: 'auto',
        }}
      >
        <Link href={item.linkUrl}>
          <a>
            <Box
              position="relative"
              sx={{
                maxWidth: '100%',
                margin: 'auto',
                '&:hover': {
                  '.title-wrapper': {
                    opacity: 1,
                  },
                },
              }}
            >
              <img className="slider-item__img" src={item.img} alt={item.title} />
              <Box
                className="title-wrapper"
                sx={{
                  backgroundColor: colors.grey[900],
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
                  sx={{ textAlign: 'center', padding: 2, fontSize: '16px', width: '100%' }}
                >
                  {item.title}
                </Typography>
              </Box>
            </Box>
          </a>
        </Link>
      </Paper>
      <style jsx>{`
        .slider-item__img {
          max-width: 100%;
        }
      `}</style>
    </>
  );
};

const arrowStyles = {
  borderRadius: '100%',
  height: '64px',
  width: '64px',
  position: 'absolute',
  top: '0',
  bottom: '0',
  margin: 'auto',
  zIndex: '1',
  transform: 'scale(0.7)',
};

const SamplePrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        ...arrowStyles,
        left: '-25px',
      }}
    >
      <NavigateBefore sx={{ color: 'white' }} />
    </Button>
  );
};

const SampleNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        ...arrowStyles,
        right: '-25px',
      }}
    >
      <NavigateNext />
    </Button>
  );
};

export default CarouselComponent;
