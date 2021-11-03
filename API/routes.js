// === authentication === //
const apiRegister = require('./authentication/register');
const apiLogin = require('./authentication/login');
const apiMe = require('./authentication/me');
const apiLogout = require('./authentication/logout');

// === admin === //
const apiPlatformProducerCreate = require('./admin/platform-producer/platformProducerCreate');
const apiPlatformProducersList = require('./admin/platform-producer/platformProducersList');
const apiPlatformCreate = require('./admin/platform/platformCreate');
const apiPlatformEdit = require('./admin/platform/platformEdit');
const apiPlatformDelete = require('./admin/platform/platformDelete');
const apiPlatformsList = require('./admin/platform/platformsList');
const apiTagCreate = require('./admin/tag/tagCreate');
const apiTagEdit = require('./admin/tag/tagEdit');
const apiTagDelete = require('./admin/tag/tagDelete');
const apiTagsList = require('./admin/tag/tagsList');
const apiProducersList = require('./admin/producer/producerList');
const apiProducerCreate = require('./admin/producer/producerCreate');
const apiProducerEdit = require('./admin/producer/producerEdit');
const apiProducerDelete = require('./admin/producer/producerDelete');
const apiDistributorList = require('./admin/distributor/distributorsList');

const routes = [
  // === authentication === //
  { endpoint: '/api/register', function: apiRegister, method: 'post' },
  { endpoint: '/api/login', function: apiLogin, method: 'post' },
  { endpoint: '/api/me', function: apiMe, method: 'post' },
  { endpoint: '/api/logout', function: apiLogout, method: 'post' },

  // === admin === //
  { endpoint: '/api/platform-producer-create', function: apiPlatformProducerCreate, method: 'post' },
  { endpoint: '/api/platform-producers', function: apiPlatformProducersList, method: 'get' },
  { endpoint: '/api/platform-create', function: apiPlatformCreate, method: 'post' },
  { endpoint: '/api/platform-edit', function: apiPlatformEdit, method: 'post' },
  { endpoint: '/api/platform-delete', function: apiPlatformDelete, method: 'post' },
  { endpoint: '/api/platforms', function: apiPlatformsList, method: 'get' },
  { endpoint: '/api/tag-create', function: apiTagCreate, method: 'post' },
  { endpoint: '/api/tag-edit', function: apiTagEdit, method: 'post' },
  { endpoint: '/api/tag-delete', function: apiTagDelete, method: 'post' },
  { endpoint: '/api/tags', function: apiTagsList, method: 'get' },
  { endpoint: '/api/producers', function: apiProducersList, method: 'get' },
  { endpoint: '/api/producer-create', function: apiProducerCreate, method: 'post' },
  { endpoint: '/api/producer-edit', function: apiProducerEdit, method: 'post' },
  { endpoint: '/api/producer-delete', function: apiProducerDelete, method: 'post' },
  { endpoint: '/api/distributors', function: apiDistributorList, method: 'get' },
];

module.exports = routes;