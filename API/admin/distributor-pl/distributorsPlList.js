const { queryPromise } = require('../../utils');

module.exports = (req, res) => {
  const name = req.query.distributorPl;
  const response = {};

  const where = name && name !== '' ? `WHERE distributor_pl_name LIKE "%${name}%"` : '';

  queryPromise(`
    SELECT
      distributor_pl_id,
      distributor_pl_name,
      distributor_pl_description
    FROM distributors_pl
    ${where}
    ORDER BY distributor_pl_name ASC
  `)
  .then(({err, rows}) => {
    response.items = rows;
    response.error = err;

    res.json(response);
  })
}