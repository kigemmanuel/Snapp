
/*!
 * Snapp Framework v2.0.0
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

  var dataId = 0;
  var DOMReady = false;
  
  var stateId = 0;
  const stateData = {};
  const stateReg = /\{=(.*?)\}/g; // {=anything here}
  
  const eventListener = {};
  const elementEvent = {};

  const create = (element, props, ...children) => {
    const flatChildren = flattenChildren(children);
    if (element != "<>" && typeof element === "string")
      return createElement(element, props, flatChildren);
    
    
    if (typeof element === 'function')
      return createComponent(element, props, flatChildren);
    
    if (element === "<>") 
      return createFragment(flatChildren);
    
  }

  const render = (body, App, type) => {

    if (!document.contains(body))
      return console.error("ERROR: Rending to a non existing/removed element", body)

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

  const createElement = (element, props, children) => {
    const ele = document.createElement(element);
    dataId++

    if (props) {
        for (let [key, value] of Object.entries(props)) {

          if (key === "className") key = "class";
          if (key === "htmlFor") key = "for";

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

          if(key.startsWith("on") && key !== "on" && typeof value === "function") {
            const cheKey = key.substring(3, 2);
            if (cheKey === cheKey.toUpperCase()) {
              const eventType = key.toLowerCase().slice(2);
              ele.setAttribute("snapp-data", dataId);
              addEventListener(eventType, value, dataId);
              ele.setAttribute("snapp-e-"+eventType, "true");
              continue;
            }
          }
          
          const textReg = new RegExp(stateReg.source, stateReg.flags);
          if (textReg.test(value)) {
            const reg = new RegExp(stateReg.source, stateReg.flags);
            const temp = {
              type: "attr",
              attr: key,
              temp: value
            }

            for (const match of value.matchAll(reg)) {
              const id = match[1];
              if (stateData[id]["bind"]) {
                if (!stateData[id]["bind"].has(ele)) {
                  stateData[id]["bind"].set(ele, new Set([]))
                }
                stateData[id]["bind"].get(ele).add(temp)
              }
            }

            ele.setAttribute("snapp-data", dataId);
            updateState(ele, [temp])
            continue;
          }
          
          // Default
          ele.setAttribute(key, value);
        }
    }

    children.forEach(node => {
      if (typeof node === 'string' || typeof node === 'number' || node instanceof Element ||  node instanceof DocumentFragment) {
        try {
          
          if (typeof node === 'string' || typeof node === 'number') {
            const reg = new RegExp(stateReg.source, stateReg.flags);
            
            if (reg.test(node)) {
              const reg = new RegExp(stateReg.source, stateReg.flags);
              const textNode = document.createTextNode("");
              
              const temp = {
                type: "node",
                node: textNode,
                temp: node
              }
              
              for (const match of node.matchAll(reg)) {
                const id = match[1];
                if (stateData[id]["bind"]) {
                  if (!stateData[id]["bind"].has(ele)) {
                    stateData[id]["bind"].set(ele, new Set([]))
                  }
                  stateData[id]["bind"].get(ele).add(temp)
                }
              }

              ele.setAttribute("snapp-data", dataId);
              updateState(ele, [temp])
              ele.append(textNode)
              return;
            }

          }

          // Default
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

  const createComponent = (element, props = {}, children) => {
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

      if (!(ele instanceof Element)) {
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

  
  const addEventListener = (eventType, event, elementId) => {
    
    const eventTemplate = (element) => {
      const target = element.target;
      const elWithAttr = target.closest(`[snapp-e-${eventType}]`);

      if (!elWithAttr) return;
      const elementDataId = elWithAttr.getAttribute("snapp-data");
      elementEvent[eventType]?.[elementDataId](element)
    }

    if (!(eventType in eventListener)) {
      elementEvent[eventType] = {}

      eventListener[eventType] = eventTemplate;
      document.addEventListener(eventType, eventListener[eventType])
    }

    elementEvent[eventType][elementId] = event;
  }

  const updateState = (element, items) => {
    items.forEach(item => {
      const reg = new RegExp(stateReg.source, stateReg.flags);
      
      const newTemp = item.temp.replace(reg, (match, id) => {
        return stateData[id]?.value
      })

      if (item.type === "attr") 
        return element.setAttribute(item.attr, newTemp)
      
      if (item.type === "node")
        return item.node.nodeValue = newTemp;
    })
  }


  const state = (initialtValue = "") => {
    stateId++;

    const id = stateId;
    stateData[id] = {
      value: initialtValue,
      bind: new Map()
    };                                                         

    const update = (val) => {
      if (stateData[id].value !== val) {
        stateData[id].value = val
        for (const [ele, arry] of stateData[id].bind) {
          if (DOMReady) {
            if (!document.contains(ele)) {
              stateData[id].bind.delete(ele)
              continue;
            }
          }
          updateState(ele, arry)
        }
      }
    }
    
    const trigger = () => {
      for (const [ele, arry] of stateData[id].bind) {
        if (DOMReady) {
          if (!document.contains(ele)) {
            stateData[id].bind.delete(ele)
            continue;
          }
        }
        updateState(ele, arry)
      }
    }
    
    const link = `{=${id}}`;

    return {
      get value () {
        return stateData[id].value
      },
      link,
      update,
      trigger
    }
  }

  const weakstate = (initialtValue = "") => {
    stateId++;

    const id = stateId;
    stateData[id] = {
      value: initialtValue,
    };

    const update = (val) => {
      if (stateData[id].value !== val) {
        stateData[id].value = val
      }
    }
    
    const link = `{=${id}}`;

    return {
      get value () {
        return stateData[id].value
      },
      link,
      update,
    }
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(element => {
      element.removedNodes.forEach(node => {
        if (node instanceof Element) {
          const elementDataId = node.getAttribute("snapp-data");
          
          if (elementDataId) {

            for (const attrName of node.getAttributeNames()) {
              if (attrName.startsWith('snapp-e-')) {
                const eventType = attrName.replace("snapp-e-", "");

                if (elementEvent[eventType]?.[elementDataId]) {
                  delete elementEvent[eventType]?.[elementDataId]
                }

                if (Object.keys(elementEvent[eventType]).length === 0) {
                  document.removeEventListener(eventType, eventListener[eventType])
                  delete eventListener[eventType]
                  delete elementEvent[eventType]
                }
              }
            }

            clearRemovedElement(node)
          
          };
        }
      })
    });
  })
  observer.observe(document, {
    childList: true,
    subtree: true
  })

  let timer;
  let maxWaitElement = 0;
  const clearRemovedElement = (ele) => {
    clearTimeout(timer);
    maxWaitElement++

    if (maxWaitElement === 10) {
      maxWaitElement = 0;
      clearRemovedElementLogic(ele);
    } else {
      timer = setTimeout(() => {
        maxWaitElement = 0;
        clearRemovedElementLogic(ele);
      }, 1000)
    }

  }

  const clearRemovedElementLogic = (ele) => {
    for (const [id, state] of Object.entries(stateData)) {
      if (state.bind) {
        for (const [ele, arry] of stateData[id].bind) {
          if (DOMReady) {
            if (!document.contains(ele)) {
              stateData[id].bind.delete(ele)
            }
          }
        }
      }
    }
  }

  return {
    create, render, on, select, selectAll, css, applycss, applystyle, remove, state, weakstate
  }

})()

export default snapp;
