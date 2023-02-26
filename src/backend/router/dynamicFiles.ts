import { readFile } from 'fs/promises';
import { join } from 'path';

import { router } from '.';

let imageFolderPath = 'D:\\Pictures';

export async function init() {
  router.get('/image/:name', async (ctx) => {
    const { name } = ctx.params;
    const imageFileRaw = await readFile(join(imageFolderPath, `./${name}`));
    ctx.type = 'image';
    ctx.body = imageFileRaw;
  });
}
