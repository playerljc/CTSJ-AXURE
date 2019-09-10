/*
* 一个Shape激活
* RangeSelect
*
* 上移 ArrowUp
* 下移 ArrowDown
* 左移 ArrowLeft
* 右移 ArrowRight
*
* 按住ctrl上移 Ctrl + ArrowUp
* 按住ctrl下移 Ctrl + ArrowDown
* 按住ctrl左移 Ctrl + ArrowLeft
* 按住ctrl右移 Ctrl + ArrowRight
*
* 按住shift上移 Shift + ArrowUp
* 按住shift下移 Shift + ArrowDown
* 按住shift左移 Shift + ArrowLeft
* 按住shift右移 Shift + ArrowRight
*
* 一直按住上移 Repeat + ArrowUp
* 一直按住下移 Repeat + ArrowDown
* 一直按住左移 Repeat + ArrowLeft
* 一直按住右移 Repeat + ArrowRight
*
* 一直按住ctrl上移 Repeat + Ctrl + ArrowUp
* 一直按住ctrl下移 Repeat + Ctrl + ArrowDown
* 一直按住ctrl左移 Repeat + Ctrl + ArrowLeft
* 一直按住ctrl右移 Repeat + Ctrl + ArrowRight
*
* 一直按住shift上移 Repeat + Shift + ArrowUp
* 一直按住shift下移 Repeat + Shift + ArrowDown
* 一直按住shift左移 Repeat + Shift + ArrowLeft
* 一直按住shift右移 Repeat + Shift + ArrowRight
*
* Ctrl + C Ctrl + C
* Ctrl + V Ctrl + V
*
* Delete Delete
* Backspace Backapace
*
* 移动当中按住Ctrl Ctrl
* */

const map = new Map();

/**
 * onKey
 * @param {KeyboardEvent} - e
 */
function onKey(e) {
  const { key, shiftKey, ctrlKey, repeat } = e;

  const type = [];
  if (repeat) {
    type.push('Repeat');
  }

  if (shiftKey) {
    type.push('Shift');
  }

  if (ctrlKey) {
    type.push('Ctrl');
  }

  type.push(key);

  const entryKey = type.join('+');

  // console.log(entryKey);

  const handlers = map.get(entryKey) || [];
  handlers.forEach((handler) => {
    handler();
  });
}

window.addEventListener('keydown', (e) => {
  e.preventDefault();
  onKey(e);
});

export default {
  /**
   * on
   * @param {Array<String>} - type
   * @param {Function} - handler
   */
  on(type, handler) {
    const key = type.join('+');
    let handlers = map.get(key);
    if (!handlers) {
      handlers = [];
      map.set(key, handlers);
    }

    handlers.push(handler);
  },
  /**
   * off
   * @param {Array<String>} type
   * @param {Function} - handler
   */
  off(type, handler) {
    const key = type.join('+');
    const handlers = map.get(key);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  },
  /**
   * clear
   */
  clear() {
    map.clear();
  },
};
