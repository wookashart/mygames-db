const { queryPromise } = require('../../utils');

module.exports = (req, res) => {
  const name = req.query.producer;
  const response = {};

  const where = name && name !== '' ? `WHERE producer_name LIKE "%${name}%"` : '';

  queryPromise(`
    SELECT
      producer_id,
      producer_name,
      producer_description
    FROM producers
    ${where}
    ORDER BY producer_name ASC
  `)
  .then(({err, rows}) => {
    response.items = rows;
    response.error = err;

    res.json(response);
  })
}