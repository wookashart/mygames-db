const { queryPromise } = require('../utils');
const connection = require('../database/connection');
const dateFormat = require('dateformat');

module.exports = (req, res) => {
  const userId = req.body.userId;
  const gameId = req.body.gameId;
  const platforms = req.body.platforms;
  const today = new Date();
  const response = {
    platforms: []
  };

  queryPromise(`
    SELECT *
    FROM user_library
    WHERE ul_game_id = "${gameId}"
    AND ul_user_id = "${userId}"
  `)
  .then(({err, rows}) => {
    const allPlatformsForGame = rows;
    let toDelete = [];
    let toCreate = [];
    let noChanges = [];
    let toCreateIndex = 0;
    let toDeleteIndex = 0;
    
    response.allError = err;

    if (allPlatformsForGame && allPlatformsForGame.length > 0) {
      platforms.forEach((item) => {
        if (allPlatformsForGame.find(el => el.ul_platform_id === item.platform && el.ul_distribution_id === item.distribution)) {
          noChanges.push(item);
        } else {
          toCreate.push(item);
        }
      })

      allPlatformsForGame.forEach(item => {
        if (!platforms.find(el => el.platform === item.ul_platform_id && el.distribution === item.ul_distribution_id)) {
          toDelete.push(item);
        }
      })
    } else {
      toCreate = platforms;
    } 

    toCreate.forEach(item => {
      toCreateIndex++;

      if (item.platform && item.distribution) {
        connection.query(`
          INSERT INTO user_library
          VALUES (
            null,
            "${gameId}",
            "${userId}",
            "${dateFormat(today, 'yyyy-mm-dd')}",
            "${item.platform}",
            "${item.distribution}"
          )
        `, (err, rows) => {
          const pPlatforms = response.platforms;
          const pPlatformsEdited = pPlatforms.push({
            error: err,
            platform: rows,
            created: true
          });

          response.platforms = pPlatformsEdited;
        })
      }
    })

    toDelete.forEach(item => {
      toDeleteIndex++;

      connection.query(`
        DELETE FROM user_library
        WHERE ul_id = "${item.ul_id}"
      `, (err, rows) => {
        response.deleteError = err;
        response.deleted = rows;
      })
    })

    response.toCreate = toCreate;
    response.toDelete = toDelete;

    if (toCreateIndex === toCreate.length && toDeleteIndex === toDelete.length) {
      res.json(response);
    }
  })
  .catch((err) => {
    response.error = err;
    res.json(response);
  })
}