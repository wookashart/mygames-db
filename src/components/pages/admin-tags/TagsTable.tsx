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
import CellLink from '../../cells/CellLink';
import CellDescription from '../../cells/CellDescription';
import CellMenu from '../../cells/CellMenu';

// === Styles === //
import { animation, customColors } from '../../../styles/variables';

// === Types === //
import { TagData } from '../../../types/admin';
import { Box } from '@mui/system';
import { Delete, Edit } from '@mui/icons-material';

interface TagsTableProps {
  items: TagData[];
  handleOpenEditModal: Function;
  handleOpenDeleteModal: Function;
}

const TagsTable = ({ items, handleOpenEditModal, handleOpenDeleteModal }: TagsTableProps) => {
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
            <TableCell>
              <Typography color="white" fontWeight="bold" textAlign="center">
                Opis
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
          {items.map((row: TagData, index: number) => (
            <TableRow
              key={index}
              sx={{
                transition: `background-color ${animation.fast}ms ease-out`,
                ':hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              <CellLink label={row.tag_name} href={`/games?tag=${row.tag_id}`} />
              <CellDescription value={row.tag_description} />
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

export default TagsTable;
