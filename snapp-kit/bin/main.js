#!/usr/bin/env node

import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get command line arguments
const args = process.argv.slice(2);
const command = args[0];

// Help message
const showHelp = () => {
  console.log(`
🚀 Snapp CLI

Usage:
  snapp <command> [options]

Commands:
  create              Create a new Snapp application
  build               Build your Snapp project
  
Build Options:
  -M, --minify        Minify output files
  
General Options:
  -h, --help          Show this help message

Examples:
  snapp create <App Name>         # Create new Snapp app
  snapp build                     # Build and watch (no minify)
  snapp build -M                  # Build and watch with minify
  snapp build --minify            # Build and watch with minify
  snapp -h                        # Show help
  snapp --help                    # Show help
`);
};

// Show help if no command or help flag
if (!command || command === '-h' || command === '--help') {
  showHelp();
  process.exit(0);
}

// Execute command
const executeCommand = (scriptName, scriptArgs) => {
  const scriptPath = join(__dirname, scriptName);
  
  console.log(`🔥 Running ${command} command...`);
  
  const child = spawn('node', [scriptPath, ...scriptArgs], {
    stdio: 'inherit',
    shell: false
  });

  child.on('error', (error) => {
    console.error(`❌ Failed to execute ${command}:`, error.message);
    process.exit(1);
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ ${command} command failed with exit code ${code}`);
      process.exit(code);
    }
  });

  // Forward signals to child process
  process.on('SIGINT', () => {
    child.kill('SIGINT');
  });

  process.on('SIGTERM', () => {
    child.kill('SIGTERM');
  });
};

// Handle commands
switch (command.toLowerCase()) {
  case 'create':
    // Pass remaining args to create.js
    const createArgs = args.slice(1);
    executeCommand('create.js', createArgs);
    break;

  case 'build':
    // Pass remaining args to build.js (like -M, --minify)
    const buildArgs = args.slice(1);
    executeCommand('build.js', buildArgs);
    break;

  default:
    console.error(`❌ Unknown command: ${command}`);
    console.log('Run "snapp --help" to see available commands.');
    process.exit(1);
}