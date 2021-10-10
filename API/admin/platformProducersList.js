const { queryPromise } = require('../utils');

module.exports = (req, res) => {
  const response = {};

  queryPromise(`
    SELECT *
    FROM platform_producers
    ORDER BY pproducer_name ASC
  `)
  .then(({ err, rows }) => {
    response.items = rows;
    response.err = err;

    res.json(response);
  })
  .catch(error => {
    response.error = error;
    res.json(response);
  })
}