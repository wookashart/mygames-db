// const { queryPromise } = require('../../utils');
const connection = require('../../database/connection');

module.exports = (req, res) => {
  const id = req.body.id;
  const response = {};

  connection.query(`
    DELETE FROM platform_distribution
    WHERE pd_id = "${id}"
  `, (err) => {
    response.deleted = true;
    response.errorMessage = '';
    response.error = err;

    res.json(response);
  })
}