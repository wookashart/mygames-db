const { queryPromise } = require('../../utils');

module.exports = (req, res) => {
  const response = {};

  queryPromise(`
    SELECT
      directx_id,
      directx_name
    FROM directx
    ORDER BY directx_name ASC
  `)
  .then(({err, rows}) => {
    response.items = rows;
    response.error = err;

    res.json(response);
  })
}