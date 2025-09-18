import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get app name from arguments
const appName = process.argv[2];

if (!appName) {
  console.log(`
❌ App name is required!

Usage:
  snapp create <app-name>

Example:
  snapp create my-awesome-app
`);
  process.exit(1);
}

// Validate app name
if (!/^[a-zA-Z0-9-_]+$/.test(appName)) {
  console.error('❌ App name can only contain letters, numbers, hyphens, and underscores');
  process.exit(1);
}

// Check if directory already exists
if (existsSync(appName)) {
  console.error(`❌ Directory '${appName}' already exists!`);
  process.exit(1);
}

console.log(`🚀 Creating Snapp app: ${appName}`);

// Template directory path
const templateDir = join(__dirname, 'template');

if (!existsSync(templateDir)) {
  console.error('❌ Template directory not found!');
  console.error('💡 Make sure the template folder exists in your CLI directory, or reinstall snapp-cli');
  process.exit(1);
}

// Copy template recursively
const copyTemplate = (src, dest) => {
  const stats = statSync(src);
  
  if (stats.isDirectory()) {
    if (!existsSync(dest)) {
      mkdirSync(dest, { recursive: true });
    }
    
    const files = readdirSync(src);
    for (const file of files) {
      copyTemplate(join(src, file), join(dest, file));
    }
  } else {
    let content = readFileSync(src, 'utf8');
    
    // Replace template variables
    content = content
      .replace(/{{APP_NAME}}/g, appName)
      .replace(/{{APP_NAME_CAMEL}}/g, toCamelCase(appName));
    
    writeFileSync(dest, content);
    console.log(`📄 Created: ${dest}`);
  }
};

// Convert kebab-case to camelCase
const toCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
};

try {
  // Create app directory
  mkdirSync(appName);
  console.log(`📁 Created directory: ${appName}`);
  
  // Copy all template files
  copyTemplate(templateDir, appName);
  
  console.log(`
✅ Successfully created ${appName}!

Next steps:
  cd ${appName}
  snapp build

Happy coding! 🎉
`);
  
} catch (error) {
  console.error('❌ Failed to create app:', error.message);
  process.exit(1);
}