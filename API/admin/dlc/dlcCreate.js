const slugify = require('slugify');
const dateFormat = require('dateformat');
const fs = require('fs');
// const resizebase64 = require('resize-base64');

const { queryPromise } = require('../../utils');
const connection = require('../../database/connection');

module.exports = (req, res) => {
  const gameId = req.body.game;
  const name = req.body.name;
  const namePl = req.body.namePl;
  const nameSort = req.body.nameSort;
  const firstDate = req.body.firstDate;
  const platforms = req.body.platforms;
  const earlyAccess = req.body.earlyAccess;
  const platformsDates = req.body.platformsDates;
  const description = req.body.description;
  const image = req.body.image;
  const userId = req.body.userId;
  const response = {};

  queryPromise(`
    SELECT *
    FROM dlc
    WHERE dlc_name = "${name}"
    OR dlc_name_sort = "${nameSort}"
  `)
  .then(({err, rows}) => {
    const nameSortDuplicated = rows && rows.find(item => item.dlc_name_sort === nameSort) ? true : false;

    if (nameSortDuplicated) {
      const errorMessage = 'DLC o takiej nazwie do sortowania już istnieje! Zmień nazwę do sortowania i spróbuj ponownie.';

      response.dlc = null;
      response.created = false;
      response.nameDuplicated = false;
      response.nameSortDuplicated = nameSortDuplicated;
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

      const platformsString = platforms && platforms.length > 0 ? `|${platforms.map(platform => platform.value).join('|')}|` : '';

      connection.query(`
        INSERT INTO dlc
        VALUES (
          null,
          "${name}",
          "${namePl}",
          "${nameSort}",
          "${platformsString}",
          "${earlyAccess}",
          "${firstDate ? firstDate : null}",
          "${description}",
          "${imageName}",
          "${dateFormat(now, 'yyyy-mm-dd')}",
          "${dateFormat(now, 'yyyy-mm-dd')}",
          "${userId}",
          "${userId}",
          "${gameId}"
        )
      `, (err, rows) => {
        response.dlc = rows;
        response.created = true;
        response.nameDuplicated = false;
        response.nameSortDuplicated = false;
        response.errorMessage = '';
        response.error = err;

        if (image) {
          const dir = `./public/img/dlc`;
          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
          }
  
          const base64Image = image.split(';base64,').pop();

          fs.writeFile(
            `./public/img/dlc/${imageName}`,
            base64Image,
            {encoding: 'base64'},
            (err) => {
              response.fileCreated = err ? false : true;
              response.fileCreatedError = err;
  
              if (platformsDates && platformsDates.length > 0) {
                platformsDates.forEach((platform, index) => {
                  connection.query(`
                    INSERT INTO dlc_dates
                    VALUES (
                      null,
                      "${rows.insertId}",
                      "${platform.platformId}",
                      "${platform.date}"
                    )
                  `, () => {
                    if (index === platformsDates.length - 1) {
                      response.platformDatesAdded = true;

                      res.json(response);
                    }
                  })
                })
              } else {
                res.json(response);
              }
            }
          );
        } else {
          if (platformsDates && platformsDates.length > 0) {
            platformsDates.forEach((platform, index) => {
              connection.query(`
                INSERT INTO dlc_dates
                VALUES (
                  null,
                  "${rows.insertId}",
                  "${platform.platformId}",
                  "${platform.date}"
                )
              `, () => {
                if (index === platformsDates.length - 1) {
                  response.platformDatesAdded = true;

                  res.json(response);
                }
              })
            })
          } else {
            res.json(response);
          }
        }
      })
    }
  })
}