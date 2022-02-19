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
import CellMenu from '../../cells/CellMenu';
import CellCover from '../../cells/CellCover';
import CellDefault from '../../cells/CellDefault';
import CellListDefault from '../../cells/CellListDefault';

// === Styles === //
import { animation, customColors } from '../../../styles/variables';

// === Types === //
import { CompanyData } from '../../../types/admin';
import { Box } from '@mui/system';
import { Delete, Edit } from '@mui/icons-material';
import { DropdownOptionsData } from '../../../types/forms';

interface CompaniesTableProps {
  items: CompanyData[];
  handleOpenEditModal: Function;
  handleOpenDeleteModal: Function;
}

const CompaniesTable = ({
  items,
  handleOpenEditModal,
  handleOpenDeleteModal,
}: CompaniesTableProps) => {
  const companyTypes: DropdownOptionsData[] = [
    { title: 'Producent', value: 'producer' },
    { title: 'Wydawca', value: 'distributor' },
    { title: 'Wydawca PL', value: 'distributor_pl' },
  ];

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="dense-table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="white" fontWeight="bold" textAlign="center">
                Logo
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="white" fontWeight="bold" textAlign="center">
                Nazwa
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="white" fontWeight="bold" textAlign="center">
                Typ
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="white" fontWeight="bold" textAlign="center">
                Strona WWW
              </Typography>
            </TableCell>
            <TableCell width={200}>
              <Typography color="white" fontWeight="bold" textAlign="center">
                Adres
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
          {items.map((row: CompanyData, index: number) => (
            <TableRow
              key={index}
              sx={{
                transition: `background-color ${animation.fast}ms ease-out`,
                ':hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              {row.logo && row.logo !== '' ? (
                <CellCover cover={row.logo} alt={row.name} type="company" />
              ) : (
                <CellDefault value="" />
              )}
              <CellLink label={row.name} href={`/company/${row.id}`} />
              <CellListDefault
                value={row.type.map((t) => {
                  const companyType: DropdownOptionsData | undefined = companyTypes.find(
                    (item) => item.value === t
                  );

                  return companyType ? companyType.title : '';
                })}
              />
              <CellLink label={row.www} href={row.www} type="external" />
              <CellDefault value={row.address} />

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

export default CompaniesTable;
