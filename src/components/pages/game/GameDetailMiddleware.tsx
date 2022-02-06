import React, { Component } from 'react';

// === Components === //
import Page from '../../layout/Page';
import GameDetailView from './GameDetailView';

// === Types === //
import { GameDetailData } from '../../../types/games';

interface GameDetailMiddlewareProps {
  id: string | string[] | undefined;
}

class GameDetailMiddleware extends Component<GameDetailMiddlewareProps> {
  state = {
    loading: true,
    game: null as GameDetailData | null,
  };

  componentDidMount() {
    setTimeout(() => {
      this.getGameData();
    }, 200);
  }

  getGameData = () => {
    if (this.props.id) {
      this.setState({ loading: true }, () => {
        fetch(`/api/game/${this.props.id}`, {
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
                game: json.game ? json.game : null,
              });
            }
            this.setState({ loading: false });
          })
          .catch((error) => {
            this.setState({ loading: false });
            console.error(error);
          });
      });
    }
  };

  render() {
    const { game, loading } = this.state;

    return (
      <Page
        seo={{
          title: game ? (game.namePl && game.namePl !== '' ? game.namePl : game.name) : '',
          description: '',
        }}
        pageType="game"
      >
        <GameDetailView game={game} loading={loading} />
      </Page>
    );
  }
}

export default GameDetailMiddleware;
