/* eslint-disable no-unused-vars */
const { queryPromise } = require('../utils');

module.exports = (req, res) => {
  const limit = 30;
  const pageId = req.query.pageId;
  const name = req.query.name;
  const response = {};

  // NEED TO REBUILD !!!!
  // const where = name && name !== '' ? `WHERE (g.game_name LIKE "%${name}%" OR g.game_name_pl LIKE %${name}%)` : '';
  const where = name && name !== '' ? `WHERE g.game_name LIKE "%${name}%"` : '';

  queryPromise(`
    SELECT
      g.game_id AS id,
      g.game_name AS name,
      g.game_name_pl AS namePl,
      g.game_platforms AS platforms,
      g.game_early_access AS earlyAccess,
      g.game_first_date AS firstDate,
      g.game_tags AS tags,
      g.game_producer AS producerId,
      g.game_cover AS cover,
      cp.company_name AS producerName
    FROM games AS g
    LEFT JOIN companies as cp
    ON g.game_producer = cp.company_id
    ${where}
    ORDER BY g.game_name_sort ASC
    LIMIT ${limit}
    OFFSET ${limit * (pageId - 1)}
  `)
  .then(({err, rows}) => {
    const items = rows.map(item => {
      const fDate = item.firstDate;

      return Object.assign(item, {
        firstDate: fDate !== null
          && fDate !== '0000-00-00'
          && item.earlyAccess !== 1
            ? fDate
            : null,
        earlyAccess: item.earlyAccess === 0 ? false : true,
      });
    });
    response.items = items;
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
  .then(({err, rows}) => {
    const gamesData = response.items;

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
  .then(({err, rows}) => {
    const gamesData = response.items;

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
    })

    return queryPromise(`
      SELECT
        COUNT(*) AS totalCount
      FROM games AS g
      ${where}
    `)
  })
  .then(({err, rows}) => {
    response.totalCount = rows[0].totalCount
    res.json(response);
  })
}