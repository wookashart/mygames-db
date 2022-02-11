const { queryPromise } = require('../../utils');

module.exports = (req, res) => {
  const response = {};

  queryPromise(`
    SELECT
      game_id,
      game_name,
      game_cover
    FROM games
    ORDER BY game_id DESC
    LIMIT 5
 `)
  .then(({err, rows}) => {
    response.error = err;
    response.lastAddedGames = rows.map(row => ({
      id: row.game_id,
      name: row.game_name,
      cover: row.game_cover
    }));

    return queryPromise(`
      SELECT
        dlc.dlc_id,
        dlc.dlc_name,
        dlc.dlc_cover,
        dlc.dlc_game_id,
        games.game_name
      FROM dlc
      LEFT JOIN games
      ON dlc.dlc_game_id = games.game_id
      ORDER BY dlc.dlc_id DESC
      LIMIT 5
    `)
  })
  .then(({err, rows}) => {
    response.error = err;
    response.lastAddedDLC = rows.map(row => ({
      id: row.dlc_id,
      gameId: row.dlc_game_id,
      gameName: row.game_name,
      cover: row.dlc_cover,
      name: row.dlc_name
    }));

    res.json(response);
  })
}