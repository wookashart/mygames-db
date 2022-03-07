import React from 'react';

// === Components === //
import { Table, TableBody, TableContainer, TableRow } from '@mui/material';
import CellUserLibraryGameData from '../../cells/CellUserLibraryGameData';
import CellCover from '../../cells/CellCover';
import CellRatio from '../../cells/CellRatio';

// === Styles === //
import { animation } from '../../../styles/variables';

// === Types === //
import { UserLibraryGamesData } from '../../../types/users';

interface UserLibraryTableProps {
  items: UserLibraryGamesData[];
}

const UserLibraryTable = ({ items }: UserLibraryTableProps) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="dense-table">
        <TableBody>
          {items.map((item: UserLibraryGamesData) => {
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
                <CellUserLibraryGameData data={item} />
                <CellRatio ratio={item.userRatio || ''} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserLibraryTable;
