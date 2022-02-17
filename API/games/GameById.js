const { queryPromise } = require('../utils');

module.exports = (req, res) => {
  const id = req.params.id;
  const response = {};
  let allPlatforms = [];
  let groupName = '';

  queryPromise(`
    SELECT *
    FROM games
    WHERE game_id = "${id}"
  `)
  .then(({err, rows}) => {
    const gData = rows && rows.length ? rows[0] : null;
    groupName = gData && gData.game_group ? gData.game_group : '';
    response.error = err;

    const pPlatforms = [];
    const tTags = [];

    if (gData && gData.game_platforms && gData.game_platforms !== '') {
      const platforms = gData.game_platforms.split('|');
      
      platforms.forEach(p => {
        if (p !== '') {
          pPlatforms.push(Number(p))
        }
      });
    }
    
    if (gData && gData.game_tags && gData.game_tags !== '') {
      const tags = gData.game_tags.split('|');
      
      tags.forEach(p => {
        if (p !== '') {
          tTags.push(Number(p))
        }
      });
    }

    response.game = gData ? {
      id: gData.game_id,
      name: gData.game_name,
      namePl: gData.game_name_pl,
      nameSort: gData.game_name_sort,
      earlyAccess: gData.game_early_access === 0 ? false : true,
      firstDate: gData.game_first_date !== '0000-00-00' ? gData.game_first_date : null,
      cover: gData.game_cover,
      description: gData.game_description,
      requirements: {
        min: {
          cpu: gData.game_min_cpu,
          gpu: gData.game_min_gpu,
          ram: gData.game_min_ram,
          directx: gData.game_min_directx !== 0 ? {
            id: gData.game_min_directx
          } : null,
          system: gData.game_min_system !== 0 ? {
            id: gData.game_min_system
          } : null,
          hdd: gData.game_min_hdd
        },
        recommended: {
          cpu: gData.game_recommended_cpu,
          gpu: gData.game_recommended_gpu,
          ram: gData.game_recommended_ram,
          directx: gData.game_recommended_directx !== 0 ? {
            id: gData.game_recommended_directx
          } : null,
          system: gData.game_recommended_system !== 0 ? {
            id: gData.game_recommended_system
          } : null,
          hdd: gData.game_recommended_hdd
        },
      },
      audit: {
        createDate: gData.game_create_date,
        createBy: {
          id: gData.game_create_by,
          name: ''
        },
        editDate: gData.game_edit_date,
        editBy: {
          id: gData.game_edit_by,
          name: ''
        }
      },
      producer: gData.game_producer !== 0 ? {
        id: gData.game_producer
      } : null,
      distributor: gData.game_distributor !== 0 ? {
        id: gData.game_distributor
      } : null,
      distributorPl: gData.game_distributor_pl !== 0 ? {
        id: gData.game_distributor_pl
      } : null,
      platforms: pPlatforms,
      tags: tTags,
      related: [],

      // Temp hardcoded
      dlc: [],
    } : null;

    return queryPromise(`
      SELECT
        user_name,
        user_id
      FROM users
      WHERE user_id = "${response.game.audit.createBy.id}"
      OR user_id = "${response.game.audit.editBy.id}"
    `)
  })
  .then(({err, rows}) => {
    if (!err) {
      response.game.audit.createBy.name
        = rows.find(item => item.user_id === response.game.audit.createBy.id).user_name;
      response.game.audit.editBy.name
        = rows.find(item => item.user_id === response.game.audit.editBy.id).user_name;
    }

    return queryPromise(`
      SELECT
        producer_id,
        producer_name,
        producer_description
      FROM producers
      WHERE producer_id = "${response.game.producer ? response.game.producer.id : 0}"
    `)
  })
  .then(({err, rows}) => {
    const producer = rows && rows.length ? rows[0] : null;

    if (producer && !err) {
      response.game.producer.name = producer.producer_name;
      response.game.producer.description = producer.producer_description;
    }

    return queryPromise(`
      SELECT
        distributor_id,
        distributor_name,
        distributor_description
      FROM distributors
      WHERE distributor_id = "${response.game.distributor ? response.game.distributor.id : 0}"
    `)
  })
  .then(({err, rows}) => {
    const distributor = rows && rows.length ? rows[0] : null;

    if (distributor && !err) {
      response.game.distributor.name = distributor.distributor_name;
      response.game.distributor.description = distributor.distributor_description;
    }

    return queryPromise(`
      SELECT
        distributor_pl_id,
        distributor_pl_name,
        distributor_pl_description
      FROM distributors_pl
      WHERE distributor_pl_id = "${response.game.distributorPl ? response.game.distributorPl.id : 0}"
    `)
  })
  .then(({err, rows}) => {
    const distributorPl = rows && rows.length ? rows[0] : null;

    if (distributorPl && !err) {
      response.game.distributorPl.name = distributorPl.distributor_pl_name;
      response.game.distributorPl.description = distributorPl.distributor_pl_description;
    }

    return queryPromise(`
      SELECT
        p.platform_id AS platform_id,
        p.platform_name AS platform_name,
        p.platform_sort_name AS platform_sort_name,
        p.platform_code AS platform_code,
        p.platform_producer AS platform_producer_id,
        p.platform_date AS platform_date,
        p.platform_description AS platform_description,
        pp.pproducer_name AS platform_producer
      FROM platforms AS p
      LEFT JOIN platform_producers AS pp
      ON p.platform_producer = pp.pproducer_id
      ORDER BY p.platform_sort_name ASC
    `)
  })
  // eslint-disable-next-line no-unused-vars
  .then(({err, rows}) => {
    allPlatforms = rows;

    response.game.platforms = response.game.platforms.map(id => {
      const p = allPlatforms.find(item => item.platform_id === id);

      return {
        code: p.platform_code,
        date: p.platform_date,
        description: p.platform_description,
        id: id,
        name: p.platform_name,
        producerId: p.platform_producer_id,
        producerName: p.platform_producer,
      }
    });

    return queryPromise(`
      SELECT
        tag_id,
        tag_name,
        tag_description
      FROM tags
      ORDER BY tag_name ASC
    `)
  })
  // eslint-disable-next-line no-unused-vars
  .then(({err, rows}) => {
    const allTags = rows;

    response.game.tags = response.game.tags.map(id => {
      const t = allTags.find(item => item.tag_id === id);

      return {
        description: t.tag_description,
        id: id,
        name: t.tag_name,
      }
    });

    return queryPromise(`
      SELECT
        directx_id,
        directx_name
      FROM directx
      ORDER BY directx_name ASC
    `)
  })
  // eslint-disable-next-line no-unused-vars
  .then(({err, rows}) => {
    const allDirectx = rows;

    if (response.game.requirements.min.directx) {
      response.game.requirements.min.directx.name
        = allDirectx.find(item => item.directx_id === response.game.requirements.min.directx.id).directx_name
    }
    if (response.game.requirements.recommended.directx) {
      response.game.requirements.recommended.directx.name
        = allDirectx.find(item => item.directx_id === response.game.requirements.recommended.directx.id).directx_name
    }
    
    return queryPromise(`
      SELECT
        windows_id,
        windows_name
      FROM windows
      ORDER BY windows_name ASC
    `)
  })
  // eslint-disable-next-line no-unused-vars
  .then(({err, rows}) => {
    const allWindows = rows;

    if (response.game.requirements.min.system) {
      response.game.requirements.min.system.name
        = allWindows.find(item => item.windows_id === response.game.requirements.min.system.id).windows_name
    }
    if (response.game.requirements.recommended.system) {
      response.game.requirements.recommended.system.name
        = allWindows.find(item => item.windows_id === response.game.requirements.recommended.system.id).windows_name
    }

    return queryPromise(`
      SELECT
        gd_id,
        gd_game_id,
        gd_platform_id,
        gd_date
      FROM game_dates
      WHERE gd_game_id = "${id}"
      AND gd_date != "0000-00-00"
      ORDER BY gd_date ASC
    `)
  })
  // eslint-disable-next-line no-unused-vars
  .then(({err, rows}) => {
    const dates = rows;

    response.game.dates = dates.map(item => {

      return {
        date: item.gd_date,
        platformName: allPlatforms.find(platform => platform.platform_id === item.gd_platform_id).platform_name,
        platformId: item.gd_platform_id,
        platformCode: allPlatforms.find(platform => platform.platform_id === item.gd_platform_id).platform_code,
      }
    });

    return queryPromise(`
      SELECT
        game_id AS id,
        game_name AS name,
        game_name_pl AS namePl,
        game_cover AS cover
      FROM games
      WHERE game_group = "${groupName}"
      AND game_id != "${id}"
      ORDER BY game_name_sort ASC
    `)
  })
  // eslint-disable-next-line no-unused-vars
  .then(({err, rows}) => {
    response.game.related = rows && rows.length ? rows : []
    
    res.json(response);
  })
}