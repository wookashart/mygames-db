import React, { useState } from 'react';

// === Components === //
import { Box } from '@mui/system';
import {
  colors,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Delete, Edit, MoreHoriz } from '@mui/icons-material';

// === Helpers === //
import dateFormat from 'dateformat';

// === Styles === //
import { customColors } from '../../../../styles/variables';

// === Types === //
import { GameDetailData } from '../../../../types/games';
import { UserData } from '../../../../types/users';

interface TitleProps {
  game: GameDetailData;
  user: UserData | null;
}

const Title = ({ game, user }: TitleProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box pr={10} position="relative">
      <Typography color="white" variant="h1" component="h1" fontSize="2rem">
        {game.namePl && game.namePl !== '' ? game.namePl : game.name}
      </Typography>
      {game.namePl && game.namePl !== '' ? (
        <Typography color={customColors.textLight} variant="subtitle2" component="p">
          {game.name}
        </Typography>
      ) : null}

      {user && user.type === 1 && (
        <Box position="absolute" top={0} right={0}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            color="primary"
            onClick={handleClick}
            sx={{
              border: `1px solid ${colors.blue[500]}`,
            }}
          >
            <MoreHoriz />
          </IconButton>

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
            <Box>
              <MenuItem
                sx={{
                  color: customColors.textLight,
                  ':hover': {
                    backgroundColor: colors.grey[600],
                  },
                }}
                onClick={() => console.log('edit modal opened')}
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
                onClick={() => console.log('delete modal opened')}
              >
                <ListItemIcon>
                  <Delete fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Usuń
              </MenuItem>
              <MenuItem
                sx={{
                  color: customColors.textLight,
                  ':hover': {
                    backgroundColor: colors.grey[600],
                  },
                }}
                onClick={() => console.log('dlc modal opened')}
              >
                <ListItemIcon>
                  <Delete fontSize="small" sx={{ color: customColors.textLight }} />
                </ListItemIcon>
                Dodaj DLC
              </MenuItem>

              <Divider
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
                  borderColor: colors.grey[700],
                }}
              />
              <Box px={2} py={1}>
                <Box display="flex">
                  <Typography
                    color={customColors.textLight}
                    variant="subtitle2"
                    component="p"
                    mr="5px"
                  >
                    Utworzono
                  </Typography>
                  <Typography color="white" variant="subtitle2" component="p">
                    {game.audit.createDate ? dateFormat(game.audit.createDate, 'dd.mm.yyyy') : '-'}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography
                    color={customColors.textLight}
                    variant="subtitle2"
                    component="p"
                    mr="5px"
                  >
                    przez
                  </Typography>
                  <Typography color="white" variant="subtitle2" component="p">
                    {game.audit.createBy.name}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography
                    color={customColors.textLight}
                    variant="subtitle2"
                    component="p"
                    mr="5px"
                  >
                    Ostatnio edytowano
                  </Typography>
                  <Typography color="white" variant="subtitle2" component="p">
                    {game.audit.editDate ? dateFormat(game.audit.editDate, 'dd.mm.yyyy') : '-'}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography
                    color={customColors.textLight}
                    variant="subtitle2"
                    component="p"
                    mr="5px"
                  >
                    przez
                  </Typography>
                  <Typography color="white" variant="subtitle2" component="p">
                    {game.audit.editBy.name}
                  </Typography>
                </Box>
              </Box>
              <Divider
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
                  borderColor: colors.grey[700],
                }}
              />
              <Box px={2} py={1}>
                <Box>
                  <Typography
                    color={customColors.textLight}
                    variant="subtitle2"
                    component="p"
                    mr="5px"
                  >
                    Nazwa do sortowania
                  </Typography>
                  <Typography color="white" variant="subtitle2" component="p">
                    {game.nameSort}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default Title;
