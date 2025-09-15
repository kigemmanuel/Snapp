#!/usr/bin/env node

import { context } from 'esbuild';
import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Get only top-level JS/JSX files from view directory (no subfolders)
const getTopLevelEntries = (dir) => {
  const entries = [];
  
  try {
    const files = readdirSync(dir);
    
    for (const file of files) {
      const fullPath = join(dir, file);
      const stat = statSync(fullPath);
      
      // Only include files (not directories) that are JS/JSX
      if (stat.isFile() && ['.js', '.jsx'].includes(extname(file))) {
        entries.push(fullPath);
        console.log(`Found entry: ${file}`);
      }
    }
  } catch (error) {
    console.error(`Error reading view directory: ${error.message}`, "Is this a snapp project!");
  }
  
  return entries;
};

const viewDir = join('Snapp', 'views');
const entryPoints = getTopLevelEntries(viewDir);

if (entryPoints.length === 0) {
  console.log('No JS/JSX files found in view directory! Add some files first.');
  process.exit(1);
}

console.log(`Building ${entryPoints.length} entry points...`);

try {
  const ctx = await context({
    entryPoints,
    bundle: true,
    outdir: join('Snapp', 'src'),
    format: 'esm',
    loader: { '.js': 'jsx' },
    jsx: 'transform',
    jsxFactory: 'snapp.create',
    jsxFragment: '"<>"',
    treeShaking: true,
    sourcemap: false,
    minify: false,
    banner: {
      js: "import snapp from '../Snapp.js';"
    },
    plugins: [{
      name: 'build-notifier',
      setup(build) {
        build.onStart(() => {
          console.log('🔄 Building files...');
        });
        build.onEnd((result) => {
          if (result.errors.length > 0) {
            console.error('⚠️ Build failed:', result.errors);
          } else {
            console.log('✅ Build complete!');
          }
        });
      }
    }]
  });
  
  // Start watching
  await ctx.watch();
  console.log('👀 Watching for file changes... (Press Ctrl+C to stop)');
  
  // Handle cleanup
  process.on('SIGINT', async () => {
    console.log('\n🛑 Stopping build watcher...');
    await ctx.dispose();
    process.exit(0);
  });
  
} catch (error) {
  console.error('❌ Build setup failed:', error);
  process.exit(1);
}