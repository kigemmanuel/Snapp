
const Snapp = {
  create: (element, props, ...children) => {
    const flatChildren = flattenChildren(children);
    if (element != "<>" && typeof element === "string") {

      return createElement(element, props, flatChildren);

    } else if (typeof element === 'function') {

      return createComponent(element, props, flatChildren);
      
    } else if (element === "<>") {
        return flatChildren;
    }
  },

  render: (body, App) => {
    // console.log(App)
    body.replaceChildren(App);
  },

  append: (body, App) => {
    body.append(App)
  },

  prepend: (body, App) => {
    body.prepend(App)
  },

  before: (body, App) => {
    body.before(App)
  },

  after: (body, App) => {
    body.after(App)
  },

  empty: (body) => {
    body.replaceChildren();
  },

  remove: (body) => {
    body.remove()
  }
//  Next one

  
}

const createElement = (element, props, children) => {
  const ele = document.createElement(element);
  if (props) {
      for (const [key, value] of Object.entries(props)) {
        ele.setAttribute(key, value)
      }
  }
  
  children.map(node => {
    if (typeof node === 'string' || typeof node === 'number' || node instanceof Element) {
        ele.append(node);
    }
  });

  return ele;
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