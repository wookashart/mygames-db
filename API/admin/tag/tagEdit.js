const { queryPromise } = require('../../utils');
const connection = require('../../database/connection');

module.exports = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const response = {};

  queryPromise(`
    SELECT *
    FROM tags
    WHERE tag_name = "${name}"
    AND tag_id != "${id}"
  `)
  .then(({err, rows}) => {
    const nameDuplicated = rows && rows.find(item => item.tag_name === name) ? true : false;

    if (nameDuplicated) {
      const errorMessage = 'Tag o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.';

      response.tag = null;
      response.edited = false;
      response.nameDuplicated = nameDuplicated;
      response.errorMessage = errorMessage;
      response.error = err;

      res.json(response);
    } else {
      connection.query(`
        UPDATE tags
        SET
          tag_name = "${name}",
          tag_description = "${description}"
        WHERE tag_id = "${id}"
      `, (err, rows) => {
        response.tag = rows;
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