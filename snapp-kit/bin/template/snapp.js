
/*!
 * Snapp Framework v1.0.0
 * A lightweight JSX-like framework for vanilla JavaScript
 * 
 * @version 1.0.0
 * @license MIT
 * @repository https://github.com/kigemmanuel/Snapp
 * 
 * Features:
 * - JSX-like syntax compilation
 * - Component-based architecture  
 * - Zero dependencies
 * - Lightweight and fast
 * 
 * Built with ❤️ for modern web development
 * 
 * Copyright (c) 2025 kigemmanuel
 * Released under the MIT License
 */

const snapp = (() => {

  var eventId = 0;
  var dataCount = 0;
  var DOMReady = false;

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

    if (typeof App === 'string' || typeof App === 'number' || App instanceof Element ||  App instanceof DocumentFragment) {
      DOMReady = false;

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

      DOMReady = true;
      document.dispatchEvent(new Event("DOM"))

    } else {
      body.replaceChildren("Failed to render, check console")
      console.log("Failed to render! ", typeof App, App)
    }

  }

  const remove = (items) => {  

    items = (Array.isArray(items)) ? items : [items];

    items.forEach(item => {
      
      if (item instanceof Element) {
        item.remove()
      }
      
      else if (typeof item === "object") {
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

  const on = (event, callBack) => {

    if (typeof event === "string" && event.toUpperCase() === "DOM") {
      if (DOMReady === true) {
        callBack()
      } else {
        document.addEventListener(event.toUpperCase(), callBack, { once: true })
      }
    }

  }

  const select = (name) => {
    if (typeof name === 'string') {
      const element = document.querySelector(name);
      if (!element) {
        console.error(`Element with "${name}" not found`)
        return null
      }
      return element
    }

    if (Array.isArray(name)) {
      return name.map(ele => {
        const element = document.querySelector(ele)
        if (!element) {
          console.error(`Element with "${ele}" not found`);
          return null
        }
        return element
      })
    }
    console.error("Invalid selector!")
    return null;
  }
  
  const selectAll = (name) => {
    if (typeof name === 'string') {
      const element = document.querySelectorAll(name)
      
      if (element.length === 0) {
        console.error(`Element with "${name}" not found`)
        return null
      }
      return element
    }

    if (Array.isArray(name)) {
      return name.map(ele => {
        const element = document.querySelectorAll(ele)

        if (element.length === 0) {
          console.error(`Element with "${ele}" not found`)
          return null
        }
        return element;
      })
    }
    console.error("Invalid selector!")
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

          if (key === "css") {
            if (typeof value === 'string') {
              ele.style.cssText += value;
              continue;
            }
            else if (Array.isArray(value)) {
              ele.style.cssText += value.join("");
              continue;
            }
            else if (typeof value === 'object' && !Array.isArray(value)) {
              ele.style.cssText += snapp.css(value);
            }
            continue;
          }

          if (key === 'style') {
            if (typeof value === 'object') {
              
              for (const [property, style] of Object.entries(value)) {
                if (property.includes('-')) {
                  ele.style.setProperty(property, style);
                } else {
                  ele.style[property] = style;
                }
              }

            } else {
              console.warn(`Invalid style for ${element}`)
            }
            continue;
          }
          
          ele[key] = escapeAttr(value);
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

  const css = (css) => {
    return Object.entries(css).map(([key, value]) => `${key}: ${value}`).join("; ") + "; ";
  }

  const applycss = (element, css, replace = false) => {
    element = (Array.isArray(element)) ? element : [element];
    css = ((Array.isArray(css)) ? css : [css]).join("");

    element.forEach(element => {

      if (!(element instanceof Element)) {
        console.error(`Error! can not apply css to "${element}", selelct a valid element`)
        return;
      }

      if (replace) {
        element.style.cssText = css
      } else {
        element.style.cssText += css;
      }
    })
    
  }

  const applystyle = (element, styles) => {
    element = (Array.isArray(element)) ? element : [element];
    
    element.forEach(ele => {

      if (!(element instanceof Element)) {
        console.error(`Error! can not apply css to "${element}", selelct a valid element`)
        return;
      }

      for (const [property, style] of Object.entries(styles)) {
        if (property.includes('-')) {
          ele.style.setProperty(property, style);
        } else {
          ele.style[property] = style;
        }
      }
    })
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
            
            if (elementEventMap[dataEvent]) {
              elementEventMap[dataEvent].forEach(name => {
                if (globalParameter[name]) {
                  delete globalParameter[name][dataEvent]
                }
              })
            }
            
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
    create, render, on, select, selectAll, event, css, applycss, applystyle, remove
  }

})()

export default snapp;