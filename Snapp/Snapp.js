

const snapp = (() => {

  var dataCount = 0;
  var eventId = 0;

  const elementEvent = {};
  const globalEvent = {};
  const eventListners = {};
  const globalParameter = {};
  const elementEventMap = {};

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
    
    if (!document.contains(body)) {
      console.error("ERROR: Rending to a non existing/removed element", body)
      return;
    }

    switch (true) {
      case (type === "before"):
        body.before(App);
        break;
        
        case (type === "prepend"):
          body.prepend(App);
        break;
        
        case (type === "replace"):
        body.replaceWith(App);
        break;
        
      case (type === "append"):
        body.append(App);
        break;

      case (type === "after"):
        body.after(App);
        break;
    
      default:
        body.replaceChildren(App);
        break;
      }

    document.dispatchEvent(new Event("DOM"))
  }

  const remove = (items) => {    
    items.forEach(item => {
      if (item instanceof Element) {
        item.remove()
      } else if (typeof item === "object") {
        const {eventType, eventName} = item;
        delete globalEvent[eventType][eventName]

        if (Object.keys(globalEvent[eventType]).length === 0) {
          document.removeEventListener(eventType, eventListners[eventType]); 
          
          delete globalEvent[eventType]
          delete eventListners[eventType]
        }

        delete globalParameter[eventName]
      }
    })
  }

  const on = (eventName, callBack) => {
    document.addEventListener(eventName, callBack, { once: true })
  }

  const select = (name) => {
    if (typeof name === 'string') {
      return document.querySelector(name)
    }
    if (Array.isArray(name)) {
      return name.map(sel => document.querySelector(sel));
    }
    return null;
  }

  const selectAll = (name) => {
    if (typeof name === 'string') {
      return document.querySelectorAll(name)
    }
    if (Array.isArray(name)) {
      return name.map(sel => document.querySelectorAll(sel));
    }
    return null;
  }

  const event = (eventType, callBack, replace = false) => {
    eventId++

    let eventName = `event-${eventId}`;
    
    if (!(eventType in globalEvent)) {
      globalEvent[eventType] = [];
    
      const eventTemp = (element) => {
        const name = element.target.getAttribute("snapp-e-"+eventType);
        const dataEvent = element.target.getAttribute("snapp-data");
        if (globalEvent[eventType][name]) {
          const parameter = globalParameter[name]?.[dataEvent];
          globalEvent[eventType][name](element, parameter);
        }
      }
      
      eventListners[eventType] = eventTemp;
      document.addEventListener(eventType, eventListners[eventType])
    }

    if (globalEvent[eventType][eventName] && !replace) {

      console.warn(`REJECT: Can not add event with already existing name "${eventName}", use 'true' to replace`);
      return "REJECT"
    }

    globalEvent[eventType][eventName] = callBack;

    return {
      eventType: eventType,
      eventName: eventName
    }
  }
  
  const createElement = (element, props, children) => {
    dataCount++;
    const ele = document.createElement(element);

    if (props) {
        for (let [key, value] of Object.entries(props)) {

          if (key === "className") key = "class";
          if (key === "htmlFor") key = "for";

          if (key.startsWith("on") && key !== "on") {
            
            if (!elementEvent[dataCount]) {
              elementEvent[dataCount] = [];
              ele.setAttribute("snapp-data", dataCount)
            }

            key = key.toLowerCase().slice(2);
            ele.addEventListener(key, value)
            elementEvent[dataCount].push({
              type: key,
              handler: value
            })

            continue;
          }
  
          if (key === "event") {
            if (!Array.isArray(value)) {
              console.error(`REJECT: event must be object, '${value}', on: '${element}'`);
              continue;
            }

            const event = Array.isArray(value[0]) ? value : [value];
            ele.setAttribute("snapp-data", dataCount)
            elementEventMap[dataCount] = []

            event.map(event => {
              const parameter = event[1];
              const {eventType, eventName} = event[0];
              ele.setAttribute("snapp-e-"+eventType, eventName);
              
              globalParameter[eventName] = globalParameter[eventName] || {}
              globalParameter[eventName][dataCount] = parameter;
              elementEventMap[dataCount].push(eventName)
            })
            continue;
          }
          
          ele.key, escapeAttr(value);
        }
    }
    
    children.forEach(node => {
      if (typeof node === 'string' || typeof node === 'number' || node instanceof Element ||  node instanceof DocumentFragment) {
        try {
          ele.append(node);
        } catch (error) {
          console.log(error)
        }  
      }
    });
  
    return ele;
  }
  
  const createFragment = (children) => {
    const frag = document.createDocumentFragment();
    children.forEach(node => {
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

  const escapeAttr = (val) => {
    return String(val)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(element => {
      element.removedNodes.forEach(node => {
        if (node instanceof Element) {
          const dataEvent = node.getAttribute("snapp-data");

          if (dataEvent) {
            if (elementEvent[dataEvent]) {
              elementEvent[dataEvent].forEach(eventName => {
                const {type, handler} = eventName;
                node.removeEventListener(type, handler)
              })
            }
            
            elementEventMap[dataEvent].forEach(name => {
              if (globalParameter[name]) {
                delete globalParameter[name][dataEvent]
              }
            })
            
            delete elementEventMap[dataEvent]
            delete elementEvent[dataEvent]
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
    create, render, on, select, selectAll, event, remove
  }

})()


export default snapp;