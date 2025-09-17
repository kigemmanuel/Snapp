# 🚀 Snapp Framework

> **Lightning-fast JSX framework for multi-page applications with zero virtual DOM overhead**

[![npm version](https://badge.fury.io/js/snapp-framework.svg)](https://www.npmjs.com/package/snapp-framework)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-blue)](https://www.typescriptlang.org/)

## 🌟 What is Snapp?

Snapp is a revolutionary JavaScript framework that combines the developer experience of React with the SEO benefits of traditional multi-page applications. Unlike SPA frameworks, Snapp renders directly to the DOM without any virtual DOM overhead, making it blazingly fast while maintaining excellent SEO performance.

### ⚡ Why Choose Snapp?

- **🎯 Direct DOM Rendering** - No virtual DOM means instant updates and better performance
- **📱 SEO-First Design** - Each page has its own HTML template for perfect SEO
- **🔄 Multi-Page Architecture** - Traditional routing with modern component development  
- **⚛️ JSX/TSX Support** - Write components like React but render like vanilla JS
- **🧹 Automatic Cleanup** - Smart event and memory management
- **📦 Zero Dependencies** - Lightweight core with no external dependencies
- **🔧 Modern Tooling** - Built-in TypeScript, JSX, and hot reload support

---

## 🚀 Quick Start

### Installation

```bash
npm install -g snapp-cli
```

### Create Your First Snapp App

```bash
# Create new project
snapp new my-awesome-app
cd my-awesome-app

# Start development
snapp build

# Build for production
snapp zip
```

---

## 📁 Project Structure

```
my-app/
├── views/           # Your JSX/TSX components (source files)
│   ├── index.jsx
│   ├── about.jsx
│   └── components/
│       └── Header.jsx
├── src/             # Built JavaScript files (auto-generated)
├── index.html       # HTML templates
├── about.html
└── snapp.js        # Snapp core library
```

---

## 🎯 Core Concepts

### 1. **Multi-Page Architecture**

Each page in your app has its own HTML file and corresponding JSX component:

**File: `user.html`**
```html
<!DOCTYPE html>
<html>
<head>
    <title>User Profile</title>
    <meta name="description" content="User profile page with dynamic content">
</head>
<body id="snapp-app">
    <div>
        <h1>User Profile</h1>
        <p>Username: loading...</p>
        <p>Age: loading...</p>
    </div>
    <script type="module" src="src/user.js"></script>
</body>
</html>
```

**File: `views/user.jsx`**
```jsx
import snapp from '../snapp.js'
import UserDetails from './components/UserDetails.jsx'

const App = () => {
    const [userData, setUserData] = useState(null);
    
    // Fetch user data
    useEffect(() => {
        fetch('/api/user/123')
            .then(response => response.json())
            .then(data => {
                const snappBody = document.querySelector("#snapp-app");
                snapp.render(snappBody, <UserDetails data={data} />);
            });
    }, []);

    return <UserDetails data={userData} />;
}

const snappBody = document.querySelector("#snapp-app");
snapp.render(snappBody, App());
```

**File: `views/components/UserDetails.jsx`**
```jsx
export default const UserDetails = (props) => {
    return (
        <>
            <div>
                <h2>Welcome, {props.data?.username || "Loading..."}</h2>
                <p>Age: {props.data?.age || "Loading..."}</p>
                <p>Email: {props.data?.email || "Loading..."}</p>
            </div>
        </>
    )
}
```

### 2. **SEO-Optimized Templates**

Your HTML files serve as templates with initial content for SEO, then JavaScript enhances them:

```html
<body id="snapp-app">
    <!-- SEO-friendly initial content -->
    <h1>Best Products of 2024</h1>
    <p>Discover our top-rated products with excellent reviews...</p>
    
    <!-- Snapp will enhance this with dynamic content -->
    <script type="module" src="src/products.js"></script>
</body>
```

---

## 🎨 Component Development

### Basic Component

```jsx
const Welcome = (props) => {
    return (
        <>
            <h1>Welcome to {props.appName}!</h1>
            <p>You have {props.notifications} new notifications</p>
        </>
    );
}
```

### Interactive Components

```jsx
const LoginForm = () => {
    const handleLogin = snapp.event("click", (e, params) => {
        const email = snapp.select("#email").value;
        const password = snapp.select("#password").value;
        
        // Handle login logic
        console.log("Logging in:", email, params.formType);
    });

    return (
        <form>
            <input id="email" type="email" placeholder="Email" />
            <input id="password" type="password" placeholder="Password" />
            <button event={[handleLogin, {formType: "standard"}]}>
                Login
            </button>
        </form>
    );
}
```

---

## 📚 API Reference

### Core Rendering

#### `snapp.render(element, component, type?)`
Renders a component to a DOM element.

```jsx
const app = <MyComponent />;
const container = document.querySelector("#app");

// Replace content (default)
snapp.render(container, app);

// Append to existing content
snapp.render(container, app, 'append');

// Other options: 'prepend', 'after', 'before', 'replace'
```

### Event Management

#### `snapp.event(eventType, callback)`
Creates reusable event handlers with automatic cleanup.

```jsx
const clickHandler = snapp.event("click", (e, params) => {
    console.log("Clicked:", e.target, params);
});

// Use in JSX
<button event={[clickHandler, {id: 123}]}>Click me</button>

// Multiple events
<div event={[[clickHandler], [anotherEvent]]}>Multi-event element</div>
```

#### `snapp.remove(items)`
Removes elements or events with automatic cleanup.

```jsx
const [element1, element2] = snapp.select(["#item1", "#item2"]);
const myEvent = snapp.event("click", () => {});

// Remove elements and events
snapp.remove([element1, element2, myEvent]);
```

### DOM Selection

#### `snapp.select(selector)` / `snapp.selectAll(selector)`

```jsx
// Single element
const header = snapp.select("#header");

// Multiple elements
const [nav, footer] = snapp.select(["nav", "footer"]);

// All matching elements
const allButtons = snapp.selectAll("button");
```

### Styling

#### `snapp.css(styles)` - CSS Syntax
```jsx
const buttonStyles = snapp.css({
    "background-color": "blue",
    "border-radius": "8px",
    "padding": "12px 24px"
});

<button css={buttonStyles}>Styled Button</button>
```

#### `snapp.applycss(element, styles, replace?)`
```jsx
snapp.on("DOM", () => {
    const button = snapp.select("#myButton");
    const styles = snapp.css({"color": "red"});
    
    snapp.applycss(button, styles);
    // snapp.applycss(button, styles, true); // Replace existing styles
});
```

#### `snapp.applystyle(element, styles)` - JavaScript Syntax
```jsx
snapp.on("DOM", () => {
    const elements = snapp.select(["#header", "#footer"]);
    
    snapp.applystyle(elements, {
        fontSize: "18px",
        backgroundColor: "navy"
    });
});
```

### Lifecycle Events

#### `snapp.on(event, callback)`
```jsx
snapp.on("DOM", () => {
    // Runs when elements are ready in the DOM
    console.log("DOM is ready!");
    
    const button = snapp.select("#dynamicButton");
    // Now you can safely interact with the element
});
```

---

## 💡 Real-World Examples

### Dynamic Form Loading

**File: `account.html`**
```html
<body>
    <div id="snapp-app">
        <h1>Account Dashboard</h1>
        <p>Manage your account settings</p>
    </div>
    <script type="module" src="src/account.js"></script>
</body>
```

**File: `views/account.jsx`**
```jsx
import snapp from '../snapp.js';
import DynamicForm from './components/DynamicForm.jsx';

const App = () => {
    const loadForm = snapp.event("click", async (e, params) => {
        try {
            // Fetch form configuration from API
            const response = await fetch(`/api/forms/${params.formId}`);
            const formConfig = await response.json();
            
            const formSection = snapp.select("#formSection");
            snapp.render(formSection, <DynamicForm config={formConfig} />);
        } catch (error) {
            console.error("Failed to load form:", error);
        }
    });

    return (
        <>
            <h2>Dynamic Forms</h2>
            <section id="formSection">
                <p>Click a button below to load a form</p>
            </section>
            
            <button event={[loadForm, {formId: "contact"}]}>
                Load Contact Form
            </button>
            <button event={[loadForm, {formId: "survey"}]}>
                Load Survey Form
            </button>
        </>
    );
}

const snappBody = document.querySelector("#snapp-app");
snapp.render(snappBody, App());
```

### E-commerce Product Page

```jsx
const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useState([]);
    
    const addToCart = snapp.event("click", (e, params) => {
        const newItem = {
            id: params.productId,
            name: params.productName,
            price: params.price
        };
        
        setCart([...cart, newItem]);
        
        // Update cart display
        const cartCount = snapp.select("#cart-count");
        snapp.render(cartCount, cart.length, 'replace');
    });

    return (
        <>
            <div className="product-gallery">
                <img src={product?.image} alt={product?.name} />
            </div>
            
            <div className="product-info">
                <h1>{product?.name}</h1>
                <p className="price">${product?.price}</p>
                <p>{product?.description}</p>
                
                <button 
                    event={[addToCart, {
                        productId: product?.id,
                        productName: product?.name,
                        price: product?.price
                    }]}
                    css={{
                        "background-color": "#007bff",
                        "color": "white",
                        "padding": "12px 24px",
                        "border": "none",
                        "border-radius": "6px"
                    }}
                >
                    Add to Cart
                </button>
            </div>
            
            <div id="cart-count" className="cart-indicator">
                {cart.length}
            </div>
        </>
    );
}
```

---

## 🔧 Build System

Snapp includes a powerful build system that transforms your JSX/TSX files:

### Development Mode
```bash
snapp build
```
- Watches for file changes
- Compiles JSX/TSX to optimized JavaScript  
- Supports hot reload
- Source maps for debugging

### Production Build
```bash
snapp zip
```
- Minifies JavaScript
- Optimizes assets
- Creates deployment-ready ZIP file
- Excludes source files (`views/` folder)

### Supported File Types
- `.js` - JavaScript with JSX support
- `.jsx` - JSX components
- `.ts` - TypeScript
- `.tsx` - TypeScript with JSX

---

## 🎯 Use Cases

### Perfect for:
- **Marketing Websites** - Each page optimized for different keywords
- **E-commerce Sites** - Product pages with rich SEO data
- **Documentation Sites** - Fast navigation with great search indexing  
- **Business Applications** - Multi-section apps with distinct functionalities
- **Progressive Enhancement** - Start with HTML, enhance with JavaScript

### Migration-Friendly:
- **From jQuery** - Similar DOM manipulation, modern component architecture
- **From Server-Side Rendering** - Keep your HTML structure, add interactivity
- **From Static Sites** - Gradually add dynamic features

---

## 🚀 Performance Benefits

### No Virtual DOM Overhead
- **Direct DOM updates** mean faster rendering
- **Lower memory usage** without virtual tree maintenance  
- **Smaller bundle sizes** with zero runtime dependencies

### Smart Event Management
- **Event delegation** reduces memory footprint
- **Automatic cleanup** prevents memory leaks
- **Efficient updates** only change what's necessary

### SEO Advantages
- **Server-side friendly** HTML templates
- **Fast initial page loads** with progressive enhancement
- **Search engine optimization** built-in from day one

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Setup
```bash
git clone https://github.com/kigemmanuel/snapp.git
cd snapp
npm install
npm run dev
```

---

## 📄 License

MIT License - see [LICENSE.md](LICENSE.md) for details.

---

## 👨‍💻 Creator

**Kig Emmanuel** - *Framework Creator*
- GitHub: [@kigemmanuel](https://github.com/kigemmanuel)
- Feel free to report issues, bugs, or suggestions!

---

## 📞 Support

- 📚 **Documentation**: [docs.snapp-framework.com](https://docs.snapp-framework.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/kigemmanuel/snapp/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/kigemmanuel/snapp/discussions)
- 📧 **Email**: support@snapp-framework.com

---

<div align="center">

**⭐ Star us on GitHub if Snapp helps you build amazing web applications!**

[⚡ Get Started](https://github.com/kigemmanuel/snapp#quick-start) • [📖 Documentation](https://docs.snapp-framework.com) • [🎯 Examples](https://github.com/kigemmanuel/snapp-examples)

</div>