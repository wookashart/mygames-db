const { queryPromise } = require('../utils');

module.exports = (req, res) => {
  const id = req.params.id;
  const response = {};

  queryPromise(`
    SELECT
      user_id AS id,
      user_name AS name,
      user_email AS email,
      user_type AS type,
      user_city AS city,
      user_birthday AS birthday,
      user_gender AS gender,
      user_description AS description
    FROM users
    WHERE user_id = "${id}"
  `)
  .then(({err, rows}) => {
    response.user = rows[0];
    response.error = err;

    res.json(response);
  })
}