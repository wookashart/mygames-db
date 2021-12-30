const { queryPromise } = require('../../utils');
const connection = require('../../database/connection');

module.exports = (req, res) => {
  const name = req.body.name;
  const response = {};

  queryPromise(`
    SELECT *
    FROM directx
    WHERE directx_name = "${name}"
  `)
  .then(({err, rows}) => {
    const nameDuplicated = rows && rows.find(item => item.directx_name === name) ? true : false;

    if (nameDuplicated) {
      const errorMessage = 'DirectX o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.';

      response.directx = null;
      response.created = false;
      response.nameDuplicated = nameDuplicated;
      response.errorMessage = errorMessage;
      response.error = err;

      res.json(response);
    } else {
      connection.query(`
        INSERT INTO directx
        VALUES (
          null,
          "${name}"
        )
      `, (err, rows) => {
        response.directx = rows;
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