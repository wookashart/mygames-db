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
import { UserData } from '../../../types/users';
import { AddToLibrarySelectedItemsData } from '../../../types/forms';

interface GameDetailViewProps {
  game: GameDetailData | null;
}

class GameDetailView extends Component<GameDetailViewProps> {
  state = {
    user: null,
    userLoading: true,
    funcLoading: false,
    funcData: null,
    userRatio: null,
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
            this.setState({ user: json.user }, () => {
              this.handleLoadUserFunctionalities();
            });
          }
          this.setState({ userLoading: false });
        })
        .catch((error) => {
          this.setState({ userLoading: false });
          console.error(error);
        });
    });
  };

  handleLoadUserFunctionalities = () => {
    this.setState({ funcLoading: true }, () => {
      const user = this.state.user as UserData | null;

      if (this.props.game && user) {
        fetch(`/api/game-user-info/${this.props.game.id}/${user.id}`, {
          headers: {
            'Content-type': 'application/json',
          },
          method: 'GET',
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((json) => {
            if (json && !json.error) {
              this.setState({
                funcData: {
                  library: json.library,
                  ratio: json.ratio,
                  status: json.status,
                },
                userRatio: json.ratio ? json.ratio.ratio : null,
              });
            }
            this.setState({ funcLoading: false });
          })
          .catch((error) => {
            this.setState({ funcLoading: false });
            console.error(error);
          });
      }
    });
  };

  handleSetRatio = (value: number) => this.setState({ userRatio: value });
  handleRequestRatio = (handleButtonLoading: Function, handleCloseModal: Function) => {
    const user = this.state.user as UserData | null;

    if (user && this.props.game) {
      handleButtonLoading(true);

      const input = {
        userId: user.id,
        gameId: this.props.game?.id,
        ratio: this.state.userRatio,
      };

      fetch(`/api/game-ratio-set`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ ...input }),
      })
        .then((response) => response.json())
        .then((json) => {
          handleButtonLoading(false);

          if (json && !json.error) {
            this.handleLoadUserFunctionalities();
            handleCloseModal();
          }
        })
        .catch((error) => {
          handleButtonLoading(false);
          console.error(error);
        });
    }
  };

  handleRequestLibrary = (
    handleButtonLoading: Function,
    handleCloseModal: Function,
    selectedItems: AddToLibrarySelectedItemsData[]
  ) => {
    const user = this.state.user as UserData | null;
    const inputPlatforms: AddToLibrarySelectedItemsData[] = [];

    selectedItems.forEach((item) => {
      if (item.platform && item.distribution) {
        inputPlatforms.push(item);
      }
    });

    if (inputPlatforms.length > 0 && user) {
      const input = {
        userId: user.id,
        gameId: this.props.game?.id,
        platforms: inputPlatforms.map((item) => ({
          platform: item.platform?.value,
          distribution: item.distribution?.value,
        })),
      };

      fetch(`/api/user-library-manage`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ ...input }),
      })
        .then((response) => response.json())
        .then((json) => {
          handleButtonLoading(false);

          if (json && !json.error) {
            this.handleLoadUserFunctionalities();
            handleCloseModal();
          }
        })
        .catch((error) => {
          handleButtonLoading(false);
          console.error(error);
        });
    }
  };

  render() {
    const { game } = this.props;

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
              <GameDetailContent
                game={game}
                user={this.state.user}
                userLoading={this.state.userLoading}
                funcLoading={this.state.funcLoading}
                funcData={this.state.funcData}
                userRatio={this.state.userRatio}
                handleSetRatio={this.handleSetRatio}
                handleRequestRatio={this.handleRequestRatio}
                handleRequestLibrary={this.handleRequestLibrary}
              />
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
