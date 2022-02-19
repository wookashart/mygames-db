import React from 'react';

// === Components === //
import { TableCell, Typography } from '@mui/material';
import Link from 'next/link';

// === Styles === //
import { animation, customColors } from '../../styles/variables';

interface CellLinkProps {
  label: string;
  href: string;
  type?: 'internal' | 'external';
}

const CellLink = ({ label, href, type = 'internal' }: CellLinkProps) => {
  return (
    <TableCell>
      {type === 'internal' ? (
        <Link href={href}>
          <a className="cellLink-link">
            <Typography
              color={customColors.textLight}
              sx={{
                display: 'inline-block',
                textDecoration: 'underline',
                transition: `${animation.fast}ms all ease-out`,
                ':hover': {
                  color: 'white',
                },
              }}
            >
              {label}
            </Typography>
          </a>
        </Link>
      ) : (
        <a href={href} className="cellLink-link" target="_blank" rel="noreferrer">
          <Typography
            color={customColors.textLight}
            sx={{
              display: 'inline-block',
              textDecoration: 'underline',
              transition: `${animation.fast}ms all ease-out`,
              ':hover': {
                color: 'white',
              },
            }}
          >
            {label}
          </Typography>
        </a>
      )}
    </TableCell>
  );
};

export default CellLink;
