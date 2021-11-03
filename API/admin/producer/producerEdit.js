const { queryPromise } = require('../../utils');
const connection = require('../../database/connection');

module.exports = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const response = {};

  queryPromise(`
    SELECT *
    FROM producers
    WHERE producer_name = "${name}"
    AND producer_id != "${id}"
  `)
  .then(({err, rows}) => {
    const nameDuplicated = rows && rows.find(item => item.producer_name === name) ? true : false;

    if (nameDuplicated) {
      const errorMessage = 'Producent o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.';

      response.producer = null;
      response.edited = false;
      response.nameDuplicated = nameDuplicated;
      response.errorMessage = errorMessage;
      response.error = err;

      res.json(response);
    } else {
      connection.query(`
        UPDATE producers
        SET
          producer_name = "${name}",
          producer_description = "${description}"
        WHERE producer_id = "${id}"
      `, (err, rows) => {
        response.producer = rows;
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