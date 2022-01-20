import React from 'react';

// === Components === //
import { Table, TableBody, TableContainer, TableRow } from '@mui/material';
import CellCover from '../../cells/CellCover';
import CellGameData from '../../cells/CellGameData';
import CellRatio from '../../cells/CellRatio';

// === Styles === //
import { animation } from '../../../styles/variables';

// === Types === //
import { GamesListData } from '../../../types/games';

interface GamesTableProps {
  items: GamesListData[];
}

const GamesTable = ({ items }: GamesTableProps) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="dense-table">
        <TableBody>
          {items.map((item: GamesListData) => {
            return (
              <TableRow
                key={item.id}
                sx={{
                  transition: `background-color ${animation.fast}ms ease-out`,
                  ':hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  },
                }}
              >
                <CellCover cover={item.cover} alt={item.name} />
                <CellGameData data={item} />
                {/* need API changes */}
                <CellRatio ratio={''} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GamesTable;
