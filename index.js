'use strict';

import 'babel-polyfill';
import 'isomorphic-fetch';

import Koa from 'koa';

import middleware from './server/middleware';
import routes from './server/routes';

const port = process.env.PORT || 4000;

const app = new Koa();

app.use(middleware());
app.use(routes());
app.use(ctx => ctx.status = 404);

(async() => {
  await app.listen(port);
  console.log(`Server started on port ${port}`);
})();
