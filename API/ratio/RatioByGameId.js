const { queryPromise } = require('../utils');

module.exports = (req, res) => {
  const gameId = req.params.id;
  const response = {};

  queryPromise(`
    SELECT
      SUM(gr_ratio) AS ratioSum,
      COUNT(gr_ratio) AS totalCount
    FROM games_ratio
    WHERE gr_game_id = "${gameId}"
  `)
  .then(({err, rows}) => {
    const allRate = rows && rows.length ? rows[0] : null;

    response.totalCount = allRate && allRate.totalCount ? allRate.totalCount : 0;
    response.ratio =
      allRate
      && allRate.ratioSum
      && allRate.totalCount
      && allRate.totalCount > 0 
      ? allRate.ratioSum / allRate.totalCount
      : null;
    response.error = err;

    res.json(response);
  })
  .catch((err) => {
    response.error = err;
    res.json(response);
  })
}