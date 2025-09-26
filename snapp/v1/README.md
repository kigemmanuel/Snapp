
<p align="center">
  <img src="snapp.png" alt="Snapp Framework Logo" width="200">
</p>

# Snapp Framework

> A modern JavaScript framework that renders components **directly to the browser DOM** with **zero virtual DOM overhead**.
<br />
Build **fast, multi-page applications** using the familiar **JSX syntax** you already know.


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📋 Table of Contents

- [Introduction](#introduction)
- [Real-World Examples](#real-world-examples)
- [Installation & Project Structure](#project-structure--kit)
- [Tutorial Section](#tutorial-section)
- [Creator & Support](#creator--support)

---

## Introduction

### What Makes Snapp Different?

Snapp bridges modern JSX/TSX development with traditional DOM manipulation. It's for developers who want component-based architecture while keeping direct browser DOM control.

- **🎯 Direct DOM Control** - JSX/TSX compiles to native DOM operations
- **📄 Multi-Page Native** - Traditional HTML enhanced with modern tooling
- **⚡ Zero Abstraction Overhead** - No virtual DOM, just compiled JavaScript
- **🧹 Memory Efficient** - Snapp automatic cleanup of events and elemenet

- **🚀 Predictable Performance** - You decide and control when and how updates happen
- **🔧 esbuild Integration** - Handles `.js`, `.jsx`, `.ts`, `.tsx` compilation

**JSX/TSX Compilation** → **Native DOM Code** → **Traditional HTML Architecture**

Snapp gives you **manual DOM power** with **modern component convenience**. Know JavaScript and HTML? You already know Snapp.

## Real-World Examples

### Example 1: Dynamic User Profile

**HTML Template :**
```html
<!-- user.html -->
<!DOCTYPE html>
<html>
<head>
    <title>User Profile</title>
    <meta name="description" content="View profile and latest activity">
</head>
<body id="snapp-app">
  <div>
    <h1>User Profile</h1>
    <p>Username</p>
    <p>Age</p>
    <p>Email</p>
  </div>
  <script type="module" src="src/user.js"></script>
</body>
</html>
```

If you don't plan on using server-side rendering, this approach provides good SEO results.

**Reusable Component:**
```jsx
// views/components/UserDetails.jsx
export default const UserDetails = (props) => {
  return (
    <>
      <div>
        <h2>Welcome, {props.data?.username || "Loading..."}</h2>
        <p>Age: {props.data?.age || "Loading..."}</p>
        <p>Email: {props.data?.email || "Loading..."}</p>
        <p>Joined: {props.data?.joinDate || "Loading..."}</p>
      </div>
    </>
  )
}
```

**Main Application Logic:**
```jsx
// views/user.jsx
import snapp from '../snapp.js';
import UserDetails from './components/UserDetails.jsx';

const App = () => {
    const snappBody = document.querySelector("#snapp-app");

    // Fetch user data and render when ready
    fetch('/api/user/123')
      .then(response => response.json())
      .then(data => {
        // Replace loading content with actual data
        snapp.render(snappBody, <UserDetails data={data} />);
    })
    .catch(error => {
      snapp.render(snappBody, (
        <div>
          <h2>Error Loading Profile</h2>
          <p>Please try again later.</p>
        </div>
      ));
    });

    // Return initial loading state
    return <UserDetails data={null} />;
}

const snappBody = document.querySelector("#snapp-app");
snapp.render(snappBody, App());
```

### Example 2: Dynamic Login Form

**HTML Template:**
```html
<!-- login.html -->
<body>
  <div id="snapp-app">
    <h1>Account Access</h1>
    <p>Click login to access your account</p>
  </div>
  <script type="module" src="src/login.js"></script>
</body>
```

**Interactive Component:**
```jsx
// views/login.jsx
import snapp from '../snapp.js';

const App = () => {
  const showLoginForm = snapp.event("click", () => {
    // Get form ID from backend
    fetch('/api/auth/form')
      .then(response => response.json())
      .then(data => {
         const formContainer = snapp.select("#formContainer");
         snapp.render(formContainer, <LoginForm formId={data.id} />);
      });
  });
    
  return (
    <>
      <div id="formContainer">
        <p>Ready to login?</p>
      </div>
        
      <button event={[showLoginForm]}>Login</button>
    </>
  );
}

const LoginForm = (props) => {
  const handleLogin = snapp.event("submit", (e) => {
    e.preventDefault();
    // Handle login logic
    console.log("Login with form ID:", props.formId);
  });

  return (
    <form event={[handleLogin]}>
      <h3>Login (Form: {props.formId})</h3>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

const snappBody = document.querySelector("#snapp-app");
snapp.render(snappBody, App());
```

---

## Project Structure & KIT

### Installation
**Note you install this once globally you do not need to install for all project**

```bash
npm install -g snapp-kit
```
**Read more abould snapp-kit on**
[github](https://github.com/kigemmanuel/Snapp/tree/main/snapp-kit)
**or on**
[npm](https://www.npmjs.com/package/snapp-kit)

### Creating a New Project

```bash
# Create new Snapp project
snapp create my-awesome-app
cd my-awesome-app

# Start development with hot reload
snapp build

# Build for production deployment  
snapp zip
```

### Project Structure

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
├── src/             # 📦 Built JavaScript files (auto-generated)
│   ├── index.js
│   ├── about.js
│   └── user.js
├── index.html       # 📄 Homepage template
├── about.html       # 📄 About page template
├── user.html        # 📄 User page template
└── snapp.js         # ⚡ Snapp core library
```

### How Building Works

1. **Write Components** - Create `.jsx`/`.tsx` files in the `views/` folder
2. **Auto-Build** - `snapp build` watches and compiles files to the `src/` folder
3. **HTML Templates** - Each page has its own HTML file for SEO optimization
4. **Link Together** - HTML files import the built JavaScript from the `src/` folder

### Adding New Pages

```bash
# 1. Create HTML template
touch contact.html

# 2. Create JSX component  
touch views/contact.jsx

# 3. The build system automatically detects and compiles new files
snapp build # Run this once again to enable hot reload during development

# 4. Snapp will build and generate all files in the src folder
```

**Example `contact.html`:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Contact Us - Get In Touch</title>
    <meta name="description" content="Contact our team for support and inquiries">
</head>
<body id="snapp-app">
    <h1>Contact Us</h1>
    <script type="module" src="src/contact.js"></script>
</body>
</html>
```

**Example `views/contact.jsx`:**
```jsx
// views/contact.jsx
import snapp from '../snapp'
import Button from 'components/Button.js'

const App = () => {
    return (
      <>
       <h2>Contact Us</h2>
       {/* Your contact page content */}
       {/* Additional contact page elements */}
       {/* More contact page features */}
      </>
    )
}

const snappBody = document.querySelector("#snapp-app");
snapp.render(snappBody, App());
```

**Snapp build will compile and auto-generate `src/contact.js`**

---

**NOTE: You only need to run 'snapp build' once - it will automatically recompile when you save your code!**

---

## Tutorial Section

### Getting Started - Two Ways to Initialize

#### Method 1: Separate Import
```html
<!-- index.html -->
<div id="snapp-body"></div>
<script type="module">
    import snapp from './snapp.js'
    import App from './src/index.js'

    const snappBody = document.querySelector("#snapp-body");
    snapp.render(snappBody, App());
</script>
```

```jsx
// views/index.jsx
export default const App = () => {
   return <h2>Hello Snapp</h2>
}
```

#### Method 2: Direct Import 
```html
<!-- index.html -->
<div id="snapp-body"></div>
<script type="module" src="src/index.js"></script>
```

```jsx
// views/index.jsx
import snapp from '../snapp'

const App = () => {
    return <h2>Hello Snapp</h2>
}

const snappBody = document.querySelector("#snapp-body");
snapp.render(snappBody, App());
```

You can even use the body element:
```html
<body id="snapp-body"></body>
```

### snapp.render Examples

```jsx
snapp.render(parentElement, component, type) // Render a component with specified type
snapp.render(parentElement, component, 'append') // Will append to existing content
snapp.render(parentElement, component) // Default behavior - replaces existing content
```

Other available types: `'prepend'`, `'after'`, `'before'`, `'replace'`

### snapp.on Example

Use `snapp.on("DOM", callback)` when you need to access DOM elements after they're rendered:

```jsx
snapp.on("DOM", () => {
    // This runs once the elements have been rendered to the DOM
    // This is useful when you need to access the elements!
})
```

**Why do you need snapp.on("DOM")?**

JavaScript runs before elements are rendered to the DOM, so you need `snapp.on("DOM")` to ensure elements exist before accessing them:

```jsx
const App = () => {
    snapp.select("#hello") // This runs first, before element is in DOM - returns null
    
    snapp.on("DOM", () => {
        // Runs once when elements are rendered to DOM
        snapp.select("#hello") // This works because it runs after element is in DOM
    })
    
    const someFunction = () => {
        snapp.select("#hello") // This works because the function runs when user interacts,
                              // which can only happen after element is in DOM
    }
    
    return <h2 onclick={() => someFunction()} id="hello">Hello Snapp</h2>
}
```

### snapp.select Examples

```jsx
snapp.select("#element") // Select single element
snapp.select(["#el1", "#el2"]) // Select multiple elements, returns array
snapp.selectAll(".class") // Select all elements with same class/selector
snapp.selectAll([".class1", ".class2"]) // Returns arrays of arrays of elements
```

### snapp.event Examples

```jsx
const loadNewMsg = snapp.event("click", callback)
const anotherEvent = snapp.event("click", callback)

<div id="loadMsg" event={[loadNewMsg]}>Click me</div>

// Multiple events on same element
<div event={[loadNewMsg, anotherEvent]}>Multiple events</div>
```

You can also pass parameters to your events:
```jsx
const loginBtn = snapp.event("click", (e, param) => {
    // e is the element that was clicked (e.target)
    // param contains your custom parameters
    console.log(param) // {id: 36392375923}
})

<div event={[loginBtn, {id: 36392375923}]}>Click Snapp</div>
```

**Event Delegation:** `snapp.event` uses event delegation - it adds one event listener to the document. This is optimal for applications with many interactive elements!

When an element is removed from the DOM, Snapp automatically removes that element's event instance and parameters. The `snapp.event` handler remains available for all other elements using the same event.

### onClick / onclick Examples

```jsx
<button onclick={() => alert("Hello Snapp")}>Call Hello Snapp</button>
<button onClick={() => login()}>Login</button>
<button onclick={() => {
    // Perform multiple actions
    // Handle complex logic  
    // Execute additional functions
}}>Login</button>

// Snapp Attribute Naming
// Snapp follows HTML attribute naming conventions:

<button ondblclick={() => alert("Hi!")}>Double Click</button> // ✅ Will work
<button onDoubleClick={() => alert("Hi!")}>Double Click</button> // ❌ Won't work
```

Snapp uses HTML attribute naming and converts everything to lowercase. `onClick` is treated the same as `onclick`.

**Note:** Attribute names like `"className"` or `"class"` will work, `"htmlFor"` or `"for"` will work. All camelCase is converted to lowercase: `"onClick"` becomes `"onclick"`, etc.

Snapp will support both HTML/JSX style attribute names in future versions, but currently uses HTML attribute naming conventions.

**Snapp Cleanup:** Snapp tracks each element and its event listeners! When an element is removed from the DOM, Snapp automatically removes all event listeners attached to that element!

### snapp.remove Examples

```jsx
const [msgBody, feedBody] = snapp.select(["#msgBody", "#feedBody"])
snapp.remove([msgBody]) // Remove msgBody from the DOM

const sayHello = snapp.event("click", () => {})
snapp.remove([sayHello]) // Remove the event listener

snapp.remove([msgBody, feedBody, sayHello]) // Remove elements from DOM and event listeners
```

When you remove an event, all element parameters attached to it are automatically cleaned up!

### snapp.css Examples

```jsx
const divStyle = snapp.css({
    color: "red",
    background: "red"
})
<div css={divStyle}>This is cool</div>
```

You can use either syntax: `"background": "red"` or `background: "red"`:
```jsx
const divStyle = snapp.css({
    "background-color": "red"
})

// Dynamic styling
const darkMode = false;
const style = snapp.css({
    color: darkMode ? "white" : "black",
    "background-color": darkMode ? "black" : "white"
})
<h2 css={style}>Hello Snapp</h2>

// Direct object without snapp.css
<h2 css={{color: "red"}}>Hi Snapp</h2>

// Using style attribute
<div style={{color: "red"}}>This is a div</div>
```

**Difference between `snapp.css/css` and `style`:**
- `snapp.css/css` follows CSS syntax
- `style` follows JavaScript syntax

`backgroundColor: "red"` (camelCase) won't work with `snapp.css` and `css={}` but will work for `style`. `"background-color": "red"` (CSS syntax) works with both `snapp.css` and `css` but not with `style`!

### snapp.applycss Examples

```jsx
const redBg = snapp.css({
    "background-color": "red"
})

snapp.on("DOM", () => {
    const myDiv = snapp.select("#myDiv")
    
    snapp.applycss(myDiv, redBg)
    snapp.applycss(myDiv, redBg, true) // Using 'true' replaces any existing inline styles
})

<div id="myDiv">My Div</div>
```

Multiple elements:
```jsx
const redBg = snapp.css({
    "background-color": "red"
})

const anotherCss = snapp.css({
    "color": "white"
})

snapp.on("DOM", () => {
    const [myDiv, myHeader] = snapp.select(["#myDiv", ".myHeader"])
    
    snapp.applycss([myDiv, myHeader], [redBg, anotherCss])
    // applycss accepts arrays of elements and arrays of CSS
})
```

### snapp.applystyle Examples

`snapp.applystyle` is similar to `applycss` but supports JavaScript CSS syntax (camelCase):

```jsx
snapp.on("DOM", () => {
    const [hello, wow] = snapp.select(["#hello", "#wow"])
    
    snapp.applystyle([hello, wow], {
        fontSize: "50px"
    })
})

<p id="hello">Hello World</p>
<p id="wow">Hello World</p>
```

**Cleanup:** Use `snapp.applycss(element, "", true)` to remove all previous inline CSS/styles.

You should use `snapp.applycss` with `snapp.css`:
```jsx
const myCSS = snapp.css({
    "color": "blue"
})
snapp.applycss(element, myCSS)
```

---

## Creator & Support

### Creator

**Kig Emmanuel** - *Framework Creator*
- Passionate JavaScript developer who created Snapp to bridge the gap between modern component development and traditional multi-page applications
- Focused on performance, simplicity, and developer experience

### Support & Community

- 🐛 **Report Issues**: [GitHub Issues](https://github.com/kigemmanuel/snapp/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/kigemmanuel/snapp/discussions)
- 📧 **Direct Contact**: Feel free to reach out with questions or suggestions
- ⭐ **Show Support**: Star the project on GitHub if Snapp helps you build better web applications!

### Contributing

We welcome contributions from the community! Whether it's:
- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation improvements
- 🎯 Example applications
- 🧪 Testing and feedback

Every contribution helps make Snapp better for everyone.

---

<div align="center">

**⚡ Built with Snapp Framework - Fast, Simple, Powerful**

[🚀 Get Started](#introduction) • [📖 Tutorial](#tutorial-section) • [💻 GitHub](https://github.com/kigemmanuel/snapp)

*"Snapp: Where modern development meets traditional web architecture"*

</div>