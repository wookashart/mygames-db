const { queryPromise } = require('../utils');
const connection = require('../database/connection');

module.exports = (req, res) => {
  const name = req.body.name;
  const sortName = req.body.sortName;
  const code = req.body.code;
  const producer = req.body.producer;
  const date = req.body.date;
  const description = req.body.description;

  const response = {};

  queryPromise(`
    SELECT *
    FROM platforms
    WHERE platform_name = "${name}"
    OR platform_sort_name = "${sortName}"
    OR platform_code = "${code}"
  `)
  .then(({err, rows}) => {
    const nameDuplicated = rows && rows.find(item => item.platform_name === name) ? true : false;
    const sortNameDuplicated = rows && rows.find(item => item.platform_sort_name === sortName) ? true : false;
    const codeDuplicated = rows && rows.find(item => item.platform_code === code) ? true : false;

    if (nameDuplicated || sortNameDuplicated || codeDuplicated) {
      let errorMessage = '';

      if (nameDuplicated) {
        errorMessage = 'Platforma o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.';
      } else if (sortNameDuplicated) {
        errorMessage = 'Ta nazwa do sortowania już istnieje! Zmień ją i spróbuj ponownie.';
      } else if (codeDuplicated) {
        errorMessage = 'Ten kod już istnieje! Zmień kod i spróbuj ponownie.';
      }

      response.platform = null;
      response.created = false;
      response.nameDuplicated = nameDuplicated;
      response.sortNameDuplicated = sortNameDuplicated;
      response.codeDuplicated = codeDuplicated;
      response.errorMessage = errorMessage;
      response.error = err;

      res.json(response);
    } else {
      connection.query(`
        INSERT INTO platforms
        VALUES (
          null,
          "${name}",
          "${sortName}",
          "${code}",
          "${producer}",
          "${date ? date : null}",
          "${description}"
        )
      `, (err, rows) => {
        response.platform = rows;
        response.created = true;
        response.nameDuplicated = nameDuplicated;
        response.sortNameDuplicated = sortNameDuplicated;
        response.codeDuplicated = codeDuplicated;
        response.errorMessage = '';
        response.error = err;

        res.json(response);
      })
    }
  })
  .catch(error => {
    response.error = error;
    res.json(response);
  })
}