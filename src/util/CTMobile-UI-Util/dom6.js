const eventListenerHandlers = new Map();

/**
 * dom6
 */
export default {
  /**
   * getTopDom
   * @param {HtmlElement} target
   * @param {string} selector
   * @return {HtmlElement}
   */
  getTopDom(target, selector) {
    if (!target || !selector) return null;

    if (target.className.indexOf(selector) !== -1) {
      return target;
    }

    let parentDom = target;
    while ((parentDom = parentDom.parentNode)) {
      if (parentDom.className.indexOf(selector) !== -1) {
        break;
      } else if (parentDom === document.body) break;
    }

    if (parentDom) {
      if (parentDom === document.body) {
        return null;
      }
        return parentDom;

    }
      return null;

  },
  /**
   * off
   * @param {HTMLElement} - el
   * @param {String} - tag
   * @param {String} - type
   * @param {Function} - handler
   */
  off(el, tag, type, handler) {
    if (tag && type && handler) {
      const value = eventListenerHandlers.get(el);
      if (value && value[tag] && value[tag][type]) {
        const index = value[tag][type].indexOf(handler);
        if (index !== -1) {
          value[tag][type].splice(index, 1);
        }
        el.removeEventListener(type, handler);
      }
    } else if (tag && type && !handler) {
      const value = eventListenerHandlers.get(el);
      if (value && value[tag] && value[tag][type]) {
        value[tag][type].forEach((h) => {
          el.removeEventListener(type, h);
        });
        value[tag][type] = [];
      }
    } else if (tag && !type && !handler) {
      const value = eventListenerHandlers.get(el);
      if (value && value[tag]) {
        for (const t in value[tag]) {
          const h = value[tag][t];
          h.forEach((ih) => {
            el.removeEventListener(t, ih);
          });
          value[tag][t] = [];
        }
      }
    }
  },
  /**
   * on
   * @param {HTMLElement} - el
   * @param {String} - tag
   * @param {String} - type
   * @param {Function} - handler
   * @param {Boolean} - capture
   */
  on(el, tag, type, handler, capture = false) {
    let value = eventListenerHandlers.get(el);
    if (!value) {
      value = {
        [tag]: {
          [type]: [],
        },
      };
      eventListenerHandlers.set(el, value);
    }

    let evtObj = value[tag];
    if (!evtObj) {
      evtObj = {
        [type]: [],
      };
      value[tag] = evtObj;
    }

    let handlers = evtObj[type];
    if (!handlers) {
      handlers = [];
      evtObj[type] = handlers;
    }

    handlers.push(handler);
    el.addEventListener(type, handler, capture);
  },
  once() {},
  /**
   * addClass
   * @param {HTMLElement} el
   * @param {String} classes
   */
  addClass(el, classes = '') {
    const classNames = classes.split(' ');
    for (let i = 0; i < classNames.length; i++) {
      el.classList.add(classNames[i]);
    }
  },
  /**
   * removeClass
   * @param {HTMLElement} el
   * @param {String} classes
   */
  removeClass(el, classes = '') {
    const classNames = classes.split(' ');
    for (let i = 0; i < classNames.length; i++) {
      el.classList.remove(classNames[i]);
    }
  },
  /**
   * hasClass
   * @param {HTMLElement} el
   * @param {String} className
   * @return {Boolean}
   */
  hasClass(el, className) {
    return el.classList.contains(className);
  },
  /**
   * attr
   * @param {HTMLElement} el
   * @param {Object} property
   * @param {Object} value
   */
  attr(el, property, value) {},
  /**
   * DOM没有提供insertAfter()方法
   * @param {HtmlElement} newElement
   * @param {HtmlElement} targetElement
   */
  insertAfter(newElement, targetElement) {
    const parent = targetElement.parentNode;
    if (parent.lastChild === targetElement) {
      // 如果最后的节点是目标元素，则直接添加。因为默认是最后
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
      // 如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
    }
  },
  /**
   * append
   * @param {HTMLElement} - el
   * @param {HTMLElement | String} - children
   */
  append(el, children) {
    let childrenEl;
    if (children instanceof String) {
      childrenEl = this.createElement(children);
    } else {
      childrenEl = children;
    }
    el.appendChild(childrenEl);
  },
  /**
   * prepend
   * @param {HTMLElement} - el
   * @param {HTMLElement | String} - children
   */
  prepend(el, children) {
    let childrenEl;
    if (children instanceof String) {
      childrenEl = this.createElement(children);
    } else {
      childrenEl = children;
    }

    const firstEl = el.firstChild;
    el.insertBefore(childrenEl, firstEl);
  },
  /**
   * remove
   * @param {HTMLElement} - el
   */
  remove(el) {
    el.parentNode.removeChild(el);
  },
  /**
   * createElement
   * @param {string} html
   * @return {HtmlElement}
   */
  createElement(html) {
    const dom = document.createElement('div');
    dom.innerHTML = html;
    return dom.firstElementChild;
  },
  /**
   * prevSibling
   * @param {HtmlElement} dom
   * @return {HtmlElement}
   */
  prevSibling(dom) {
    let result;
    let index = -1;
    if (!dom || !dom.parentNode) return result;

    const { children } = dom.parentNode;
    for (let i = 0; i < children.length; i++) {
      if (dom === children[i]) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      if (index === 0) {
        result = children[0];
      } else {
        result = children[index - 1];
      }
    }
    return result;
  },
  /**
   * nextSibling
   * @param {HtmlElement} dom
   * @return {HtmlElement}
   */
  nextSibling(dom) {
    let result;
    let index = -1;
    if (!dom || !dom.parentNode) return result;

    const { children } = dom.parentNode;
    for (let i = 0; i < children.length; i++) {
      if (dom === children[i]) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      if (index === children.length - 1) {
        result = children[0];
      } else {
        result = children[index + 1];
      }
    }
    return result;
  },
  /**
   * getParentElementByTag
   * @param {HtmlElement} el
   * @param {string} tag
   * @return {HtmlElement}
   */
  getParentElementByTag(el, tag) {
    if (!tag) return null;
    let element;
    let parent = el;
    const popup = () => {
      parent = parent.parentElement;
      if (!parent) return null;
      const tagParent = parent.tagName.toLocaleLowerCase();
      if (tagParent === tag) {
        element = parent;
      } else if (tagParent === 'body') {
        element = null;
      } else {
        popup();
      }
    };

    popup();
    return element;
  },
  /**
   * children
   * @param {HTMLElement} el
   * @param {string} selector
   */
  children(el, selector) {
    const elements = Array.prototype.filter.call(el.children, (t) => {
      return t.nodeType === 1;
    });

    return elements.filter((t) => {
      return t.classList.contains(selector);
    });
  },
  /**
   * isTouch
   * @return {boolean}
   */
  isTouch() {
    return 'ontouchend' in document;
  },
  /**
   * objToDataset
   * @param {Object} - obj
   * @param {HTMLElement} - dom
   */
  objectToDataSet(obj, dom) {
    for (const p in obj) {
      dom.dataset[p] = obj[p];
    }
  },
  /**
   * dataSetToObj
   * @param {HTMLElement} - dom
   * @returns {Object}
   */
  dataSetToObject(dom) {
    const obj = {};
    for (const p in dom.dataset) {
      obj[p] = dom.dataset[p];
    }
    return obj;
  },
  /**
   * getPageLeft
   * @param {HTMLElement} - el
   * @return {SelectOptions}
   */
  getPageLeft(el) {
    let left = el.offsetLeft;
    let offsetParent = null;
    while ((offsetParent = el.offsetParent)) {
      left += offsetParent.offsetLeft;
    }
    return left;
  },
  /**
   * getPageTop
   * @param {HTMLElement} - el
   * @return {SelectOptions}
   */
  getPageTop(el) {
    let top = el.offsetTop;
    let offsetParent = null;
    while ((offsetParent = el.offsetParent)) {
      top += offsetParent.offsetTop;
    }
    return top;
  },
  /**
   * getPageRect
   * @param {HTMLElement} - el
   * @return {{top: number, left: number}}
   */
  getPageRect(el) {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    let offsetParent = null;
    while ((offsetParent = el.offsetParent)) {
      top += offsetParent.offsetTop;
      left += offsetParent.offsetLeft;
    }
    return {
      top,
      left,
    };
  },
};
