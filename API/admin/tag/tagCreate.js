const { queryPromise } = require('../../utils');
const connection = require('../../database/connection');

module.exports = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const response = {};

  queryPromise(`
    SELECT *
    FROM tags
    WHERE tag_name = "${name}"
  `)
  .then(({err, rows}) => {
    const nameDuplicated = rows && rows.find(item => item.tag_name === name) ? true : false;

    if (nameDuplicated) {
      const errorMessage = 'Tag o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.';

      response.tag = null;
      response.created = false;
      response.nameDuplicated = nameDuplicated;
      response.errorMessage = errorMessage;
      response.error = err;

      res.json(response);
    } else {
      connection.query(`
        INSERT INTO tags
        VALUES (
          null,
          "${name}",
          "${description}"
        )
      `, (err, rows) => {
        response.platform = rows;
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