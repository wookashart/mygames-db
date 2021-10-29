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
import CellDate from '../../cells/CellDate';
import CellLink from '../../cells/CellLink';
import CellDescription from '../../cells/CellDescription';
import CellMenu from '../../cells/CellMenu';

// === Styles === //
import { animation, customColors } from '../../../styles/variables';

// === Types === //
import { PlatformsData } from '../../../types/admin';
import { Box } from '@mui/system';
import { Delete, Edit } from '@mui/icons-material';

interface PlatformsTableProps {
  items: PlatformsData[];
  handleOpenEditModal: Function;
  handleOpenDeleteModal: Function;
}

const PlatformsTable = ({
  items,
  handleOpenEditModal,
  handleOpenDeleteModal,
}: PlatformsTableProps) => {
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
                Nazwa do sortowania
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="white" fontWeight="bold" textAlign="center">
                Kod
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="white" fontWeight="bold" textAlign="center">
                Producent
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="white" fontWeight="bold" textAlign="center">
                Data
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="white" fontWeight="bold" textAlign="center">
                Opis
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="white" fontWeight="bold" textAlign="center">
                Opcje
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row: PlatformsData, index: number) => (
            <TableRow
              key={index}
              sx={{
                transition: `background-color ${animation.fast}ms ease-out`,
                ':hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              <CellLink label={row.platform_name} href={`/games?platform=${row.platform_id}`} />
              <CellDefault value={row.platform_sort_name} />
              <CellDefault value={row.platform_code} />
              <CellDefault value={row.platform_producer} />
              <CellDate value={row.platform_date} />
              <CellDescription value={row.platform_description} />
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

export default PlatformsTable;
