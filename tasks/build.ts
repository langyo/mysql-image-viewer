import { generateFrontendScript } from './modules/generateScripts';
import { generateHTMLFiles } from './modules/generateHTMLFiles';

const isDevelopment = process.env.NODE_ENV === 'development';
console.log(`Building in ${isDevelopment ? 'development' : 'production'} mode`);

(async () => {
  await generateFrontendScript(isDevelopment);
  await generateHTMLFiles();
})();
