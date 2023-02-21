import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { join } from 'path';

async function resolveWebpackCompileResult(
  runnableWebpackObject: webpack.Compiler
) {
  return await new Promise(
    (resolve: (sth: any) => void, reject: (sth: any) => void) =>
      runnableWebpackObject.run((err, stats) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        const info = stats?.toJson();
        if (stats?.hasErrors()) {
          for (let line of info?.errors || []) {
            console.error(line.message);
            reject(err);
          }
        }
        if (stats?.hasWarnings()) {
          for (let line of info?.warnings || []) {
            console.warn(line.message);
          }
        }
        resolve(stats);
      })
  );
}

export async function generateFrontendScript(isDevelopment: boolean) {
  console.log('Generating frontend scripts');
  const compiler = webpack({
    entry: {
      index: join(process.cwd(), './src/frontend/entry.ts'),
    },
    target: 'web',
    output: {
      path: join(process.cwd(), './src/backend/dist'),
      filename: `[name].bundle.js`,
    },

    resolve: {
      alias: {
        '@': join(process.cwd(), './src/frontend'),
        '@res': join(process.cwd(), './res'),
      },
      extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.json5'],
      modules: [
        './node_modules',
        './src/frontend/node_modules',
        'node_modules',
      ],
      fallback: {
        string_decoder: require.resolve('string_decoder/'),
        buffer: require.resolve('buffer/'),
      },
    },
    resolveLoader: {
      modules: ['./node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.json5$/,
          use: ['json5-loader'],
        },
        {
          test: /\.svg$/,
          use: ['raw-loader'],
        },
        {
          test: /\.(png|jpg|gif|ico)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                fallback: 'file-loader',
              },
            },
          ],
        },
        {
          test: /\.vue$/,
          use: ['vue-loader'],
        },
        {
          test: /\.tsx?$/,
          exclude: /\/node_modules\//,
          use: [
            {
              loader: 'swc-loader',
              options: {
                sourceMaps: isDevelopment,
                minify: !isDevelopment,
                jsc: {
                  parser: {
                    syntax: 'typescript',
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({ filename: '[name].bundle.css' }),
    ],
    mode: 'development',
    devtool: false,
  });

  await resolveWebpackCompileResult(compiler);
}
