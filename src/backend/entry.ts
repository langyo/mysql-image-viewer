import Koa from 'koa';
import Logger from 'koa-logger';
import Body from 'koa-body';

import { router, init as initRouter } from './router';

const app = new Koa();

app.use(Logger());
app.use(Body());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
console.log('The server is running on the port 3000.');

(async () => {
  await initRouter();
})();
