const routes = [
  // === authentication === //
  {
    endpoint: '/api/register',
    module: require('./authentication/register'),
    method: 'post'
  },
  {
    endpoint: '/api/login',
    module: require('./authentication/login'),
    method: 'post'
  },
  {
    endpoint: '/api/me',
    module: require('./authentication/me'),
    method: 'post'
  },
  {
    endpoint: '/api/logout',
    module: require('./authentication/logout'),
    method: 'post'
  },

  // === admin === //
  {
    endpoint: '/api/platform-producer-create',
    module: require('./admin/platform-producer/platformProducerCreate'),
    method: 'post'
  },
  {
    endpoint: '/api/platform-producers',
    module: require('./admin/platform-producer/platformProducersList'),
    method: 'get'
  },
  {
    endpoint: '/api/platform-create',
    module: require('./admin/platform/platformCreate'),
    method: 'post'
  },
  {
    endpoint: '/api/platform-edit',
    module: require('./admin/platform/platformEdit'),
    method: 'post'
  },
  {
    endpoint: '/api/platform-delete',
    module: require('./admin/platform/platformDelete'),
    method: 'post'
  },
  {
    endpoint: '/api/platforms',
    module: require('./admin/platform/platformsList'),
    method: 'get'
  },
  {
    endpoint: '/api/tag-create',
    module: require('./admin/tag/tagCreate'),
    method: 'post'
  },
  {
    endpoint: '/api/tag-edit',
    module: require('./admin/tag/tagEdit'),
    method: 'post'
  },
  {
    endpoint: '/api/tag-delete',
    module: require('./admin/tag/tagDelete'),
    method: 'post'
  },
  {
    endpoint: '/api/tags',
    module: require('./admin/tag/tagsList'),
    method: 'get'
  },
  {
    endpoint: '/api/directx',
    module: require('./admin/directx/directxList'),
    method: 'get'
  },
  {
    endpoint: '/api/directx-create',
    module: require('./admin/directx/directxCreate'),
    method: 'post'
  },
  {
    endpoint: '/api/directx-edit',
    module: require('./admin/directx/directxEdit'),
    method: 'post'
  },
  {
    endpoint: '/api/directx-delete',
    module: require('./admin/directx/directxDelete'),
    method: 'post'
  },
  {
    endpoint: '/api/windows',
    module: require('./admin/windows/windowsList'),
    method: 'get'
  },
  {
    endpoint: '/api/windows-create',
    module: require('./admin/windows/windowsCreate'),
    method: 'post'
  },
  {
    endpoint: '/api/windows-edit',
    module: require('./admin/windows/windowsEdit'),
    method: 'post'
  },
  {
    endpoint: '/api/windows-delete',
    module: require('./admin/windows/windowsDelete'),
    method: 'post'
  },
  {
    endpoint: '/api/game-create',
    module: require('./admin/game/gameCreate'),
    method: 'post'
  },
  {
    endpoint: '/api/game-distributions',
    module: require('./admin/game-distribution/gameDistributionList'),
    method: 'get'
  },
  {
    endpoint: '/api/game-distribution-edit',
    module: require('./admin/game-distribution/gameDistributionEdit'),
    method: 'post'
  },
  {
    endpoint: '/api/game-distribution-delete',
    module: require('./admin/game-distribution/gameDistributionDelete'),
    method: 'post'
  },
  {
    endpoint: '/api/game-distribution-create',
    module: require('./admin/game-distribution/gameDistributionCreate'),
    method: 'post'
  },
  {
    endpoint: '/api/admin-stats',
    module: require('./admin/stats/getStats'),
    method: 'get'
  },
  {
    endpoint: '/api/dlc-create',
    module: require('./admin/dlc/dlcCreate'),
    method: 'post'
  },
  {
    endpoint: '/api/companies',
    module: require('./admin/companies/companiesList'),
    method: 'get'
  },
  {
    endpoint: '/api/company-create',
    module: require('./admin/companies/companyCreate'),
    method: 'post'
  },
  {
    endpoint: '/api/company-edit',
    module: require('./admin/companies/companyEdit'),
    method: 'post'
  },
  {
    endpoint: '/api/company-delete',
    module: require('./admin/companies/companyDelete'),
    method: 'post'
  },

  // === games === //
  {
    endpoint: '/api/games',
    module: require('./games/GamesList'),
    method: 'get'
  },
  {
    endpoint: '/api/game/:id',
    module: require('./games/GameById'),
    method: 'get'
  },
  {
    endpoint: '/api/game-user-info/:gameId/:userId',
    module: require('./games/GameUserInfoById'),
    method: 'get'
  },
  {
    endpoint: '/api/games-dropdown',
    module: require('./games/GamesListDropdown'),
    method: 'get'
  },

  // === ratio === //
  {
    endpoint: '/api/game-ratio-set',
    module: require('./ratio/GameRatioSet'),
    method: 'post'
  },
  {
    endpoint: '/api/game-ratio-by-id/:id',
    module: require('./ratio/RatioByGameId'),
    method: 'get'
  },

  // === user library === //
  {
    endpoint: '/api/user-library-manage',
    module: require('./user-library/UserLibraryManage'),
    method: 'post'
  },
  
  // === game status === //
  {
    endpoint: '/api/game-status-manage',
    module: require('./games-status/GameStatusManage'),
    method: 'post'
  },

  // === DLC === //

];

module.exports = routes;