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
    endpoint: '/api/producers',
    module: require('./admin/producer/producerList'),
    method: 'get'
  },
  {
    endpoint: '/api/producer-create',
    module: require('./admin/producer/producerCreate'),
    method: 'post'
  },
  {
    endpoint: '/api/producer-edit',
    module: require('./admin/producer/producerEdit'),
    method: 'post'
  },
  {
    endpoint: '/api/producer-delete',
    module: require('./admin/producer/producerDelete'),
    method: 'post'
  },
  {
    endpoint: '/api/distributors',
    module: require('./admin/distributor/distributorsList'),
    method: 'get'
  },
  {
    endpoint: '/api/distributor-create',
    module: require('./admin/distributor/distributorCreate'),
    method: 'post'
  },
  {
    endpoint: '/api/distributor-edit',
    module: require('./admin/distributor/distributorEdit'),
    method: 'post'
  },
  {
    endpoint: '/api/distributor-delete',
    module: require('./admin/distributor/distributorDelete'),
    method: 'post'
  },
  {
    endpoint: '/api/distributors-pl',
    module: require('./admin/distributor-pl/distributorsPlList'),
    method: 'get'
  },
  {
    endpoint: '/api/distributor-pl-create',
    module: require('./admin/distributor-pl/distributorPlCreate'),
    method: 'post'
  },
  {
    endpoint: '/api/distributor-pl-edit',
    module: require('./admin/distributor-pl/distributorPlEdit'),
    method: 'post'
  },
  {
    endpoint: '/api/distributor-pl-delete',
    module: require('./admin/distributor-pl/distributorPlDelete'),
    method: 'post'
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
  }
];

module.exports = routes;