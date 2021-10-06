import React, { useState } from 'react';

// === Components === //
import Link from 'next/link';
import {
  AppBar,
  Box,
  Button,
  colors,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  Skeleton,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UserNavigation from './UserNavigation';
import AdminNavigation from './AdminNavigation';

// === Config === //
import { navigation } from '../../config/navigation';

// === Styles === //
import { useMediaQuery, useTheme } from '@material-ui/core';

// === Types === //
import { NavigationLinkData } from '../../types/layout';
import { UserData } from '../../types/users';

interface HeaderProps {
  pageType: string;
  userLoading: boolean;
  user: UserData | null;
  handleOpenLoginModal: Function;
  handleLogout: Function;
}

const Header = ({
  pageType,
  userLoading,
  user,
  handleOpenLoginModal,
  handleLogout,
}: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [menuOpen, toggleMenuOpen] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                padding: '0 !important',
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                {isMobile ? (
                  <>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                      onClick={() => toggleMenuOpen(true)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Drawer
                      anchor="top"
                      open={menuOpen}
                      onClose={() => toggleMenuOpen(false)}
                      variant="temporary"
                    >
                      <Box
                        sx={{ width: 'auto', backgroundColor: colors.grey[700] }}
                        role="presentation"
                      >
                        <List>
                          {navigation.map((item: NavigationLinkData) => (
                            <ListItem key={item.href}>
                              <Link href={item.href}>
                                <a className="navigation-link">
                                  <Button
                                    color="inherit"
                                    sx={{ justifyContent: 'flex-start' }}
                                    disabled={pageType === item.pageType ? true : false}
                                  >
                                    {item.label}
                                  </Button>
                                </a>
                              </Link>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Drawer>
                  </>
                ) : (
                  <>
                    {navigation.map((item: NavigationLinkData) => (
                      <Link href={item.href} key={item.href}>
                        <a className="navigation-link">
                          <Button
                            color="inherit"
                            disabled={pageType === item.pageType ? true : false}
                          >
                            {item.label}
                          </Button>
                        </a>
                      </Link>
                    ))}
                  </>
                )}
              </Box>

              {userLoading ? (
                <Skeleton variant="rectangular" width={200} height={20} />
              ) : (
                <>
                  {user ? (
                    <>
                      <UserNavigation user={user} handleLogout={handleLogout} />
                      {user.type === 1 && <AdminNavigation />}
                    </>
                  ) : (
                    <>
                      <Button color="inherit" onClick={() => handleOpenLoginModal()}>
                        Logowanie
                      </Button>
                      <Link href="/register">
                        <a className="navigation-link">
                          <Button color="inherit" disabled={pageType === 'register' ? true : false}>
                            Rejestracja
                          </Button>
                        </a>
                      </Link>
                    </>
                  )}
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <style jsx>{`
        .navigation-link {
          color: white;
          text-decoration: none;
        }
      `}</style>
    </>
  );
};

export default Header;
