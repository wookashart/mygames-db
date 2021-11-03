const { queryPromise } = require('../../utils');

module.exports = (req, res) => {
  const name = req.query.tag;
  const response = {};

  const where = name && name !== '' ? `WHERE distributor_name LIKE "%${name}%"` : '';

  queryPromise(`
    SELECT
      distributor_id,
      distributor_name,
      distributor_description
    FROM distributors
    ${where}
    ORDER BY distributor_name ASC
  `)
  .then(({err, rows}) => {
    response.items = rows;
    response.error = err;

    res.json(response);
  })
}