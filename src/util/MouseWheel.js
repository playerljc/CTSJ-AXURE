const map = new Map();

document.body.addEventListener('mousewheel', onMouseWheel);
document.body.addEventListener('DOMMouseScroll', onMouseWheel, false);

const step = 50;

/**
 * onMouseWheel - 按住shift滚动的滚轮
 * @param {MouseWheelEvent} - event
 * @return {boolean}
 */
function onMouseWheel(event) {
  const e = event || window.event;
  if (!e.shiftKey) return false;

  const whell = e.wheelDelta ? e.wheelDelta : e.detail;
  let direction;
  if (whell > step) {
    // 当滑轮向上滚动时
    direction = 'top';
  } else if (whell < step) {
    // 当滑轮向下滚动时
    direction = 'bottom';
  }

  for (const handler of map.values()) {
    handler({
      direction,
    });
  }
}

export default {
  on(handler) {
    map.set(handler, handler);
  },
  off(handler) {
    map.delete(handler);
  },
  clear() {
    map.clear();
  },
};
