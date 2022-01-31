import React, { useState } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { Button, colors, Divider, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import {
  AdminPanelSettings,
  Album,
  Article,
  Computer,
  Devices,
  DiscFull,
  Extension,
  Help,
  HomeWork,
  LocalOffer,
  People,
  QueryStats,
  SportsEsports,
  ShoppingCart,
} from '@mui/icons-material';
import Link from 'next/link';

// === Config === //
import { adminNavigation } from '../../config/navigation';

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
          <MenuItem
            sx={{
              padding: 0,
              ':hover': {
                backgroundColor: colors.grey[600],
              },
            }}
          >
            <Link href="/admin/stats">
              <a className="adminNavigation-link">
                <ListItemIcon>
                  <QueryStats fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Statystyki
              </a>
            </Link>
          </MenuItem>

          <Divider
            sx={{
              marginTop: 1,
              marginBottom: 1,
              borderColor: colors.grey[700],
            }}
          />
          <MenuItem
            sx={{
              padding: 0,
              ':hover': {
                backgroundColor: colors.grey[600],
              },
            }}
          >
            <Link href="/admin/create-game">
              <a className="adminNavigation-link">
                <ListItemIcon>
                  <SportsEsports fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Dodaj grę
              </a>
            </Link>
          </MenuItem>
          <MenuItem
            sx={{
              padding: 0,
              ':hover': {
                backgroundColor: colors.grey[600],
              },
            }}
          >
            <Link href="/">
              <a className="adminNavigation-link">
                <ListItemIcon>
                  <Extension fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Dodaj DLC
              </a>
            </Link>
          </MenuItem>
          <MenuItem
            sx={{
              padding: 0,
              ':hover': {
                backgroundColor: colors.grey[600],
              },
            }}
          >
            <Link href="/">
              <a className="adminNavigation-link">
                <ListItemIcon>
                  <Article fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Dodaj artykuł
              </a>
            </Link>
          </MenuItem>
          <MenuItem
            sx={{
              padding: 0,
              ':hover': {
                backgroundColor: colors.grey[600],
              },
            }}
          >
            <Link href="/">
              <a className="adminNavigation-link">
                <ListItemIcon>
                  <Help fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Dodaj poradnik
              </a>
            </Link>
          </MenuItem>
          <MenuItem
            sx={{
              padding: 0,
              ':hover': {
                backgroundColor: colors.grey[600],
              },
            }}
          >
            <Link href="/">
              <a className="adminNavigation-link">
                <ListItemIcon>
                  <People fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Użytkownicy
              </a>
            </Link>
          </MenuItem>

          <Divider
            sx={{
              marginTop: 1,
              marginBottom: 1,
              borderColor: colors.grey[700],
            }}
          />

          {adminNavigation.map((admin) => (
            <MenuItem
              key={admin.label}
              sx={{
                padding: 0,
                ':hover': {
                  backgroundColor: colors.grey[600],
                },
              }}
            >
              <Link href={admin.url}>
                <a className="adminNavigation-link">
                  <ListItemIcon>
                    {admin.icon === 'Devices' && (
                      <Devices fontSize="small" sx={{ color: customColors.textLight }} />
                    )}
                    {admin.icon === 'HomeWork' && (
                      <HomeWork fontSize="small" sx={{ color: customColors.textLight }} />
                    )}
                    {admin.icon === 'LocalOffer' && (
                      <LocalOffer fontSize="small" sx={{ color: customColors.textLight }} />
                    )}
                    {admin.icon === 'Album' && (
                      <Album fontSize="small" sx={{ color: customColors.textLight }} />
                    )}
                    {admin.icon === 'DiscFull' && (
                      <DiscFull fontSize="small" sx={{ color: customColors.textLight }} />
                    )}
                    {admin.icon === 'Computer' && (
                      <Computer fontSize="small" sx={{ color: customColors.textLight }} />
                    )}
                    {admin.icon === 'ShoppingCart' && (
                      <ShoppingCart fontSize="small" sx={{ color: customColors.textLight }} />
                    )}
                  </ListItemIcon>
                  {admin.label}
                </a>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <style jsx>{`
        .adminNavigation-link {
          text-decoration: none;
          color: ${customColors.textLight};
          padding: 6px 16px;
          display: flex;
          align-items: center;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default AdminNavigation;
