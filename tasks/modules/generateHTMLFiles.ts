import { writeFile } from 'fs/promises';
import { join } from 'path';

async function generateHTMLRaw(appName: string) {
  const scriptList = [`/${appName}.bundle.js`];
  const styleSheetList = [`/${appName}.bundle.css`];

  return `
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0" />
    <title>${'MySQL Image Viewer'}</title>
    ${styleSheetList
      .map((url) => `<link rel="stylesheet" href="${url}" />`)
      .join('\n')}
    ${scriptList
      .map((url) => `<link rel="preload" href="${url}" as="script" />`)
      .join('\n')}
    <link rel="preload" href="/${appName}.bundle.js" as="script" />
  </head>
  <body>
    <div id="__root">
      <div class="el-skeleton is-animated" style="padding: 16px">
        <div class="el-skeleton__item el-skeleton__p is-first">
        </div>
        <div class="el-skeleton__item el-skeleton__p el-skeleton__paragraph">
        </div>
        <div class="el-skeleton__item el-skeleton__p el-skeleton__paragraph">
        </div>
        <div class="el-skeleton__item el-skeleton__p el-skeleton__paragraph">
        </div>
        <div class="el-skeleton__item el-skeleton__p el-skeleton__paragraph">
        </div>
        <div class="el-skeleton__item el-skeleton__p el-skeleton__paragraph is-last">
        </div>
      </div>
    </div>
    ${scriptList
      .map((script) => `<script src="${script}"></script>`)
      .join('\n')}
  </body>
  </html>`;
}

export async function generateHTMLFiles() {
  console.log('Generating HTML files');
  await writeFile(
    join(process.cwd(), './src/backend/dist/index.html'),
    await generateHTMLRaw('index')
  );
}
