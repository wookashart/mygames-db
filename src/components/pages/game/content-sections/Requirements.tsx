import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CellDefault from '../../../cells/CellDefault';

// === Styles === //
import { animation } from '../../../../styles/variables';

// === Types === //
import { GameRequirementsTypesData } from '../../../../types/games';

interface RequirementsProps {
  requirements: GameRequirementsTypesData | undefined;
}

const Requirements = ({ requirements }: RequirementsProps) => {
  return (
    <>
      {requirements && (
        <Box>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="dense-table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color="white" fontWeight="bold" textAlign="center"></Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="white" fontWeight="bold" textAlign="center">
                      Minimalne
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="white" fontWeight="bold" textAlign="center">
                      Rekomendowane
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    transition: `background-color ${animation.fast}ms ease-out`,
                    ':hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                  }}
                >
                  <CellDefault value="Procesor" color="white" />
                  <CellDefault value={requirements.min.cpu} />
                  <CellDefault value={requirements.recommended.cpu} />
                </TableRow>

                <TableRow
                  sx={{
                    transition: `background-color ${animation.fast}ms ease-out`,
                    ':hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                  }}
                >
                  <CellDefault value="Karta graficzna" color="white" />
                  <CellDefault value={requirements.min.gpu} />
                  <CellDefault value={requirements.recommended.gpu} />
                </TableRow>

                <TableRow
                  sx={{
                    transition: `background-color ${animation.fast}ms ease-out`,
                    ':hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                  }}
                >
                  <CellDefault value="Pamięć RAM" color="white" />
                  <CellDefault value={requirements.min.ram} />
                  <CellDefault value={requirements.recommended.ram} />
                </TableRow>

                <TableRow
                  sx={{
                    transition: `background-color ${animation.fast}ms ease-out`,
                    ':hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                  }}
                >
                  <CellDefault value="DirectX" color="white" />
                  <CellDefault value={requirements.min.directx?.name || ''} />
                  <CellDefault value={requirements.recommended.directx?.name || ''} />
                </TableRow>

                <TableRow
                  sx={{
                    transition: `background-color ${animation.fast}ms ease-out`,
                    ':hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                  }}
                >
                  <CellDefault value="System operacyjny" color="white" />
                  <CellDefault value={requirements.min.system?.name || ''} />
                  <CellDefault value={requirements.recommended.system?.name || ''} />
                </TableRow>

                <TableRow
                  sx={{
                    transition: `background-color ${animation.fast}ms ease-out`,
                    ':hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                  }}
                >
                  <CellDefault value="Miejsce na dysku" color="white" />
                  <CellDefault value={requirements.min.hdd} />
                  <CellDefault value={requirements.recommended.hdd} />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default Requirements;
