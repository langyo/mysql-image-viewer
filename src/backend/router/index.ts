import Router from '@koa/router';

import { init as initStaticFiles } from './staticFiles';
import { init as initDynamicFiles } from './dynamicFiles';

export const router = new Router();

export async function init() {
  await initStaticFiles();
  await initDynamicFiles();
}
