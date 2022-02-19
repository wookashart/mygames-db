const slugify = require('slugify');
const dateFormat = require('dateformat');
const fs = require('fs');

const { queryPromise } = require('../../utils');
const connection = require('../../database/connection');

module.exports = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const www = req.body.www;
  const address = req.body.address;
  const type = req.body.type;
  const image = req.body.image;
  const userId = req.body.userId;
  const description = req.body.description;
  const response = {};

  queryPromise(`
    SELECT *
    FROM companies
    WHERE company_name = "${name}"
    AND company_id != "${id}"
  `)
  .then(({err, rows}) => {
    const nameDuplicated = rows && rows.find(item => item.company_name === name) ? true : false;

    if (nameDuplicated) {
      const errorMessage = 'Firma o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.';

      response.company = null;
      response.edited = false;
      response.nameDuplicated = nameDuplicated;
      response.errorMessage = errorMessage;
      response.error = err;

      res.json(response);
    } else {
      const slugifuOptions = {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: true,
        locale: 'en',
        trim: true
      }
      const now = new Date();
      const timestamp = dateFormat(now, 'yyyymmddHHMMss');
      const imageName = image
        ? `${slugify(name, slugifuOptions)}-${timestamp}.${image.split(';')[0].split('/')[1]}`
        : '';
      const typesString = type && type.length > 0 ? `|${type.map(t => t.value).join('|')}|` : '';

      connection.query(`
        UPDATE companies
        SET
          company_name = "${name}",
          company_type = "${typesString}",
          company_description = "${description}",
          company_www = "${www}",
          company_address = "${address}",
          company_logo = "${imageName}",
          company_edit_date = "${dateFormat(now, 'yyyy-mm-dd')}",
          company_edit_by = "${userId}"
        WHERE company_id = "${id}"
      `, (err, rows) => {
        response.company = rows;
        response.edited = true;
        response.nameDuplicated = nameDuplicated;
        response.errorMessage = '';
        response.error = err;

        if (image) {
          const dir = `./public/img/companies`;
          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
          }
  
          const base64Image = image.split(';base64,').pop();

          fs.writeFile(
            `./public/img/companies/${imageName}`,
            base64Image,
            {encoding: 'base64'},
            (err) => {
              response.fileCreated = err ? false : true;
              response.fileCreatedError = err;

              res.json(response);
            }
          );
        } else {
          res.json(response);
        }
      })
    }
  })
  .catch(error => {
    response.error = error;
    res.json(response);
  })
}