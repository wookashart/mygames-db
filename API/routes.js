// === authentication === //
const apiRegister = require('./authentication/register');
const apiLogin = require('./authentication/login');
const apiMe = require('./authentication/me');
const apiLogout = require('./authentication/logout');

const routes = [
  // === authentication === //
  { endpoint: '/api/register', function: apiRegister, method: 'post' },
  { endpoint: '/api/login', function: apiLogin, method: 'post' },
  { endpoint: '/api/me', function: apiMe, method: 'post' },
  { endpoint: '/api/logout', function: apiLogout, method: 'post' },
];

module.exports = routes;