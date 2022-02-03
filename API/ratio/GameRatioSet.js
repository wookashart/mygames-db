const { queryPromise } = require('../utils');
const connection = require('../database/connection');

const dateFormat = require('dateformat');

module.exports = (req, res) => {
  const userId = req.body.userId;
  const gameId = req.body.gameId;
  const ratio = req.body.ratio;
  const response = {};

  const today = new Date();

  queryPromise(`
    SELECT *
    FROM games_ratio
    WHERE gr_game_id = "${gameId}"
    AND gr_user_id = "${userId}"
  `)
  .then(({err, rows}) => {
    if (!err && rows && rows.length === 0 && ratio !== null) {
      // create new ratio

      connection.query(`
        INSERT INTO games_ratio
        VALUES (
          null,
          "${gameId}",
          "${userId}",
          "${ratio}",
          "${dateFormat(today, 'yyyy-mm-dd')}"
        )
      `, (err, rows) => {
        response.error = err;
        response.ratio = rows;

        res.json(response);
      })
    } else if (!err && rows && rows.length > 0 && ratio !== null) {
      // edit ratio

      connection.query(`
        UPDATE games_ratio
        SET
          gr_ratio = "${ratio}",
          gr_date = "${dateFormat(today, 'yyyy-mm-dd')}"
        WHERE gr_game_id = "${gameId}"
        AND gr_user_id = "${userId}"
      `, (err, rows) => {
        response.error = err;
        response.ratio = rows;

        res.json(response);
      })
    } else if (!err && rows && rows.length > 0 && ratio === null) {
      // delete ratio

      connection.query(`
        DELETE FROM games_ratio
        WHERE gr_game_id = "${gameId}"
        AND gr_user_id = "${userId}"
      `, (err, rows) => {
        response.error = err;
        response.ratio = rows;

        res.json(response);
      })
    } else {
      // error
      response.error = 'Niestety coś poszło nie tak! Spróbuj ponownie.'
      response.ratio = null;
      res.json(response);
    }
  })
}