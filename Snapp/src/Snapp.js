
const Snapp = {
  create: (element, props, ...children) => {

    const flatChildren = flattenChildren(children);

    if (element != "<>" && typeof element === "string") {
      return createElement(element, props, flatChildren);
    }
    else if (typeof element === 'function') {
      return createComponent(element, props, flatChildren);
    }
    else if (element === "<>") {
        return createFragment(flatChildren);
    }

  },

  // Render Helper

  render: (body, App) => {
    body.replaceChildren(App);
    document.dispatchEvent(new Event("DOM"))
    console.log(App)
  },
  
  append: (body, App) => {
    body.append(App)
    document.dispatchEvent(new Event("DOM"))
  },
  
  prepend: (body, App) => {
    body.prepend(App)
    document.dispatchEvent(new Event("DOM"))
  },
  
  before: (body, App) => {
    body.before(App)
    document.dispatchEvent(new Event("DOM"))
  },
  
  after: (body, App) => {
    body.after(App)
    document.dispatchEvent(new Event("DOM"))
  },
  
  empty: (body) => {
    body.replaceChildren();
    document.dispatchEvent(new Event("EMPTY"))
  },
  
  remove: (body) => {
    body.remove()
    document.dispatchEvent(new Event("REMOVE"))
  }

  // Runtime helpper

  
  
}

const createElement = (element, props, children) => {
  const ele = document.createElement(element);
  if (props) {
      for (const [key, value] of Object.entries(props)) {
        ele.setAttribute(key, value)
      }
  }
  
  children.map(node => {
    if (typeof node === 'string' || typeof node === 'number' || node instanceof Element ||  node instanceof DocumentFragment) {
        ele.append(node);
    }
  });

  return ele;
}

const createFragment = (children) => {
  const frag = document.createDocumentFragment();

  children.map(node => {
    console.log(typeof node, node)
    if (typeof node === 'string' || typeof node === 'number' || node instanceof Element || node instanceof DocumentFragment) {
        frag.append(node);
    }
  });

  console.log("Fragmeent: ", frag instanceof DocumentFragment)
  return frag;
}

const createComponent = (element, props, children) => {
  const totalProps = {...props, props: children};  
  const comp = element(totalProps);

  return comp;
}

const flattenChildren = (children) => {
    const final = []

    for (const child of children) {
        if (Array.isArray(child)) {
            final.push(...flattenChildren(child))
        } else if (child !== null && child !== undefined && child !== '' && child !== false) {
            final.push(child)
        }
    }

    return final
}

export default Snapp;