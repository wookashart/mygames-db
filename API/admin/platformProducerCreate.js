const { queryPromise } = require('../utils');
const connection = require('../database/connection');

module.exports = (req, res) => {
  const name = req.body.name;
  const response = {};

  queryPromise(`
    SELECT *
    FROM platform_producers
    WHERE pproducer_name = "${name}"
  `)
  .then(({ err, rows }) => {
    const nameDuplicated = rows && rows.find(item => item.pproducer_name === name) ? true : false;

    if (nameDuplicated) {
      response.producerData = null;
      response.producerCreated = false;
      response.nameDuplicated = nameDuplicated;
      response.errorMessage = 'Producent o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.';
      response.error = err;
      
      res.json(response);
    } else {
      connection.query(`
        INSERT INTO platform_producers
        VALUES (
          null,
          "${name}"
        )
      `, (err, rows) => {
        response.producerData = rows;
        response.producerCreated = true;
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