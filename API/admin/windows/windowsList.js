const { queryPromise } = require('../../utils');

module.exports = (req, res) => {
  const response = {};

  queryPromise(`
    SELECT
      windows_id,
      windows_name
    FROM windows
    ORDER BY windows_name ASC
  `)
  .then(({err, rows}) => {
    response.items = rows;
    response.error = err;

    res.json(response);
  })
}