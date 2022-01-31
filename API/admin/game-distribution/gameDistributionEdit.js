const { queryPromise } = require('../../utils');
const connection = require('../../database/connection');

module.exports = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const platforms = req.body.platforms;
  const response = {};

  queryPromise(`
    SELECT *
    FROM platform_distribution
    WHERE pd_name = "${name}"
    AND pd_id != "${id}"
  `)
  .then(({err, rows}) => {
    const nameDuplicated = rows && rows.find(item => item.pd_name === name) ? true : false;

    if (nameDuplicated) {
      const errorMessage = 'Rodzaj dystrybucji o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.';

      response.gameDistribution = null;
      response.edited = false;
      response.nameDuplicated = nameDuplicated;
      response.errorMessage = errorMessage;
      response.error = err;

      res.json(response);
    } else {
      const platformsString = platforms && platforms.length > 0 ? `|${platforms.map(platform => platform.value).join('|')}|` : '';

      connection.query(`
        UPDATE platform_distribution
        SET
          pd_name = "${name}",
          pd_platform_id = "${platformsString}"
        WHERE pd_id = "${id}"
      `, (err, rows) => {
        response.gameDistribution = rows;
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