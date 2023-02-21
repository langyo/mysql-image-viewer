import { readFile } from 'fs/promises';
import { join } from 'path';

import { router } from '.';

export async function init() {
  const htmlFileRaw = await readFile(
    join(process.cwd(), './src/backend/dist/index.html')
  );
  const jsFileRaw = await readFile(
    join(process.cwd(), './src/backend/dist/index.bundle.js')
  );
  const cssFileRaw = await readFile(
    join(process.cwd(), './src/backend/dist/index.bundle.css')
  );

  router.get('/', async (ctx) => {
    ctx.type = 'text/html';
    ctx.body = htmlFileRaw;
  });
  router.get('/index.bundle.js', async (ctx) => {
    ctx.type = 'application/javascript';
    ctx.body = jsFileRaw;
  });
  router.get('/index.bundle.css', async (ctx) => {
    ctx.type = 'text/css';
    ctx.body = cssFileRaw;
  });
}
