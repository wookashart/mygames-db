import React, { useState } from 'react';

// === Components === //
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
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

// === Config === //
import { navigation } from '../../config/navigation';

// === Styles === //
import { useMediaQuery, useTheme } from '@material-ui/core';

// === Types === //
import { NavigationLinkData } from '../../types/layout';

interface HeaderProps {
  pageType: string;
}

const Header = ({ pageType }: HeaderProps) => {
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

              <Button color="inherit">Logowanie</Button>
              <Link href="/register">
                <a className="navigation-link">
                  <Button color="inherit" disabled={pageType === 'register' ? true : false}>
                    Rejestracja
                  </Button>
                </a>
              </Link>
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
