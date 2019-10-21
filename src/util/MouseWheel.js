const map = new Map();

document.body.addEventListener('mousewheel', onMouseWhell);
document.body.addEventListener('DOMMouseScroll', onMouseWhell, false);

const step = 50;

/**
 * 400% 4
 * 350% 3.5
 * 300% 3
 * 250% 2.5
 * 200% 2
 * 150% 1.5
 * 125% 1.25
 * 100% 1
 * 80%  0.8
 * 65%  0.65
 * 50%  0.5
 * 33%  0.33
 * 25%  0.25
 * 10%  0.1
 */
function onMouseWhell(event) {
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
