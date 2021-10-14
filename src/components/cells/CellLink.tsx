import React from 'react';

// === Components === //
import { TableCell, Typography } from '@mui/material';
import Link from 'next/link';

// === Styles === //
import { animation, customColors } from '../../styles/variables';

interface CellLinkProps {
  label: string;
  href: string;
}

const CellLink = ({ label, href }: CellLinkProps) => {
  return (
    <TableCell>
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
    </TableCell>
  );
};

export default CellLink;
