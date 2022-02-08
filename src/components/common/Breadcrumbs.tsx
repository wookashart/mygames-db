import React from 'react';

// === Components === //
import { Breadcrumbs, colors, Container, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

// === Styles === //
import { customColors } from '../../styles/variables';

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
      <Container maxWidth="lg" sx={{ marginTop: 1 }}>
        <Breadcrumbs aria-label="breadcrumb" separator="›" color={customColors.textLight}>
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
          color: ${customColors.textLight};
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
