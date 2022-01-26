import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import ReactHtmlParser from 'react-html-parser';

// === Styles === //
import { customColors } from '../../../../styles/variables';

interface DescriptionProps {
  description: string | undefined;
}

const Description = ({ description }: DescriptionProps) => {
  return (
    <>
      <Box>
        <div className="game-description">{description ? ReactHtmlParser(description) : '-'}</div>
      </Box>
      <style jsx global>{`
        .game-description {
          color: ${customColors.textLight};
          font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
          font-weight: 300;
        }

        .game-description p {
          margin: 5px 0;
          line-height: 1.57;
          letter-spacing: 0.00714em;
        }

        .game-description h1 {
          font-weight: 500;
          line-height: 1.167;
          letter-spacing: -0.01562em;
          font-size: 2rem;
          margin: 15px 0;
        }

        .game-description h2 {
          font-weight: 500;
          font-size: 1.5rem;
          line-height: 1.167;
          letter-spacing: -0.01562em;
          margin: 15px 0;
        }
      `}</style>
    </>
  );
};

export default Description;
