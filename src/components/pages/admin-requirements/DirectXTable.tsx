import React from 'react';

// === Components === //
import {
  colors,
  ListItemIcon,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CellDefault from '../../cells/CellDefault';
import CellMenu from '../../cells/CellMenu';

// === Styles === //
import { animation, customColors } from '../../../styles/variables';

// === Types === //
import { DirectXData } from '../../../types/admin';
import { Box } from '@mui/system';
import { Delete, Edit } from '@mui/icons-material';

interface DirectXTableProps {
  items: DirectXData[];
  handleOpenEditModal: Function;
  handleOpenDeleteModal: Function;
}

const DirectXTable = ({ items, handleOpenEditModal, handleOpenDeleteModal }: DirectXTableProps) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="dense-table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="white" fontWeight="bold" textAlign="center">
                Nazwa
              </Typography>
            </TableCell>
            <TableCell width={80}>
              <Typography color="white" fontWeight="bold" textAlign="center">
                Opcje
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row: DirectXData, index: number) => (
            <TableRow
              key={index}
              sx={{
                transition: `background-color ${animation.fast}ms ease-out`,
                ':hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              <CellDefault value={row.directx_name} />
              <CellMenu>
                <Box>
                  <MenuItem
                    sx={{
                      color: customColors.textLight,
                      ':hover': {
                        backgroundColor: colors.grey[600],
                      },
                    }}
                    onClick={() => handleOpenEditModal(row)}
                  >
                    <ListItemIcon>
                      <Edit fontSize="small" sx={{ color: customColors.textLight }} />
                    </ListItemIcon>
                    Edytuj
                  </MenuItem>
                  <MenuItem
                    sx={{
                      color: customColors.textLight,
                      ':hover': {
                        backgroundColor: colors.grey[600],
                      },
                    }}
                    onClick={() => handleOpenDeleteModal(row)}
                  >
                    <ListItemIcon>
                      <Delete fontSize="small" sx={{ color: customColors.textLight }} />
                    </ListItemIcon>
                    Usuń
                  </MenuItem>
                </Box>
              </CellMenu>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DirectXTable;
