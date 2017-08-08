'use strict';

import compose from 'koa-compose';
import tagsRoutes from './tags';

export default function routes() {
  return compose([tagsRoutes]);
}
