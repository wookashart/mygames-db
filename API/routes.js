// === authentication === //
const apiRegister = require('./authentication/register');
const apiLogin = require('./authentication/login');
const apiMe = require('./authentication/me');
const apiLogout = require('./authentication/logout');

// === admin === //
const apiPlatformProducerCreate = require('./admin/platformProducerCreate');
const apiPlatformProducersList = require('./admin/platformProducersList');
const apiPlatformCreate = require('./admin/platformCreate');
const platformEdit = require('./admin/platformEdit');
const apiPlatformsList = require('./admin/platformsList');

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
  { endpoint: '/api/platform-edit', function: platformEdit, method: 'post' },
  { endpoint: '/api/platforms', function: apiPlatformsList, method: 'get' },
];

module.exports = routes;