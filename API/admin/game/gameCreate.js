const slugify = require('slugify');
const dateFormat = require('dateformat');
const fs = require('fs');

const { queryPromise } = require('../../utils');
const connection = require('../../database/connection');

module.exports = (req, res) => {
  const name = req.body.name;
  const namePl = req.body.namePl;
  const nameSort = req.body.nameSort;
  const groupName = req.body.groupName;
  const firstDate = req.body.firstDate;
  const platforms = req.body.platforms;
  const tags = req.body.tags;
  const producer = req.body.producer;
  const distributor = req.body.distributor;
  const distributorPl = req.body.distributorPl;
  const earlyAccess = req.body.earlyAccess;
  const platformsDates = req.body.platformsDates;
  const cpuMin = req.body.cpuMin;
  const gpuMin = req.body.gpuMin;
  const ramMin = req.body.ramMin;
  const systemMin = req.body.systemMin;
  const directxMin = req.body.directxMin;
  const hddMin = req.body.hddMin;
  const cpuReccomended = req.body.cpuReccomended;
  const gpuReccomended = req.body.gpuReccomended;
  const ramReccomended = req.body.ramReccomended;
  const systemReccomended = req.body.systemReccomended;
  const directxReccomended = req.body.directxReccomended;
  const hddReccomended = req.body.hddReccomended;
  const description = req.body.description;
  const image = req.body.image;
  const userId = req.body.userId;
  const response = {};

  queryPromise(`
    SELECT *
    FROM games
    WHERE game_name = "${name}"
    OR game_name_sort = "${nameSort}"
  `)
  .then(({err, rows}) => {
    const nameDuplicated = rows && rows.find(item => item.game_name === name) ? true : false;
    const nameSortDuplicated = rows && rows.find(item => item.game_name_sort === nameSort) ? true : false;

    if (nameDuplicated || nameSortDuplicated) {
      const errorMessage = nameDuplicated
        ? 'Gra o takiej nazwie już istnieje! Zmień nazwę i spróbuj ponownie.'
        : 'Gra o takiej nazwie do sortowania już istnieje! Zmień nazwę do sortowania i spróbuj ponownie.';

      response.game = null;
      response.created = false;
      response.nameDuplicated = nameDuplicated;
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
      const tagsString = tags && tags.length > 0 ? `|${tags.map(tag => tag.value).join('|')}|` : '';

      connection.query(`
        INSERT INTO games
        VALUES (
          null,
          "${name}",
          "${namePl}",
          "${nameSort}",
          "${groupName}",
          "${platformsString}",
          "${earlyAccess}",
          "${firstDate ? firstDate : null}",
          "${tagsString}",
          "${producer}",
          "${distributor}",
          "${distributorPl}",
          "${description}",
          "${imageName}",
          "${cpuMin}",
          "${gpuMin}",
          "${ramMin}",
          "${systemMin}",
          "${directxMin}",
          "${hddMin}",
          "${cpuReccomended}",
          "${gpuReccomended}",
          "${ramReccomended}",
          "${systemReccomended}",
          "${directxReccomended}",
          "${hddReccomended}",
          "${dateFormat(now, 'yyyy-mm-dd')}",
          "${dateFormat(now, 'yyyy-mm-dd')}",
          "${userId}",
          "${userId}"
        )
      `, (err, rows) => {
        response.game = rows;
        response.created = true;
        response.nameDuplicated = false;
        response.nameSortDuplicated = false;
        response.errorMessage = '';
        response.error = err;

        if (image) {
          const dir = `./public/img/games`;
          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
          }
  
          const base64Image = image.split(';base64,').pop();

          fs.writeFile(
            `./public/img/games/${imageName}`,
            base64Image,
            {encoding: 'base64'},
            (err) => {
              response.fileCreated = err ? false : true;
              response.fileCreatedError = err;
  
              if (platformsDates && platformsDates.length > 0) {
                platformsDates.forEach((platform, index) => {
                  connection.query(`
                    INSERT INTO game_dates
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
                INSERT INTO game_dates
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