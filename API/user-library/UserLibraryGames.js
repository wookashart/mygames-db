/* eslint-disable no-unused-vars */
const { queryPromise } = require('../utils');

module.exports = (req, res) => {
  const limit = 30;
  const userId = req.params.id;
  const pageId = req.query.pageId;
  const name = req.query.name;
  const response = {};

  let itemsData = [];

  // NEED TO REBUILD !!!!
  // const where = name && name !== '' ? `WHERE (g.game_name LIKE "%${name}%" OR g.game_name_pl LIKE %${name}%)` : '';
  const where = name && name !== '' ? `AND g.game_name LIKE "%${name}%"` : '';

  queryPromise(`
    SELECT
      ul.ul_id AS id,
      ul.ul_game_id AS gameId,
      ul.ul_date AS addDate,
      ul.ul_platform_id AS userPlatformId,
      ul.ul_distribution_id AS userDistributionId,
      g.game_name AS name,
      g.game_name_pl AS namePl,
      g.game_platforms AS platforms,
      g.game_early_access AS earlyAccess,
      g.game_first_date AS firstDate,
      g.game_tags AS tags,
      g.game_producer AS producerId,
      g.game_cover AS cover,
      gr.gr_ratio AS userRatio,
      gr.gr_date AS userRatioDate,
      ugs.ugs_status AS status,
      ugs.ugs_status_detail AS statusDetail,
      ugs.ugs_date AS statusDate,
      ugs.ugs_time AS playedTime,
      ugs.ugs_favourite AS favourite
    FROM user_library AS ul
    LEFT JOIN games as g
    ON ul.ul_game_id = g.game_id
    LEFT JOIN games_ratio AS gr
    ON gr.gr_user_id = ul.ul_user_id AND gr.gr_game_id = g.game_id
    LEFT JOIN user_games_status AS ugs
    ON ugs.ugs_game_id = ul.ul_game_id AND ugs.ugs_user_id = ul.ul_user_id
    WHERE ul.ul_user_id = "${userId}"
    ${where}
    ORDER BY g.game_name_sort ASC
  `)
  .then(({ err, rows }) => {
    const items = rows.map(item => {
      const fDate = item.firstDate;
      const sDate = item.statusDate;
      const rDate = item.userRatioDate;
      const aDate = item.addDate;

      return Object.assign(item, {
        firstDate: fDate !== null
          && fDate !== '0000-00-00'
          && item.earlyAccess !== 1
            ? fDate
            : null,
        statusDate: sDate !== null
          && sDate !== '0000-00-00'
            ? sDate
            : null,
        userRatioDate: rDate !== null
          && rDate !== '0000-00-00'
            ? rDate
            : null,
        addDate: aDate !== null
          && aDate !== '0000-00-00'
            ? aDate
            : null,
        earlyAccess: !item.earlyAccess || item.earlyAccess === 0 ? false : true,
        favourite: !item.favourite || item.favourite === 0 ? false : true,
        playedTime: !item.playedTime ? 0 : item.playedTime,
      });
    });
    itemsData = items;
    response.error = err;

    return queryPromise(`
      SELECT
        p.platform_id AS platform_id,
        p.platform_name AS platform_name,
        p.platform_code AS platform_code,
        p.platform_producer AS platform_producer,
        p.platform_date AS platform_date,
        p.platform_description AS platform_description,
        pp.pproducer_name AS pproducer_name
      FROM platforms AS p
      LEFT JOIN platform_producers AS pp
      ON p.platform_producer = pp.pproducer_id
    `)
  })
  .then(({ err, rows }) => {
    const gamesData = itemsData;

    gamesData.map(item => {
      const pPlatforms = [];
      const platforms = item.platforms ? item.platforms.split('|') : [];

      platforms.forEach(p => {
        if (p !== '') {
          pPlatforms.push(p)
        }
      });

      return Object.assign(item, {
        platforms: pPlatforms && pPlatforms.length > 0 ? pPlatforms.map(pp => {
          const ppId = Number(pp);
          const platformData = rows.find(item => item.platform_id === ppId);

          return {
            id: ppId,
            name: platformData.platform_name,
            code: platformData.platform_code,
            producerId: platformData.platform_producer,
            producerName: platformData.pproducer_name,
            date: platformData.platform_date === null ||
              platformData.platform_date === '0000-00-00'
                ? null
                : platformData.platform_date,
            description: platformData.platform_description,
          }
        }) : [],
      });
    })

    return queryPromise(`
      SELECT *
      FROM tags
    `)
  })
  .then(({ err, rows }) => {
    const gamesData = itemsData;

    gamesData.map(item => {
      const tTags = [];
      const tags = item.tags ? item.tags.split('|') : [];

      tags.forEach(p => {
        if (p !== '') {
          tTags.push(p)
        }
      });

      return Object.assign(item, {
        tags: tTags && tTags.length > 0 ? tTags.map(t => {
          const tId = Number(t);
          const tagsData = rows.find(item => item.tag_id === tId);

          return {
            id: tId,
            name: tagsData.tag_name,
            description: tagsData.tag_description
          }
        })  : []
      });
    });

    return queryPromise(`
      SELECT
        pd_id AS id,
        pd_name AS name
      FROM platform_distribution
    `)
  })
  .then(({ err,rows }) => {
    const noDuplicates = itemsData
    .filter((v, i, a) => a.findIndex(t => (t.gameId === v.gameId)) === i)
    .map(item => {
      const userLibrary = [];

      itemsData.forEach(iData => {
        if (iData.gameId === item.gameId) {
          const pPlatform = iData.platforms.find(p => p.id === iData.userPlatformId);

          userLibrary.push({
            distributionId: iData.userDistributionId,
            distributionName: rows.find(d => d.id === iData.userDistributionId).name,
            platform: pPlatform,
          });
        }
      });

      return Object.assign(item, {
        userLibrary
      });
    });

    response.totalCount = noDuplicates.length;
    response.items = noDuplicates.slice(limit * (pageId - 1), limit * pageId);

    res.json(response);
  })
  .catch(error => {
    response.error = error;
    res.json(response);
  });
}