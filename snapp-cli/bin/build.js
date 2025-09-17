import { context } from 'esbuild';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const shouldMinify = process.argv.includes('-M') || process.argv.includes('--minify');

// Get all JS/TS files from views directory
const getEntryPoints = () => {
  const viewDir = 'views';
  const entries = [];
     
  try {
    const files = readdirSync(viewDir);
    for (const file of files) {
      const fullPath = join(viewDir, file);
      if (statSync(fullPath).isFile() && /\.(js|jsx|ts|tsx)$/.test(file)) {
        entries.push(fullPath);
        console.log(`📄 Found entry: ${file}`);
      }
    }
  } catch (error) {
    console.error('❌ Error reading views directory:', error.message);
    process.exit(1);
  }
     
  if (entries.length === 0) {
    console.log('❌ No entry files found in views/');
    console.log('💡 Make sure you\'re in a Snapp project directory');
    process.exit(1);
  }
     
  return entries;
};

console.log(`🚀 Building Snapp project... ${shouldMinify ? '(minified)' : ''}`);

try {
  const ctx = await context({
    entryPoints: getEntryPoints(),
    bundle: true,
    outdir: 'src',
    format: 'esm',
    loader: {
      '.js': 'jsx',
      '.jsx': 'jsx',
      '.ts': 'ts',
      '.tsx': 'tsx'
    },
    jsx: 'transform',
    jsxFactory: 'snapp.create',
    jsxFragment: '"<>"',
    treeShaking: true,
    minify: shouldMinify,
    // Add banner to inject snapp import at the top of all files
    banner: {
      js: 'import snapp from "../snapp.js";'
    },
    packages: 'external',
    plugins: [
      {
        name: 'snapp-processor',
        setup(build) {
          // Process all JS/TS files to remove snapp imports and normalize references
          build.onLoad({ filter: /\.(js|jsx|ts|tsx)$/ }, async (args) => {
            const fs = await import('fs/promises');
            let contents = await fs.readFile(args.path, 'utf8');
            
            // Remove ALL forms of snapp imports
            contents = contents.replace(/import\s+\w+\s+from\s+['"][^'"]*snapp[^'"]*['"];?\s*\n?/g, '');
            contents = contents.replace(/import\s*\{\s*[^}]*\}\s*from\s*['"][^'"]*snapp[^'"]*['"];?\s*\n?/g, '');
            contents = contents.replace(/import\s*\*\s*as\s+\w+\s+from\s*['"][^'"]*snapp[^'"]*['"];?\s*\n?/g, '');
            
            // Replace all snapp variable names (snapp2, snapp3, etc.) with just 'snapp'
            contents = contents.replace(/\bsnapp\d+\b/g, 'snapp');
            
            console.log(`🔧 Processed: ${args.path.replace(process.cwd() + '/', '')}`);
            
            // Determine the correct loader based on file extension
            let loader = 'js';
            if (args.path.endsWith('.tsx')) loader = 'tsx';
            else if (args.path.endsWith('.ts')) loader = 'ts';
            else if (args.path.endsWith('.jsx')) loader = 'jsx';
            else if (args.path.endsWith('.js')) loader = 'jsx'; // Treat .js as jsx for JSX support
            
            return {
              contents,
              loader
            };
          });
        }
      },
      {
        name: 'build-logger',
        setup(build) {
          build.onStart(() => console.log('🔄 Building...'));
          build.onEnd((result) => {
            if (result.errors.length > 0) {
              console.error('❌ Build failed!');
              result.errors.forEach(error => console.error(error));
            } else {
              console.log('✅ Build complete!');
              console.log('📦 Banner added: import snapp from "../snapp.js"');
              console.log('🔧 All snapp imports removed and normalized to "snapp"');
            }
          });
        }
      }
    ]
  });

  await ctx.watch();
  console.log('👀 Watching for changes... (Ctrl+C to stop)');

  process.on('SIGINT', async () => {
    console.log('\n🛑 Stopping...');
    await ctx.dispose();
    process.exit(0);
  });

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}