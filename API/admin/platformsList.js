const { queryPromise } = require('../utils');

module.exports = (req, res) => {
  const name = req.query.platform;
  const response = {};

  const where = name && name !== '' ? `WHERE p.platform_name LIKE "%${name}%" OR p.platform_code LIKE "%${name}%"` : '';

  queryPromise(`
    SELECT
      p.platform_id AS platform_id,
      p.platform_name AS platform_name,
      p.platform_sort_name AS platform_sort_name,
      p.platform_code AS platform_code,
      p.platform_producer AS platform_producer_id,
      p.platform_date AS platform_date,
      p.platform_description AS platform_description,
      pp.pproducer_name AS platform_producer
    FROM platforms AS p
    LEFT JOIN platform_producers AS pp
    ON p.platform_producer = pp.pproducer_id
    ${where}
    ORDER BY p.platform_sort_name ASC
  `)
  .then(({err, rows}) => {
    response.items = rows.map(row => {
      return Object.assign(row, {
        platform_date: row.platform_date === null || row.platform_date === '0000-00-00'
          ? null
          : row.platform_date
      })
    });
    response.error = err;

    res.json(response);
  })
}