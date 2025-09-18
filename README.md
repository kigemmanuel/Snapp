# Snapp Framework

> **Modern JavaScript framework that renders components directly to the browser DOM with zero virtual DOM overhead. Build fast, SEO-optimized multi-page applications using familiar JSX syntax.**

[![npm version](https://badge.fury.io/js/snapp-framework.svg)](https://www.npmjs.com/package/snapp-framework)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📋 Table of Contents

- [Introduction](#introduction)
- [Real-World Examples](#real-world-examples)
- [Project Structure & CLI](#project-structure--cli)
- [Tutorial Section](#tutorial-section)
- [Creator & Support](#creator--support)

---

## Introduction

### What Makes Snapp Different?

Snapp is a modern JavaScript framework that **renders components directly to the browser DOM** without virtual DOM layers. Built for developers who want modern component architecture with traditional multi-page benefits.

- **🚀 Direct DOM Rendering** - No virtual DOM means instant updates and superior performance
- **📱 SEO-First Design** - Each page has its own HTML template for perfect search engine optimization
- **🧹 Smart Memory Management** - Automatic event cleanup and memory leak prevention  
- **⚛️ JSX/TSX Support** - Write components using familiar JSX syntax
- **📦 Multi-Page Architecture** - Traditional routing with modern component development
- **🔧 Built-in Build System** - esbuild integration for `.js`, `.jsx`, `.ts`, `.tsx`

Unlike other frameworks, Snapp requires no additional learning curve - if you know JavaScript and HTML, you know Snapp.

### Why Choose Snapp?

| Feature | Snapp | Other Frameworks |
|---------|-------|------------------|
| **DOM Rendering** | Direct to browser DOM | Virtual DOM diffing |
| **SEO** | Native HTML templates | SSR complexity |
| **Performance** | No reconciliation overhead | Virtual DOM overhead |
| **Architecture** | Multi-page apps | Single Page Apps |
| **Learning Curve** | Minimal - just JavaScript | Framework-specific concepts |
| **Bundle Size** | Tiny core library | Large framework + dependencies |

---

## Real-World Examples

### Example 1: Dynamic User Profile

**HTML Template (SEO-optimized):**
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
        <p>Username: loading...</p>
        <p>Age: loading...</p>
        <p>Email: loading...</p>
    </div>
    <script type="module" src="src/user.js"></script>
</body>
</html>
```

**This is what search engine crawlers see for SEO.** If you don't plan on using server-side rendering, this is the best choice. Server-side rendering is still possible with Snapp but we won't cover that here.

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
            // Replace loading content with real data
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
        // Get form from backend
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
        // Handle login
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

## Project Structure & CLI

### Installation

```bash
npm install -g snapp-cli
```

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
├── views/              # 🎯 Source JSX/TSX components
│   ├── index.jsx       # Main page component
│   ├── about.jsx       # About page component  
│   ├── user.jsx        # User profile component
│   └── components/     # Reusable components
│       ├── Header.jsx
│       ├── Footer.jsx
│       └── UserCard.jsx
├── src/                # 📦 Built JavaScript files (auto-generated)
│   ├── index.js        # Built from views/index.jsx
│   ├── about.js        # Built from views/about.jsx
│   └── user.js         # Built from views/user.jsx
├── index.html          # 📄 Homepage template
├── about.html          # 📄 About page template
├── user.html           # 📄 User page template
└── snapp.js           # ⚡ Snapp core library
```

### How Building Works

1. **Write Components** - Create `.jsx`/`.tsx` files in `views/` folder
2. **Auto-Build** - `snapp build` watches and compiles to `src/` folder
3. **HTML Templates** - Each page has its own HTML file for SEO
4. **Link Together** - HTML files import the built JavaScript from `src/`

### Adding New Pages

```bash
# 1. Create HTML template
touch contact.html

# 2. Create JSX component  
touch views/contact.jsx

# 3. Build system automatically detects and compiles
snapp build
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
    <p>Loading contact form...</p>
    <script type="module" src="src/contact.js"></script>
</body>
</html>
```

---

## Tutorial Section

### Getting Started - Two Ways to Initialize

#### Method 1: Separate Import
```html
<!-- index.html -->
<div id="Snapp-Body"></div>
<script type="module">
    import snapp from './Snapp.js'
    import App from './src/index.js'

    const snappBody = document.querySelector("#Snapp-Body");
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
<div id="Snapp-Body"></div>
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

You can even use body:
```html
<body id="Snapp-Body"></body>
```

### snapp.render Example

```jsx
snapp.render(parentElement, component, type) // To render a component
snapp.render(parentElement, component, 'append') // Will append
snapp.render(parentElement, component) // Default will replace what is on parentElement
```

Other types are `'prepend'`, `'after'`, `'before'`, `'replace'`

### snapp.on Example

Use `snapp.on("DOM", callback)` when you need to access DOM elements after they're loaded:

```jsx
snapp.on("DOM", () => {
    // This will run once the elements have been loaded to DOM
    // This is useful when you want to access the elements!
})
```

**Why do you need snapp.on("DOM")?**

JavaScript runs before elements are rendered to the DOM, so you need `snapp.on("DOM")` to ensure elements exist before accessing them:

```jsx
const App = () => {
    snapp.select("#hello") // This runs first, before element is in DOM - returns null
    
    snapp.on("DOM", () => {
        // Runs once when elements are rendered to DOM
        snapp.select("#hello") // Will work because it runs after element is in DOM
    })
    
    const someFunction = () => {
        snapp.select("#hello") // This is fine because the function runs when user clicks
                              // the button, which can only happen after element is in DOM
    }
    
    return <h2 onclick={() => someFunction()} id="hello">Hello Snapp</h2>
}
```

### snapp.select Example

```jsx
snapp.select() // for single element
snapp.select([]) // for multiple elements return [array]
snapp.selectAll() // for multiple elements with same id, class etc.
snapp.selectAll([]) // returns arrays of array of elements
```

### snapp.event Example

```jsx
const loadNewMsg = snapp.event("click", callBack)
const anotherEvent = snapp.event("click", callBack)

<div id="loadMsg" event={[loadNewMsg]}>Click me</div>

// Multiple events
<div event={[[loadNewMsg], [anotherEvent]]}>Multiple events</div>
```

You can also pass parameters to your event:
```jsx
const loginBtn = snapp.event("click", (e, param) => {
    // e is the element that was clicked, e.target
    // param is for parameter
    console.log(param) // {id: 36392375923}
})

<div event={[loginBtn, {id: 36392375923}]}>Click Snapp</div>
```

**Event Delegation:** `snapp.event` uses event delegation - it adds one event listener to the document. This is optimal for heavy applications with many interactive elements!

Any time an element is removed from the DOM, Snapp automatically removes that element's event instance and parameters. The `snapp.event` handler will still be available for all other elements using the same event.

### onClick / onclick Example

```jsx
<button onclick={() => alert("Hello Snapp")}>Call Hello snapp</button>
<button onClick={() => login()}>Login</button>
<button onclick={() => {
    // Do something
    // Do something  
    // Do something
}}>Login</button>
```

**Snapp Attribute Naming:** Snapp follows HTML attribute naming conventions:
```jsx
<button ondblclick={() => alert("Hi!")}>Double Click</button> // Will work
<button onDoubleClick={() => alert("Hi!")}>Double Click</button> // Won't work
```

Snapp uses HTML attribute naming and doesn't care about camelCase - it converts everything to lowercase.
`onClick` is treated the same as `onclick`.

**Note:** Attribute names like `"className"` or `"class"` will work, `"htmlFor"` or `"for"` will work.
All camelCase will be converted to lowercase: `"onClick"` becomes `"onclick"`, etc.

Snapp will support both HTML/JSX style attribute names in future versions, but currently supports HTML attribute naming.

**Snapp Cleanup:** Snapp keeps track of each element and its event listeners!
If an element is removed from the DOM, Snapp also removes all event listeners attached to that element!

### snapp.remove Example

```jsx
const [msgBody, feedBody] = snapp.select(["#msgBody", "#feedBody"])
snapp.remove([msgBody]) // Will remove msgBody from the dom

const sayHello = snapp.event("click", () => {})
snapp.remove([sayHello]) // Will remove the event

snapp.remove([msgBody, feedBody, sayHello]) // Remove elements from DOM and remove event
```

Anytime you remove an event, all element parameters attached to it get cleaned up!

### snapp.css Example

```jsx
const divStyle = snapp.css({
    color: "red",
    background: "red"
})
<div css={divStyle}>This is cool</div>
```

You can use `"background": "red"` or `background: "red"`:
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
<h2 css={{"color": "red"}}>Hi Snapp</h2>

// Using style attribute
<div style={{"color": "red"}}>This is a div</div>
```

**Difference between `snapp.css/css` and `style`:**
- `snapp.css/css` follows CSS syntax
- `style` follows JavaScript syntax

`backgroundColor: "red"` (camelCase) won't work with `snapp.css` and `css={}` but will work for `style`.
`"background-color": "red"` (CSS syntax) will work for both `snapp.css` and `css` but won't work for `style`!

### snapp.applycss Example

```jsx
const redBg = snapp.css({
    "background-color": "red"
})

snapp.on("DOM", () => {
    const myDiv = snapp.select("#myDiv")
    
    snapp.applycss(myDiv, redBg)
    snapp.applycss(myDiv, redBg, true) // using 'true' will replace any other inline style and css text in the element
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

### snapp.applystyle Example

`snapp.applystyle` is similar to `applycss` but supports JavaScript CSS syntax/camel case:

```jsx
snapp.on("DOM", () => {
    const [hello, wow] = snapp.select(["#Hello", "#wow"])
    
    snapp.applystyle([hello, wow], {
        fontSize: "50px"
    })
})

<p id="Hello">Hello World</p>
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
