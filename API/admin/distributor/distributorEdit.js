const { queryPromise } = require('../../utils');
const connection = require('../../database/connection');

module.exports = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const response = {};

  queryPromise(`
    SELECT *
    FROM distributors
    WHERE distributor_name = "${name}"
    AND distributor_id != "${id}"
  `)
  .then(({err, rows}) => {
    const nameDuplicated = rows && rows.find(item => item.distributor_name === name) ? true : false;

    if (nameDuplicated) {
      const errorMessage = 'Wydawca o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.';

      response.distributor = null;
      response.edited = false;
      response.nameDuplicated = nameDuplicated;
      response.errorMessage = errorMessage;
      response.error = err;

      res.json(response);
    } else {
      connection.query(`
        UPDATE distributors
        SET
          distributor_name = "${name}",
          distributor_description = "${description}"
        WHERE distributor_id = "${id}"
      `, (err, rows) => {
        response.distributor = rows;
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