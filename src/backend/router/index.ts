import Router from '@koa/router';

import { init as initStaticFiles } from './staticFiles';

export const router = new Router();

export async function init() {
  await initStaticFiles();
}
