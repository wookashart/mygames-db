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

    res.json(response);
  })
}