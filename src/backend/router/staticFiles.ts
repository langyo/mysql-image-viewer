import { readFile } from 'fs/promises';
import { join } from 'path';

import { router } from '.';

export async function init() {
  router.get('/', async (ctx) => {
    ctx.type = 'text/html';
    ctx.body = await readFile(
      join(process.cwd(), './src/backend/dist/index.html')
    );
  });
  router.get('/index.bundle.js', async (ctx) => {
    ctx.type = 'application/javascript';
    ctx.body = await readFile(
      join(process.cwd(), './src/backend/dist/index.bundle.js')
    );
  });
  router.get('/index.bundle.css', async (ctx) => {
    ctx.type = 'text/css';
    ctx.body = await readFile(
      join(process.cwd(), './src/backend/dist/index.bundle.css')
    );
  });
}
