import { readFile } from 'fs/promises';
import { join } from 'path';
import { Sequelize, DataTypes } from 'sequelize';

import { router } from '.';

let folderPath = 'D:\\Pictures';

export async function init() {
  router.get('/image/:name', async (ctx) => {
    const { name } = ctx.params;
    const imageFileRaw = await readFile(join(folderPath, `./${name}`));
    ctx.type = 'image';
    ctx.body = imageFileRaw;
  });

  router.post('/execute', async (ctx) => {
    try {
      const { databaseUrl, imageTableName, imageColumnName, imageFolderPath } =
        ctx.request.body;

      folderPath = `${imageFolderPath}`;

      const db = new Sequelize(`${databaseUrl}`);
      await db.authenticate();

      const table = db.define(`${imageTableName}`, {
        [`${imageColumnName}`]: DataTypes.STRING,
      });
      const ret = await table.findAll({
        attributes: [`${imageColumnName}`],
      });
      ctx.body = {
        success: true,
        data: ret.map((n: any) => n[`${imageColumnName}`]),
      };
    } catch (err) {
      console.error(err);
      ctx.body = {
        success: false,
        reason: `${err}`,
      };
    }
  });
}
