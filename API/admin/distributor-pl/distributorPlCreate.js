const { queryPromise } = require('../../utils');
const connection = require('../../database/connection');

module.exports = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const response = {};

  queryPromise(`
    SELECT *
    FROM distributors_pl
    WHERE distributor_pl_name = "${name}"
  `)
  .then(({err, rows}) => {
    const nameDuplicated = rows && rows.find(item => item.distributor_pl_name === name) ? true : false;

    if (nameDuplicated) {
      const errorMessage = 'Polski wydawca o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.';

      response.distributor_pl = null;
      response.created = false;
      response.nameDuplicated = nameDuplicated;
      response.errorMessage = errorMessage;
      response.error = err;

      res.json(response);
    } else {
      connection.query(`
        INSERT INTO distributors_pl
        VALUES (
          null,
          "${name}",
          "${description}"
        )
      `, (err, rows) => {
        response.distributor_pl = rows;
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