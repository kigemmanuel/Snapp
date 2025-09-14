

const snapp = (() => {
  const create = (element, props, ...children) => {
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
  }

  const render = (body, App, type) => {
    switch (true) {
      case (type === "append"):
        body.append(App);
        break;
    
      default:
        body.replaceChildren(App);
        break;
      }
    document.dispatchEvent(new Event("DOM"))
  }

  const on = (eventName, callBack) => {
    document.addEventListener(eventName, callBack, { once: true })
  }

  const select = (name) => {
    if (typeof name === "string") return document.querySelector(name)
    return document.querySelectorAll(name);
  }

  var dataCount = 0;
  const globalEvent = {};
  const globalParamater = {};

  const event = (name, eventType, callBack, replace = false) => {
    if (!(eventType in globalEvent)) {
      globalEvent[eventType] = [];

      document.addEventListener(eventType, (element) => {
        const name = element.target.getAttribute("snapp-e-"+eventType);
        const dataEvent = element.target.getAttribute("snapp-data-event");
        if (name) {
          const parameter = globalParamater[dataEvent]?.[eventType];

          globalEvent[eventType][name](element, parameter);
        }
      })
    }

    if (globalEvent[eventType][name] && !replace) {
      console.warn(`REJECT: Can not add event with already existing name "${name}", use 'true' to replace`);
      return "REJECT"
    }
    globalEvent[eventType][name] = callBack;

    return name
  }
  
  const createElement = (element, props, children) => {
    const ele = document.createElement(element);
    if (props) {
        for (let [key, value] of Object.entries(props)) {

          if (key === "className") key = "class";
          if (key === "htmlFor") key = "for";

          if (key.startsWith("on") && key !== "on") {
            key = key.toLowerCase().slice(2);
            ele.addEventListener(key, () => {
              value();
            })

            continue;
          }
  
          if (key === "event") {
            if (typeof value !== "object") {
              console.error(`REJECT: event must be object, '${value}', on: '${element}'`);
              continue;
            }

            dataCount++;
            globalParamater[dataCount] = {};
            ele.setAttribute("snapp-data-event", dataCount)
  
            for (let [eventType, eventDetails] of Object.entries(value)) {
              ele.setAttribute("snapp-e-"+eventType, eventDetails[0])
              
              if (typeof eventDetails[1] === 'object' && Object.keys(eventDetails[1]).length > 0) {
                globalParamater[dataCount][eventType] = eventDetails[1]
              }

            }

            continue;
          }

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
      if (typeof node === 'string' || typeof node === 'number' || node instanceof Element || node instanceof DocumentFragment) {
          frag.append(node);
      }
    });
  
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

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(element => {
      element.removedNodes.forEach(node => {
        if (node instanceof Element) {

          if (node.getAttribute("snapp-data-event")) {
            const dataEvent = node.getAttribute("snapp-data-event");
            delete globalParamater[dataEvent]
          }


        }
      })
    });
  })
  observer.observe(document, {
    childList: true,
    subtree: true
  })

  return {
    create, render, on, select, event
  }

})()


export default snapp;