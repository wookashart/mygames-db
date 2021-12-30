/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const routes = require('./API/routes');

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json({ limit: '500mb' }));
    server.use(bodyParser.urlencoded({ limit: '500mb' }));
    server.use(bodyParser.json());
    server.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    server.use(cookieParser());
    server.use(
      session({
        key: 'user_sid',
        secret: 'random',
        resave: false,
        saveUninitialized: true,
        cookie: {
          httpOnly: false,
        },
      }),
    );

    routes.forEach(r => {
      if (r.method === 'post') {
        server.post(r.endpoint, r.module);
      } else {
        server.get(r.endpoint, r.module);
      }

    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
