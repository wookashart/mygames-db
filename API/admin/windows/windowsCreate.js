const { queryPromise } = require('../../utils');
const connection = require('../../database/connection');

module.exports = (req, res) => {
  const name = req.body.name;
  const response = {};

  queryPromise(`
    SELECT *
    FROM windows
    WHERE windows_name = "${name}"
  `)
  .then(({err, rows}) => {
    const nameDuplicated = rows && rows.find(item => item.windows_name === name) ? true : false;

    if (nameDuplicated) {
      const errorMessage = 'Windows o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.';

      response.windows = null;
      response.created = false;
      response.nameDuplicated = nameDuplicated;
      response.errorMessage = errorMessage;
      response.error = err;

      res.json(response);
    } else {
      connection.query(`
        INSERT INTO windows
        VALUES (
          null,
          "${name}"
        )
      `, (err, rows) => {
        response.windows = rows;
        response.created = true;
        response.nameDuplicated = nameDuplicated;
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