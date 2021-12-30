const { queryPromise } = require('../../utils');
const connection = require('../../database/connection');

module.exports = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const response = {};

  queryPromise(`
    SELECT *
    FROM windows
    WHERE windows_name = "${name}"
    AND windows_id != "${id}"
  `)
  .then(({err, rows}) => {
    const nameDuplicated = rows && rows.find(item => item.windows_name === name) ? true : false;

    if (nameDuplicated) {
      const errorMessage = 'Windows o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.';

      response.windows = null;
      response.edited = false;
      response.nameDuplicated = nameDuplicated;
      response.errorMessage = errorMessage;
      response.error = err;

      res.json(response);
    } else {
      connection.query(`
        UPDATE windows
        SET
          windows_name = "${name}"
        WHERE windows_id = "${id}"
      `, (err, rows) => {
        response.windows = rows;
        response.edited = true;
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