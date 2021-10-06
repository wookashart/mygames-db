const passwordHash = require('password-hash');
const slugify = require('slugify');
const dateFormat = require('dateformat');
const fs = require('fs');

const { queryPromise } = require('../utils');
const connection = require('../database/connection');

module.exports = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender;
  const city = req.body.city;
  const birthday = req.body.birthday;
  const description = req.body.description;
  const image = req.body.image;

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
  const response = {};
  let usersCount = 0;

  queryPromise(`
    SELECT COUNT(*) AS usersCount
    FROM users
  `)
  .then(({ err, rows }) => {
    usersCount = Number(rows[0].usersCount);
    response.error = err;

    return queryPromise(`
      SELECT *
      FROM users
      WHERE user_name = "${name}"
      OR user_email = "${email}"
    `)
  })
  .then(({err, rows}) => {
    const nameDuplicated = rows && rows.find(item => item.user_name === name) ? true : false;
    const emailDuplicated = rows && rows.find(item => item.user_email === email) ? true : false;

    if (nameDuplicated || emailDuplicated) {
      response.userData = null;
      response.userCreated = false;
      response.nameDuplicated = nameDuplicated;
      response.emailDuplicated = emailDuplicated;
      response.errorMessage = nameDuplicated
        ? 'Użytkownik o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.'
        : emailDuplicated
          ? 'Podany email już istnieje w naszej bazie! Zmień email i spróbuj ponownie.'
          : '';
      response.error = err;
      res.json(response);
    } else {
      const imageName = image
        ? `${slugify(name, slugifuOptions)}-${timestamp}.${image.split(';')[0].split('/')[1]}`
        : null;

      connection.query(`
        INSERT INTO users
        VALUES (
          null,
          "${name}",
          "${email}",
          "${passwordHash.generate(password)}",
          "${usersCount === 0 ? 1 : 0}",
          "${city}",
          "${birthday ? birthday : null}",
          "${gender}",
          "${description}",
          "${imageName}",
          "${dateFormat(now, 'yyyy-mm-dd')}"
        )
      `, (err, rows) => {
        response.userData = rows;
        response.userCreated = true;
        response.nameDuplicated = false;
        response.emailDuplicated = false;
        response.errorMessage = '';
        response.error = err;

        if (image) {
          const dir = `./public/img/users`;
          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
          }
  
          const base64Image = image.split(';base64,').pop();
          fs.writeFile(
            `./public/img/users/${imageName}`,
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