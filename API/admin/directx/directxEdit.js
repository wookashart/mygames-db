const { queryPromise } = require('../../utils');
const connection = require('../../database/connection');

module.exports = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const response = {};

  queryPromise(`
    SELECT *
    FROM directx
    WHERE directx_name = "${name}"
    AND directx_id != "${id}"
  `)
  .then(({err, rows}) => {
    const nameDuplicated = rows && rows.find(item => item.directx_name === name) ? true : false;

    if (nameDuplicated) {
      const errorMessage = 'DirectX o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.';

      response.directx = null;
      response.edited = false;
      response.nameDuplicated = nameDuplicated;
      response.errorMessage = errorMessage;
      response.error = err;

      res.json(response);
    } else {
      connection.query(`
        UPDATE directx
        SET
          directx_name = "${name}"
        WHERE directx_id = "${id}"
      `, (err, rows) => {
        response.directx = rows;
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