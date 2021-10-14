import React, { useState } from 'react';

// === Components === //
import { Box } from '@mui/system';

// === Styles === //
import { customColors } from '../../styles/variables';

// === Types === //
import { UserData } from '../../types/users';
import {
  Avatar,
  Button,
  colors,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { AccountCircle, Logout, Settings } from '@mui/icons-material';
import Link from 'next/link';

interface UserNavigationProps {
  user: UserData;
  handleLogout: Function;
}

const UserNavigation = ({ user, handleLogout }: UserNavigationProps) => {
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
        <Button onClick={handleClick} color="inherit" size="small">
          {user.avatar && user.avatar !== '' ? (
            <Avatar sx={{ width: 32, height: 32 }} src={`/img/users/${user.avatar}`} />
          ) : (
            <Avatar sx={{ width: 32, height: 32 }} />
          )}

          <Typography variant="overline" component="p" color="white" ml={1}>
            {user.name}
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
            <Link href="/">
              <a className="userNavigation-link">
                <ListItemIcon>
                  <AccountCircle fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Profil
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
            <Link href="/">
              <a className="userNavigation-link">Moja kolekcja</a>
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
              <a className="userNavigation-link">Ukończone</a>
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
              <a className="userNavigation-link">Porzucone</a>
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
              <a className="userNavigation-link">Pominięte</a>
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
            <Link href="/">
              <a className="userNavigation-link">
                <ListItemIcon>
                  <Settings fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Edytuj profil
              </a>
            </Link>
          </MenuItem>
          <MenuItem
            sx={{
              color: customColors.textLight,
              ':hover': {
                backgroundColor: colors.grey[600],
              },
            }}
            onClick={() => handleLogout()}
          >
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: customColors.textLight }} />
            </ListItemIcon>
            Wyloguj się
          </MenuItem>
        </Menu>
      </Box>
      <style jsx>{`
        .userNavigation-link {
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

export default UserNavigation;
