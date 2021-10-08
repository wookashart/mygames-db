import React, { useState } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { Button, colors, Divider, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import {
  AdminPanelSettings,
  Article,
  Devices,
  Extension,
  Help,
  People,
  QueryStats,
  SportsEsports,
} from '@mui/icons-material';
import Link from 'next/link';

// === Styles === //
import { customColors } from '../../styles/variables';

const AdminNavigation = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <Button onClick={handleClick} color="inherit" size="small" sx={{ ml: 1 }}>
          <AdminPanelSettings />
          <Typography variant="overline" component="p" color="white" ml={1}>
            Admin
          </Typography>
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              backgroundColor: colors.grey[800],
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: colors.grey[800],
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Link href="/">
            <a className="adminNavigation-link">
              <MenuItem
                sx={{
                  ':hover': {
                    backgroundColor: colors.grey[600],
                  },
                }}
              >
                <ListItemIcon>
                  <QueryStats fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Statystyki
              </MenuItem>
            </a>
          </Link>

          <Divider
            sx={{
              marginTop: 1,
              marginBottom: 1,
              borderColor: colors.grey[700],
            }}
          />
          <Link href="/">
            <a className="adminNavigation-link">
              <MenuItem
                sx={{
                  ':hover': {
                    backgroundColor: colors.grey[600],
                  },
                }}
              >
                <ListItemIcon>
                  <SportsEsports fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Dodaj grę
              </MenuItem>
            </a>
          </Link>
          <Link href="/">
            <a className="adminNavigation-link">
              <MenuItem
                sx={{
                  ':hover': {
                    backgroundColor: colors.grey[600],
                  },
                }}
              >
                <ListItemIcon>
                  <Extension fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Dodaj DLC
              </MenuItem>
            </a>
          </Link>
          <Link href="/">
            <a className="adminNavigation-link">
              <MenuItem
                sx={{
                  ':hover': {
                    backgroundColor: colors.grey[600],
                  },
                }}
              >
                <ListItemIcon>
                  <Article fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Dodaj artykuł
              </MenuItem>
            </a>
          </Link>
          <Link href="/">
            <a className="adminNavigation-link">
              <MenuItem
                sx={{
                  ':hover': {
                    backgroundColor: colors.grey[600],
                  },
                }}
              >
                <ListItemIcon>
                  <Help fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Dodaj poradnik
              </MenuItem>
            </a>
          </Link>
          <Link href="/">
            <a className="adminNavigation-link">
              <MenuItem
                sx={{
                  ':hover': {
                    backgroundColor: colors.grey[600],
                  },
                }}
              >
                <ListItemIcon>
                  <People fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Użytkownicy
              </MenuItem>
            </a>
          </Link>

          <Divider
            sx={{
              marginTop: 1,
              marginBottom: 1,
              borderColor: colors.grey[700],
            }}
          />
          <Link href="/admin/platforms">
            <a className="adminNavigation-link">
              <MenuItem
                sx={{
                  ':hover': {
                    backgroundColor: colors.grey[600],
                  },
                }}
              >
                <ListItemIcon>
                  <Devices fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Platformy
              </MenuItem>
            </a>
          </Link>
        </Menu>
      </Box>
      <style jsx>{`
        .adminNavigation-link {
          text-decoration: none;
          color: ${customColors.textLight};
        }
      `}</style>
    </>
  );
};

export default AdminNavigation;
