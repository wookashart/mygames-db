const { queryPromise } = require('../../utils');

module.exports = (req, res) => {
  const name = req.query.tag;
  const response = {};

  const where = name && name !== '' ? `WHERE tag_name LIKE "%${name}%"` : '';

  queryPromise(`
    SELECT
      tag_id,
      tag_name,
      tag_description
    FROM tags
    ${where}
    ORDER BY tag_name ASC
  `)
  .then(({err, rows}) => {
    response.items = rows;
    response.error = err;

    res.json(response);
  })
}