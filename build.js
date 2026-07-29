// build.js
const esbuild = require('esbuild');

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: [
    'src/widget-core.js',
    'src/widget-ui.js',
  ],
  outdir: 'dist',
  minify: true,
  bundle: false,      // set true later if you split code across multiple modules
  sourcemap: false,   // keep false for production — a sourcemap would expose readable source
  target: ['es2018'],
  legalComments: 'none',
};

async function run() {
  if (isWatch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log('Watching for changes...');
  } else {
    await esbuild.build(buildOptions);
    console.log('Build complete → dist/');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

//test
