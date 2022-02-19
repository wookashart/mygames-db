const { queryPromise } = require('../../utils');

module.exports = (req, res) => {
  const name = req.query.producer;
  const response = {};

  const where = name && name !== '' ? `WHERE producer_name LIKE "%${name}%"` : '';

  queryPromise(`
    SELECT
      company_id AS id,
      company_name AS name,
      company_type AS type,
      company_www AS www,
      company_address AS address,
      company_logo AS logo,
      company_description AS description
    FROM companies
    ${where}
    ORDER BY company_name ASC
  `)
  .then(({err, rows}) => {
    response.items = rows.map(row => {
      const tTypes = [];
      const types = row.type.split('|');
      
      types.forEach(t => {
        if (t !== '') {
          tTypes.push(t)
        }
      });

      return {
        id: row.id,
        name: row.name,
        type: tTypes,
        www: row.www,
        address: row.address,
        logo: row.logo,
        description: row.description,
      }
    });
    response.error = err;

    res.json(response);
  })
}