const { queryPromise } = require('../utils');
const connection = require('../database/connection');
const dateFormat = require('dateformat');

module.exports = (req, res) => {
  const userId = req.body.userId;
  const gameId = req.body.gameId;
  const status = req.body.status;
  const statusDetail = req.body.statusDetail;
  const time = req.body.time;
  const favourite = req.body.favourite;
  const today = new Date();
  const response = {};

  queryPromise(`
    SELECT *
    FROM user_games_status
    WHERE ugs_game_id = "${gameId}"
    AND ugs_user_id = "${userId}"
  `)
  .then(({error, rows}) => {
    response.error = error;

    if (rows && rows.length > 0) {
      if (status === 'notPlayed') {
        // delete
        connection.query(`
          DELETE FROM user_games_status
          WHERE ugs_game_id = "${gameId}"
          AND ugs_user_id = "${userId}"
        `, (err) => {
          response.deleted = true;
          response.error = err;

          res.json(response);
        })
      } else {
        // edit
        connection.query(`
          UPDATE user_games_status
          SET
            ugs_status = "${status}",
            ugs_status_detail = "${statusDetail}",
            ugs_date = "${dateFormat(today, 'yyyy-mm-dd')}",
            ugs_time = "${time}",
            ugs_favourite = "${favourite ? 1 : 0}"
          WHERE ugs_game_id = "${gameId}"
          AND ugs_user_id = "${userId}"
        `, (err, rows) => {
          response.edited = true;
          response.status = rows;
          response.error = err;

          res.json(response);
        })
      }
    } else {
      // create new
      connection.query(`
        INSERT INTO user_games_status
        VALUES (
          null,
          "${gameId}",
          "${userId}",
          "${status}",
          "${statusDetail}",
          "${dateFormat(today, 'yyyy-mm-dd')}",
          "${time}",
          "${favourite ? 1 : 0}"
        )
      `, (err, rows) => {
        response.created = true;
        response.status = rows;
        response.error = err;

        res.json(response);
      })
    }
  })
  .catch((err) => {
    response.error = err;
    res.json(response);
  })
}