import React from 'react';

// === Components === //
import { Breadcrumbs, colors, Container, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

interface CustomBreadcrumbsProps {
  options: BreadcrumbsOptionsData[];
}

interface BreadcrumbsOptionsData {
  current: boolean;
  label: string;
  href: string;
}

const CustomBreadcrumbs = ({ options }: CustomBreadcrumbsProps) => {
  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: 1 }}>
        <Breadcrumbs aria-label="breadcrumb" separator="›" color="rgba(255, 255, 255, 0.7)">
          {options.map((item, index) => {
            if (item.current) {
              return (
                <Typography
                  key={index}
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="white"
                  fontSize={14}
                >
                  {item.label}
                </Typography>
              );
            } else {
              return (
                <Link href={item.href} key={index}>
                  <a className="breadcrumbs-link">
                    {index === 0 && <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
                    {item.label}
                  </a>
                </Link>
              );
            }
          })}
        </Breadcrumbs>
        <Divider
          sx={{
            marginTop: 1,
            marginBottom: 1,
            borderColor: colors.grey[700],
          }}
        />
      </Container>
      <style jsx>{`
        .breadcrumbs-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          display: flex;
          align-items: center;
          font-size: 14px;
        }

        .breadcrumbs-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default CustomBreadcrumbs;
