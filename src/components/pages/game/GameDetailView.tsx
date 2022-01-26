import React, { Component } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { colors, Container, Paper } from '@mui/material';
import Breadcrumbs from '../../common/Breadcrumbs';
import Tab from '../../common/Tab';
import GameDetailSidebar from './GameDetailSidebar';
import GameDetailContent from './GameDetailContent';
import Description from './content-sections/Description';
import Requirements from './content-sections/Requirements';
import DLC from './content-sections/DLC';

// === Types === //
import { GameDetailData } from '../../../types/games';

interface GameDetailViewProps {
  game: GameDetailData | null;
}

class GameDetailView extends Component<GameDetailViewProps> {
  state = {
    user: null,
  };

  componentDidMount() {
    this.handleCheckUserSession();
  }

  handleCheckUserSession = () => {
    this.setState({ userLoading: true }, () => {
      fetch(`/api/me`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((json) => {
          if (json && !json.error && json.user) {
            this.setState({ user: json.user });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  render() {
    const { game } = this.props;

    console.log(this.state.user);

    return (
      <Box>
        <Breadcrumbs
          options={[
            { current: false, label: 'Strona główna', href: '/' },
            {
              current: false,
              label: 'Biblioteka gier',
              href: `/games`,
            },
            {
              current: true,
              label: `${game ? (game.namePl && game.namePl !== '' ? game.namePl : game.name) : ''}`,
              href: game ? `/game/${game.id}` : '/',
            },
          ]}
        />

        <Container maxWidth="xl">
          <Paper
            elevation={6}
            sx={{ backgroundColor: colors.grey[800], marginBottom: 2, marginTop: 2 }}
          >
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
              <GameDetailSidebar game={game} />
              <GameDetailContent game={game} user={this.state.user} />
            </Box>
          </Paper>

          <Paper
            elevation={6}
            sx={{ backgroundColor: colors.grey[800], marginBottom: 4, marginTop: 2 }}
          >
            <Tab
              tabs={[
                { header: 'Opis', content: <Description description={game?.description} /> },
                {
                  header: 'Wymagania sprzętowe',
                  content: <Requirements requirements={game?.requirements} />,
                  disabled: game?.platforms
                    ? game.platforms.find((item) => item.code === 'PC')
                      ? false
                      : true
                    : true,
                },
                {
                  header: 'Dodatki',
                  content: <DLC />,
                  disabled: game?.dlc ? (game.dlc.length > 0 ? false : true) : true,
                },
              ]}
            />
          </Paper>
        </Container>
      </Box>
    );
  }
}

export default GameDetailView;
