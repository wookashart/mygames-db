/* eslint-disable no-unused-vars */
const { queryPromise } = require('../utils');

module.exports = (req, res) => {
  const name = req.query.name;
  const response = {};

  // ????
  // const where = name && name !== '' ? `WHERE game_name LIKE "%${name}%" OR game_name_pl LIKE %${name}%` : '';
  const where = name && name !== '' ? `WHERE game_name LIKE "%${name}%"` : '';

  queryPromise(`
    SELECT
      game_id AS id,
      game_name AS name,
      game_name_pl AS namePl
    FROM games
    ${where}
    ORDER BY game_name_sort ASC
    LIMIT 100
  `)
  .then(({err, rows}) => {
    response.items = rows;
    response.error = err;

    res.json(response);
  })
}