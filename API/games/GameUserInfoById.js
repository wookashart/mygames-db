const { queryPromise } = require('../utils');

module.exports = (req, res) => {
  const gameId = req.params.gameId;
  const userId = req.params.userId;
  const response = {};

  queryPromise(`
    SELECT *
    FROM games_ratio
    WHERE gr_game_id = "${gameId}"
    AND gr_user_id = "${userId}"
  `)
  .then(({err, rows}) => {
    response.ratioError = err;
    response.ratio = rows && rows.length > 0 ? {
      ratio: rows[0].gr_ratio,
      date: rows[0].gr_date
    } : null;

    return queryPromise(`
      SELECT *
      FROM user_library
      WHERE ul_game_id = "${gameId}"
      AND ul_user_id = "${userId}"
    `)
  })
  .then(({err, rows}) => {
    response.libraryError = err;
    response.library = rows && rows.length > 0 ? rows.map(row => ({
      date: row.ul_date,
      platform: row.ul_platform_id,
      distribution: row.ul_distribution_id,
    })) : [];

    return queryPromise(`
      SELECT *
      FROM user_games_status
      WHERE ugs_game_id = "${gameId}"
      AND ugs_user_id = "${userId}"
    `)
  })
  .then(({err, rows}) => {
    response.statusError = err;
    response.status = rows && rows[0] ? {
      status: rows[0].ugs_status,
      statusDetail: rows[0].ugs_status_detail,
      date: rows[0].ugs_date,
      time: rows[0].ugs_time,
      favourite: rows[0].ugs_favourite === 0 ? false : true,
    } : null;
    
    res.json(response);
  })
  .catch(err => {
    response.error = err;
    res.json(response);
  })
}