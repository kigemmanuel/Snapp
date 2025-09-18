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
- **🔄 Live Building** - Automatic rebuilding on file changes
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

# 2. Start building (watches for changes)
snapp build

# 3. Edit files in views/ folder - they automatically compile to src/
```

**Or use in any existing folder:**

```bash
# Navigate to any snapp project folder
cd /path/to/my-existing-project

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
├── src/
├── index.html          # HTML templates
├── snapp.js           # Framework file
└── README.md
```

### `snapp build`

**The main command** - compiles JSX/TSX files from `views/` to `src/` folder.

```bash
snapp build
```

**What happens:**
- Watches `views/` folder for changes
- Compiles `.jsx`, `.tsx`, `.ts`, `.js` files using **esbuild**
- Outputs vanilla JavaScript to `src/` folder
- Runs continuously until you stop it (Ctrl+C)

### `snapp zip`

Compiles everything and creates a production-ready zip file.

```bash
snapp zip
```

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
snapp build
```

### File Compilation with esbuild

Snapp Kit uses **esbuild** (fast JavaScript bundler) to compile your files:

```
views/index.jsx     →  src/index.js
views/about.tsx     →  src/about.js
views/components/   →  src/components/
```

**Supported formats:**
- `.jsx` → `.js` (React-like JSX)
- `.tsx` → `.js` (TypeScript JSX)
- `.ts` → `.js` (TypeScript)
- `.js` → `.js` (Modern JavaScript)

---

## Examples

### Example 1: Use in Any Folder

```bash
# Go to any folder
mkdir my-simple-site
cd my-simple-site

# Create a views folder and JSX file
mkdir views
echo 'export default () => <h1>Hello World</h1>' > views/index.jsx

# Build it
snapp build
# ✅ Creates src/index.js automatically
```

### Example 2: Working with Existing Projects

```bash
# You have an existing snapp project
cd my-existing-website

# Just start building
snapp build
# ✅ Compiles any JSX/TSX files in views/ folder
```

### Example 3: Complete Project Structure

```
my-website/
├── views/                    # Your source files
│   ├── index.jsx            # Homepage
│   ├── about.jsx            # About page  
│   ├── contact.tsx          # Contact (TypeScript)
│   └── components/          # Reusable components
│       ├── Header.jsx
│       └── Footer.jsx
├── src/                     # Auto-generated (don't edit)
│   ├── index.js
│   ├── about.js
│   └── contact.js
├── index.html               # Your HTML templates
├── about.html
├── contact.html
└── snapp.js                # Snapp framework
```

### Example 4: Real JSX File

```jsx
// views/index.jsx
import snapp from '../snapp.js';

const App = () => {
    const handleClick = () => {
        alert('Hello from Snapp!');
    };

    return (
        <>
            <h1>Welcome to My Site</h1>
            <button onclick={handleClick}>Click me</button>
        </>
    );
}

const snappBody = document.querySelector("#snapp-app");
snapp.render(snappBody, App());
```

**After `snapp build`:**
```javascript
// src/index.js (auto-generated vanilla JavaScript)
import snapp from '../snapp.js';

const App = () => {
    const handleClick = () => {
        alert('Hello from Snapp!');
    };

    return snapp.createElement('div', {}, 
        snapp.create('h1', {}, 'Welcome to My Site'),
        snapp.create('button', { onclick: handleClick }, 'Click me')
    );
}

const snappBody = document.querySelector("#snapp-app");
snapp.render(snappBody, App());
```

---

## Troubleshooting

### Common Questions

#### "Do I need to install Snapp Kit in every project?"
**No!** Install once globally, use everywhere.

#### "Do I need package.json or node_modules?"
**No!** Snapp Kit works without any project dependencies.

#### "Can I use it in an existing website?"
**Yes!** Just create a `views/` folder and start building.

#### "What if I don't have a views/ folder?"
Snapp Kit will show an error. Create the folder and add your JSX files there.

### Common Issues

#### Command not found: snapp
```bash
# Reinstall globally
npm install -g snapp-kit

# Check if it's in your PATH
snapp --version
```

#### Files not compiling
```bash
# Make sure you have a views/ folder
ls views/

# Make sure files have correct extensions (.jsx, .tsx, .ts, .js)
ls views/*.jsx

# Restart the build process
snapp build
```

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
- No complex configuration folder each project

**✅ Global Installation**
- Install once, use anywhere
- Works in any folder on your system
- Just `snapp build` and you're done

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