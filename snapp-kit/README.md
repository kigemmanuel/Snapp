# Snapp Kit

> **A global build tool for Snapp Framework. Install once, use everywhere. Zero dependencies, zero configuration - just compile your JSX/TSX files to vanilla JavaScript.**


[![npm version](https://badge.fury.io/js/snapp-kit.svg)](https://www.npmjs.com/package/snapp-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with esbuild](https://img.shields.io/badge/Powered%20by-esbuild-orange)](https://esbuild.github.io/)

---

## 📋 Table of Contents

- [What is snapp](https://github.com/kigemmanuel/Snapp)
- [What is Snapp Kit?](#what-is-snapp-kit)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Commands](#commands)
- [How It Works](#how-it-works)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

---

## What is Snapp Kit?

Snapp Kit is a **global build tool** - You install it once globally and use it in any folder, anywhere on your system.

**Think of it like:**
- Installing Python → running `python main.py`
- Installing Node.js → running `node app.js`
- Installing Snapp Kit → running `snapp build`

### Key Features:
- **🌍 Global Installation** - Install once, use everywhere
- **⚡ Powered by esbuild** - Ultra-fast JSX/TSX/TS compilation
- **🔄 Watch Mode** - Automatic rebuilding on file changes
- **📦 Production Builds** - Minification support for optimized output
- **📄 Page Generator** - Quickly create new pages with templates
- **🚀 Zero Configuration** - Just point and build

---

## Installation

### Install Globally (One Time Setup)

```bash
npm install -g snapp-kit
```

**That's it!** Now you can use `snapp` command anywhere on your system.

### Verify Installation

```bash
snapp --version
```

---

## Quick Start

**No project setup needed!** Just create your files and build:

```bash
# 1. Create a new project (generates starter files)
snapp create my-app
cd my-app

# 2. Generate new pages instantly
snapp page home
snapp page about
snapp page contact

# 3. Start building (one-time build)
snapp build

# 4. Or watch for changes during development
snapp build -W

# 5. Build minified for production
snapp build -M
```

**Or use in any existing folder:**

```bash
# Navigate to any snapp project folder
cd /path/to/my-existing-project

# Create new pages
snapp page myNewPage

# Start building JSX files from /views to /src
snapp build
```

---

## Commands

### `snapp create <project-name>`

Creates a starter project with example files. **Optional** - you can use Snapp Kit in any folder.

```bash
snapp create my-project
```

**What it creates:**
```
my-project/
├── views/
│   ├── index.jsx       # Your JSX files go here
│   └── components/
|
├── src/ 
│   ├── snapp.jsx       # snapp run time
│   ├── index.jsx       # Build file
│   └── components/
|
├── index.html          # HTML templates
└── README.md
```

### `snapp page <page-name>`

**Generate new pages instantly** - creates both HTML template and JSX component files.

```bash
snapp page myNewPage
```

**What happens:**
- Creates `myNewPage.html` in root directory
- Creates `views/myNewPage.jsx` with component template
- Replaces template variables with your page name
- Ready to use immediately

**Example workflow:**
```bash
# 1. Generate a new page
snapp page contact

# 2. Start building to compile JSX to vanilla JS
snapp build

# 3. Files created and compiled:
#    ✅ contact.html (HTML template)
#    ✅ views/contact.jsx (JSX component) 
#    ✅ src/contact.js (auto-compiled vanilla JS)
```

### `snapp build [options]`

**The main command** - compiles JSX/TSX files from `views/` to `src/` folder.

```bash
# One-time build (exits after completion)
snapp build

# Watch mode (rebuilds on file changes)
snapp build -W
snapp build --watch

# Minified build (production-ready)
snapp build -M
snapp build --minify

# Combine flags (watch + minify)
snapp build -W -M
snapp build --watch --minify
```

**What happens:**
- Compiles `.jsx`, `.tsx`, `.ts`, `.js` files using **esbuild**
- Outputs vanilla JavaScript to `src/` folder
- In watch mode: runs continuously until you stop it (Ctrl+C)
- Without watch mode: exits after successful build

### `snapp --help` / `snapp --version`

```bash
snapp --help     # Show all commands
snapp --version  # Show CLI, Snapp, esbuid version
```

---

## How It Works

### Like a System Tool

Snapp Kit works like any global system tool:

```bash
# Python (global installation)
node --version        # ✅ Works anywhere
node my_script.js     # ✅ Works anywhere

# Snapp Kit (global installation)
snapp --version         # ✅ Works anywhere
snapp build            # ✅ Works anywhere
snapp page contact     # ✅ Works anywhere
```

### No Dependencies Required

**Traditional React/Vue/Angular:**
```bash
# ❌ Need package.json, node_modules, complex setup
npm init
npm install react webpack babel
npm run build
```

**Snapp Kit:**
```bash
# ✅ Just build - no setup needed
snapp page home
snapp build
```

### File Compilation with esbuild

Snapp Kit uses **esbuild** (fast JavaScript bundler) to compile your files:

```
views/index.jsx     →  src/index.js
views/about.tsx     →  src/about.js
views/contact.jsx   →  src/contact.js
views/components/   →  src/components/
```

**Supported formats:**
- `.jsx` → `.js` (React-like JSX)
- `.tsx` → `.js` (TypeScript JSX)
- `.ts` → `.js` (TypeScript)
- `.js` → `.js` (Modern JavaScript)

---

## Examples

### Example 1: Quick Page Generation

```bash
# Create a new page instantly
snapp page portfolio

# What gets created:
# ✅ portfolio.html (in root)
# ✅ views/portfolio.jsx (JSX component)

# Compile it once
snapp build
# ✅ Creates src/portfolio.js automatically and exits

# Or watch for changes during development
snapp build -W
# ✅ Rebuilds automatically when you edit files
```

### Example 2: Development Workflow

```bash
# Start a new project
snapp create my-blog
cd my-blog

# Generate pages
snapp page home
snapp page blog
snapp page about

# Start watch mode for development
snapp build -W

# Now edit views/blog.jsx - it auto-compiles to src/blog.js
# Keep coding, it keeps building! 🔄
```

### Example 3: Production Build

```bash
# Regular build (development)
snapp build
# Output: src/index.js (readable, not minified)

# Production build (minified)
snapp build -M
# Output: src/index.js (minified, smaller file size)

# Test production build with watch mode
snapp build -W -M
# Rebuilds with minification on every change
```

### Example 4: Use in Any Folder

```bash
# Go to any folder
mkdir my-simple-site
cd my-simple-site

# Generate pages
snapp page home
snapp page about

# One-time build
snapp build
# ✅ Builds once and exits

# Or watch mode
snapp build -W
# ✅ Keeps running and rebuilding
```

### Example 5: Working with Existing Projects

```bash
# You have an existing snapp project
cd my-existing-website

# Add new pages
snapp page blog
snapp page contact

# Just start building
snapp build
# ✅ Compiles all JSX/TSX files in views/ folder once

# Or use watch mode
snapp build -W
# ✅ Continuous compilation
```

### Example 6: Complete Project Structure

```
my-snapp-app/
├── views/           # 🎯 Source JSX/TSX components
│   ├── index.jsx    # Main page component
│   ├── about.jsx    # About page component  
│   ├── user.jsx     # User profile component
│   └── components/  # Reusable components
│       ├── Header.jsx
│       ├── Footer.jsx
│       └── UserCard.jsx
|
├── src/ # 📦 Built JS files (snapp build)
│   ├── snapp.js   # Snapp runtime
|   ├── index.js
│   ├── about.js
│   └── user.js
|
├── index.html       # 📄 Homepage template
├── about.html       # 📄 About page template
├── user.html        # 📄 User page template
└── 
```

### Example 7: Generated Page Template

When you run `snapp page contact`, here's what gets created:

**contact.html:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Contact</title>
</head>
<body>
    <div id="snapp-app"></div>
    <script type="module" src="src/contact.js"></script>
</body>
</html>
```

**views/contact.jsx:**
```jsx
import snapp from "../src/snapp.js"

const Contact = () => {
    return (
        <div className="contact-page">
            <h1>Contact</h1>
            <p>Welcome to the Contact page!</p>
        </div>
    );
}

const snappBody = document.querySelector("#snapp-app");
snapp.render(snappBody, Contact());
```

**After `snapp build` → src/contact.js:**
```javascript
// Auto-generated vanilla JavaScript
import snapp from './snapp.js';

const Contact = () => {
    return snapp.createElement('div', { className: 'contact-page' },
        snapp.createElement('h1', {}, 'Contact'),
        snapp.createElement('p', {}, 'Welcome to the Contact page!')
    );
}

const snappBody = document.querySelector("#snapp-app");
snapp.render(snappBody, Contact());
```

---

## Troubleshooting

### Common Questions

#### "Do I need to install Snapp Kit in every project?"
**No!** Install once globally, use everywhere.

#### "When should I use watch mode vs regular build?"
- **Regular build** (`snapp build`): Quick one-time compilation, CI/CD, deployment scripts
- **Watch mode** (`snapp build -W`): Active development, auto-rebuild on file changes

#### "When should I use minification?"
Use `-M` or `--minify` for production deployments to reduce file sizes. Not needed during development.

#### "Can I use it in an existing website?"
**Yes!** Just create a `views/` folder and start building.

#### "What if I don't have a views/ folder?"
Snapp Kit will show an error. Create the folder and add your JSX files there.

#### "Can I customize this?"
**Yes!** You can clone the repo from github and also send pull request

### Common Issues

#### Command not found: snapp
```bash
# Reinstall globally
npm install -g snapp-kit

# Check if it's in your PATH
snapp --version
```

#### Page generation not working
```bash
# Make sure you're in a project directory
# Make sure page templates exist in CLI installation

# Check what was created
ls *.html
ls views/
```

#### Files not compiling
```bash
# Make sure you have a views/ folder
ls views/

# Make sure files have correct extensions (.jsx, .tsx, .ts, .js)
ls views/*.jsx

# Try a one-time build first
snapp build

# Then try watch mode
snapp build -W
```

#### Build doesn't exit
If you ran `snapp build -W` (watch mode) and want it to stop:
- Press `Ctrl+C` to exit watch mode
- Use `snapp build` (no flags) for one-time builds that exit automatically

#### Permission errors
```bash
# On macOS/Linux, use sudo for global installation
sudo npm install -g snapp-kit
```

---

## Why Snapp Kit is Different

**✅ No Dependencies Required**
- No `node_modules` folder needed
- No `package.json` required
- No complex configuration for each project

**✅ Global Installation**
- Install once, use anywhere
- Works in any folder on your system
- Just `snapp build` and you're done

**✅ Flexible Build Modes**
- One-time builds for quick compilation
- Watch mode for active development
- Minification for production deployments

**✅ Instant Page Generation**
- `snapp page <name>` creates ready-to-use templates
- HTML + JSX components generated instantly
- Template variables automatically replaced

**✅ Focus on Simplicity**
- One command does everything: `snapp build`
- Powered by esbuild for ultra-fast compilation
- Zero configuration needed

---

<div align="center">

**⚡ Snapp Kit - Global Build Tool Powered by esbuild**

[🚀 Install Now](#installation) • [📖 Framework Docs](https://github.com/kigemmanuel/snapp) • [💻 GitHub](https://github.com/kigemmanuel/snapp-kit)

*"Install once, build anywhere - no dependencies required"*

</div>