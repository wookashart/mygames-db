const { queryPromise } = require('../../utils');

module.exports = (req, res) => {
  const name = req.query.game_distribution;
  const response = {};
  let platforms = [];

  const where = name && name !== '' ? `WHERE pd_name LIKE "%${name}%"` : '';

  queryPromise(`
    SELECT
      platform_id,
      platform_name,
      platform_sort_name,
      platform_code
    FROM platforms
  `)
  .then(({err, rows}) => {
    platforms = rows;
    response.error = err;

    return queryPromise(`
      SELECT
        pd_id,
        pd_name,
        pd_platform_id
      FROM platform_distribution
      ${where}
      ORDER BY pd_name ASC
    `)

  })
  .then(({err, rows}) => {
    response.error = err;
    const items = rows;
    let itemsTransformed = [];
    
    itemsTransformed = items.map(item => {
      let ppArr = [];

      if (item && item.pd_platform_id && item.pd_platform_id !== '') {
        const pp = item.pd_platform_id.split('|');
      
        pp.forEach(p => {
          if (p !== '') {
            ppArr.push(Number(p))
          }
        });
      }

      ppArr = ppArr.map(id => {
        const platform = platforms.find(item => item.platform_id === id);

        return {
          id: id,
          name: platform.platform_name,
          code: platform.platform_code,
        }
      })

      return {
        id: item.pd_id,
        name: item.pd_name,
        platforms: ppArr
      }
    });

    response.items = itemsTransformed;
    
    res.json(response);
  })
}