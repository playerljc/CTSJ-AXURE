/**
 *
 配置:
 el
 {
   能不能在自己里面drag
   // 可以放置
   onPutSuccess: Function sourceEl,targetEls,rect,
   // 移动节点可以自定义, 如果在此返回指定的节点，那么 dragSourceExtendClasses 属性不生效
   // 此节点为游离的dom节点，没有添加任何节点中
   // 节点太小了鼠标没在元素区域内
   onDragClone: Function sourceEl
   // source节点进入(只有drag)
   onSourceEnter: Function
   // source节点离开(只有drag)
   onSourceLeave: Function
   onBoundaryDetection: Function 边缘检查 top | bottom | left | right 只要有一个触发则会被调用
   // 拖动对象的附加样式，拖动移动起来后触发
   dragSourceExtendClasses: Array,
   // 可放置对象的附加样式，当拖动到可以放置的区域时触发
   dragTargetExtendClasses: Array,
   // 拖动后原始节点是否显示
   isDragSourceDisplay: boolean,
   // 拖动之后原始节点是否存在
   isDragSourceExist: boolean,
   // 不可放置的时候松开是否有动画返回效果
   noDragReturnAnimate: boolean,
   inclusionRelation: boolean 加入如果source和target为包含关系，则不能放入
   isFree: boolean 是否是自由模式，自由模式只能拖动, 移动 (未实现)
   infinite : boolean 是否无限扩展(不能拖出target)
   scale: [Number] 0.25 缩放比例
}

 布局:
 <div class="ct-drag-source"></div>
 <div class="ct-drag-target"></div>

 功能:
 .从哪拖到哪,怎么放置(谁能拖，谁能放，怎么放)

 .画布都有哪些扩展，移动到target的时候是有限制的，不能拖出无限滚动，
 放的时候是自由放置
 拖动到target里的元素可以自由移动

 测试:

 log:
 .在el范围内拖动，而不是全局拖动
 .加入如果source和target为包含关系，则不能放入

 .无限拖动，画布跟着滚动 (在父容器里拖动的时候，拖动到目标容器(ct-drag-target)的时候)
 .只想移动，根本不想放入(在el范围内自由的移动)
 .Axure是鼠标不能出target的范围，不管是从左拽进来，还是在target自由移动，都是这样的
 现在可以实现，但是不是自动的需要鼠标移动才能更新滚动条的位置

 demo:
 */
import { getMaxLevelNumber } from '../../library/component/ComponentBaseHOC';

import './droppable.less';

const selectorPrefix = 'ct-droppable-';

const scrollStep = 5;

/**
 * initEvents
 * @access private
 */
function initEvents() {
  const self = this;

  initDragSourceEvent.call(self);

  // el mousemove
  self.el.addEventListener('mousemove', self.onContainerMousemove);

  // el mouseleave
  self.el.addEventListener('mouseleave', self.onContainerMouseleave);
}

/**
 * initDragSourceEvent
 * @access private
 */
function initDragSourceEvent() {
  const self = this;

  const {
    dragSourceExtendClasses = [],
    onDragClone,
    onSourceEnter,
    onSourceLeave,
    inclusionRelation = true,
  } = self.config;

  self.sourceEventHanlder = new WeakMap();

  // dragSource
  for (let i = 0; i < this.sourceEls.length; i++) {
    const sourceEl = this.sourceEls[i];
    const handlerEntry = {};

    // 点击 mousedown
    sourceEl.addEventListener(
      'mousedown',
      (() => {
        function createCloneEl() {
          const cloneEl = sourceEl.cloneNode(true);
          if (dragSourceExtendClasses) {
            cloneEl.className += ` ${dragSourceExtendClasses.join(' ')}`;
          } else {
            cloneEl.style.border = '1px dashed black';
          }
          return cloneEl;
        }

        const handler = (ev) => {
          const { disable = false } = self;

          if (disable) return false;

          const { onStart } = self.config;
          if (onStart) {
            onStart();
          }

          self.isdown = true;
          self.sourceEl = sourceEl;

          // create CloneNode
          if (onDragClone) {
            self.cloneEl = onDragClone(sourceEl, self.scale);
            if (!self.cloneEl) {
              self.cloneEl = createCloneEl();
            }
          } else {
            self.cloneEl = createCloneEl();
          }

          self.cloneEl.style.position = 'fixed';
          self.cloneEl.style.zIndex = `${window.parseInt(getMaxLevelNumber()) + 2}`;
          self.cloneEl.style.margin = '0';
          self.cloneEl.addEventListener('mouseup', () => {
            if (!self.ismove) {
              reset.call(self);
              return false;
            }

            const moveInTargetEls = getMoveInTargetEls.call(self);
            const targetEls = [].concat(moveInTargetEls.section, moveInTargetEls.complete);
            if (moveInTargetEls.complete.length > 0) {
              // 可以放
              // target和source可能是包含关系，target包含source
              // 如果是包含关系可以放
              if (inclusionRelation) {
                Put.call(self, sourceEl, moveInTargetEls);
              } else {
                const completeTargetEls = moveInTargetEls.complete;
                let flag = false;
                for (let i = 0; i < completeTargetEls.length; i++) {
                  const index = Array.from(
                    completeTargetEls[i].querySelectorAll(`.${selectorPrefix}source`),
                  ).findIndex((el) => {
                    return el === sourceEl;
                  });

                  // 是兄弟的关系
                  if (index === -1) {
                    flag = true;
                    break;
                  }
                }

                // 有兄弟
                if (flag) {
                  Put.call(self, sourceEl, moveInTargetEls);
                } else {
                  // 全是爸爸
                  goBack.call(self, sourceEl, targetEls);
                }
              }
            } else {
              // 不可以放
              goBack.call(self, sourceEl, targetEls);
            }
          });

          // append CloneNode
          self.el.appendChild(self.cloneEl);

          self.cloneElWidth = self.cloneEl.offsetWidth;
          self.cloneElHeight = self.cloneEl.offsetHeight;

          self.cloneEl.style.left = `${ev.pageX - Math.floor(self.cloneElWidth / 2)}px`;
          self.cloneEl.style.top = `${ev.pageY - Math.floor(self.cloneElHeight / 2)}px`;
        };
        handlerEntry.mousedown = handler;
        return handler;
      })(),
    );

    // 进入 mouseenter
    sourceEl.addEventListener(
      'mouseenter',
      (() => {
        const handler = () => {
          const { disable = false } = self;

          if (disable) return false;

          sourceEl.style.cursor = 'move';
          if (onSourceEnter) {
            onSourceEnter(sourceEl);
          }
        };
        handlerEntry.mouseenter = handler;
        return handler;
      })(),
    );

    // 移出 mouseleave
    sourceEl.addEventListener(
      'mouseleave',
      (() => {
        const handler = () => {
          const { disable = false } = self;

          if (disable) return false;
          sourceEl.style.cursor = 'default';
          if (onSourceLeave) {
            onSourceLeave(sourceEl);
          }
        };
        handlerEntry.mouseover = handler;
        return handler;
      })(),
    );

    // 记录mousedonw,mouseenter,mouseover事件的句柄
    self.sourceEventHanlder.set(sourceEl, handlerEntry);
  }
}

/**
 * Put
 * @param {HTMLElement} sourceEl
 * @param {Array<HTMLElement>} moveInTargetEls
 * @access private
 */
function Put(sourceEl, moveInTargetEls) {
  const self = this;
  const targetEls = [].concat(moveInTargetEls.section, moveInTargetEls.complete);
  const { onPutSuccess, isDragSourceExist = true } = self.config;
  if (onPutSuccess) {
    // 返给用的是原始节点克隆后的节点
    const cloneRect = self.cloneEl.getBoundingClientRect();
    const cloneSourceEl = sourceEl.cloneNode(true);
    cloneSourceEl.style.visibility = 'visible';
    cloneSourceEl.style.cursor = 'default';
    const isPut = onPutSuccess({
      cloneSourceEl,
      sourceEl,
      targetEls: moveInTargetEls.complete,
      rect: {
        left: cloneRect.left,
        right: cloneRect.right,
        top: cloneRect.top,
        bottom: cloneRect.bottom,
        width: cloneRect.width,
        height: cloneRect.height,
        x: cloneRect.x,
        y: cloneRect.y,
      },
      naturalRelease: {
        fn: naturalRelease,
        context: self,
      },
    });

    if (isPut) {
      // 放了
      if (!isDragSourceExist) {
        if (self.sourceEl) {
          self.sourceEl.parentElement.removeChild(self.sourceEl);
          self.sourceEl = null;
        }
      }

      reset.call(self, targetEls);
    } else {
      // 没放
      goBack.call(self, sourceEl, targetEls);
    }
  }
}

/**
 * getMoveInTargetEls
 * @access private
 */
function getMoveInTargetEls() {
  const completeResult = [];
  const sectionResult = [];
  const boundaryDetection = [];

  const cloneElRect = this.cloneEl.getBoundingClientRect();

  const { dragTargetExtendClasses = [] } = this.config;

  const { targetEls } = this;
  for (let i = 0; i < targetEls.length; i++) {
    const targetEl = targetEls[i];
    const rect = targetEl.getBoundingClientRect();

    // 进入了target
    if (
      ((cloneElRect.left >= rect.left && cloneElRect.left <= rect.right) ||
        (cloneElRect.right >= rect.left && cloneElRect.right <= rect.right)) &&
      ((cloneElRect.top >= rect.top && cloneElRect.top <= rect.bottom) ||
        (cloneElRect.bottom >= rect.top && cloneElRect.bottom <= rect.bottom))
    ) {
      if (dragTargetExtendClasses) {
        dragTargetExtendClasses.forEach((Class) => {
          if (Class) {
            targetEl.classList.remove(Class);
          }
        });
        targetEl.className += ` ${dragTargetExtendClasses.join(' ')}`;
      } else {
        targetEl.style.border = '2px dashed black';
      }

      if (
        cloneElRect.left >= rect.left &&
        cloneElRect.left <= rect.right &&
        cloneElRect.right >= rect.left &&
        cloneElRect.right <= rect.right &&
        cloneElRect.top >= rect.top &&
        cloneElRect.top <= rect.bottom &&
        cloneElRect.bottom >= rect.top &&
        cloneElRect.bottom <= rect.bottom
      ) {
        // 完全进入
        completeResult.push(targetEl);
      } else {
        // 部分进入
        sectionResult.push(targetEl);
      }
    } else if (dragTargetExtendClasses) {
      dragTargetExtendClasses.forEach((t) => {
        if (t) {
          targetEl.classList.remove(t);
        }
      });
    } else {
      targetEl.style.border = '0';
    }

    // 不管进不进入target都去走边缘检查
    // 只有完全进入的才进行边缘检测
    // (上 | 下 | 左 | 右) 看那些条件符合
    const condition = {
      top: false,
      bottom: false,
      left: false,
      right: false,
    };
    if (cloneElRect.top < rect.top) {
      condition.top = true;
    }
    if (cloneElRect.bottom > rect.bottom) {
      condition.bottom = true;
    }
    if (cloneElRect.left < rect.left) {
      condition.left = true;
    }
    if (cloneElRect.right > rect.right) {
      condition.right = true;
    }

    boundaryDetection.push({
      el: targetEl,
      condition,
      rect,
    });
  }

  return {
    // 完全进入
    complete: completeResult,
    // 部分进入
    section: sectionResult,
    boundaryDetection,
  };
}

/**
 * goBack
 * @param {HTMLElement} - sourceEl
 * @param {HTMLElement} - targetEls
 */
function goBack(sourceEl, targetEls) {
  const self = this;

  const { noDragReturnAnimate = false } = this.config;
  if (noDragReturnAnimate) {
    setTimeout(() => {
      self.isdown = false;

      function onTransitionend() {
        if (self.cloneEl) {
          self.cloneEl.removeEventListener('transitionend', onTransitionend);
          reset.call(self, targetEls);
          sourceEl.style.visibility = 'visible';
        }
      }

      if (!self.cloneEl) return false;
      self.cloneEl.addEventListener('transitionend', onTransitionend);
      self.cloneEl.style.transition = 'all .25s ease-out';
      self.cloneEl.style.transform = 'translateZ(0)';
      const rect = sourceEl.getBoundingClientRect();
      self.cloneEl.style.left = `${rect.left}px`;
      self.cloneEl.style.top = `${rect.top}px`;
    }, 100);
  } else {
    reset.call(self, targetEls);
    sourceEl.style.visibility = 'visible';
  }
}

/**
 * reset
 * @param {Array<HTMLElement>} - targetEls
 * @access private
 */
function reset(targetEls) {
  const self = this;
  const { dragTargetExtendClasses = [] } = this.config;

  if (self.boundaryDetectionHandler) {
    cancelAnimationFrame(self.boundaryDetectionHandler);
    self.boundaryDetectionHandler = null;
  }

  if (self.cloneEl) {
    self.el.removeChild(self.cloneEl);
  }

  // 删除targets的样式
  if (targetEls && targetEls.length > 0) {
    for (let i = 0; i < targetEls.length; i++) {
      if (dragTargetExtendClasses) {
        dragTargetExtendClasses.forEach((Class) => {
          if (Class) {
            targetEls[i].classList.remove(Class);
          }
        });
      } else {
        targetEls[i].style.border = '0';
      }
    }
  }
  self.isdown = false;
  self.ismove = false;
  self.cloneEl = null;
  self.sourceEl = null;
  self.ismovecanput = false;
  self.cloneElWidth = null;
  self.cloneElHeight = null;

  const { onEnd } = self.config;
  if (onEnd) {
    onEnd();
  }
}

/**
 * 自然的放
 * @param {HTMLElement} - targetEl 放哪
 * @param {HTMLElement} - sourceEl 谁放
 * @access private
 */
function naturalRelease(targetEl, sourceEl) {
  const self = this;
  const cloneRect = self.cloneEl.getBoundingClientRect();

  const cleft = cloneRect.left;
  const ctop = cloneRect.top;

  // 很大的那个元素
  const rect = targetEl.getBoundingClientRect();

  // 真正元素的left和right
  // left: cloneEl的视口left-父亲视口left
  // top: cloneEl的视口top-父亲视口top
  const left = cleft - rect.left;
  const top = ctop - rect.top;

  const innerEl = sourceEl.firstElementChild;
  // 落户的节点
  // left和top的赋值
  innerEl.style.position = 'absolute';
  // innerEl.style.left = `${left / self.scale}px`;
  // innerEl.style.top = `${top / self.scale}px`;

  // sourceEl.style.position = 'absolute';
  // sourceEl.style.left = `${left}px`;
  // sourceEl.style.top = `${top}px`;

  // 放入很大的节点
  targetEl.appendChild(sourceEl);

  return {
    left: left / self.scale,
    top: top / self.scale,
  };
}

/**
 * 到达边缘的无限滚动
 * boundaryDetectionScroll
 * @param {Object} - condition
 * @param {HTMLElement} - targetEl
 * @access private
 */
function boundaryDetectionScroll(rect, targetEl) {
  const self = this;

  const { top, bottom, left, right } = rect;

  if (top) {
    if (targetEl.scrollTop !== 0) {
      if (targetEl.scrollTop - scrollStep < 0) {
        targetEl.scrollTop = 0;
      } else {
        targetEl.scrollTop -= scrollStep;
      }
    }
  }

  if (bottom) {
    if (targetEl.scrollTop !== targetEl.scrollHeight) {
      if (targetEl.scrollTop + scrollStep > targetEl.scrollHeight) {
        targetEl.scrollTop = targetEl.scrollHeight;
      } else {
        targetEl.scrollTop += scrollStep;
      }
    }
  }

  if (left) {
    if (targetEl.scrollLeft !== 0) {
      if (targetEl.scrollLeft - scrollStep < 0) {
        targetEl.scrollLeft = 0;
      } else {
        targetEl.scrollLeft -= scrollStep;
      }
    }
  }

  if (right) {
    if (targetEl.scrollLeft !== targetEl.scrollWidth) {
      if (targetEl.scrollLeft + scrollStep > targetEl.scrollWidth) {
        targetEl.scrollLeft = targetEl.scrollWidth;
      } else {
        targetEl.scrollLeft += scrollStep;
      }
    }
  }

  self.boundaryDetectionHandler = requestAnimationFrame(() => {
    boundaryDetectionScroll.call(self, rect, targetEl);
  });
}

/**
 * Droppable
 * @class Droppable
 * @classdesc Droppable
 */
class Droppable {
  /**
   * constructor
   * @constructor
   * @param {HTMLElement} - el
   * @param {Object} - config
   */
  constructor(el, config) {
    this.el = el;
    this.config = { ...config};

    this.onContainerMousemove = this.onContainerMousemove.bind(this);
    this.onContainerMouseleave = this.onContainerMouseleave.bind(this);

    this.setScale(this.config.scale || 1);

    this.disable = false;
    this.sourceEls = this.el.querySelectorAll(`.${selectorPrefix}source`);
    this.targetEls = this.el.querySelectorAll(`.${selectorPrefix}target`);
    this.isdown = false; // 是否按下了
    this.ismove = false; // 是否move了
    this.cloneEl = null;
    this.sourceEl = null;
    this.cloneElWidth = null;
    this.cloneElHeight = null;
    this.ismovecanput = false; // 是否成功移动到target内部
    this.boundaryDetectionHandler = null;

    initEvents.call(this);
  }

  /**
   * onContainerMousemove
   * @param {MouseEvent} - ev
   * @return {boolean}
   */
  onContainerMousemove(ev) {
    // console.log('drop1');

    const self = this;

    const { disable = false } = self;

    if (disable) return false;

    if (!self.isdown) return false;

    const {
      isDragSourceDisplay = true,
      isDragSourceExist = true,
      onBoundaryDetection,
      infinite = false,
    } = self.config;

    if (!self.ismove) {
      self.ismove = true;
      if (!isDragSourceDisplay || !isDragSourceExist) {
        self.sourceEl.style.visibility = 'hidden';
      }
    }

    const left = ev.pageX - Math.floor(self.cloneElWidth / 2);
    const top = ev.pageY - Math.floor(self.cloneElHeight / 2);

    // 不是看curX和curY的值在不在targetEl里，而是看
    const moveInTargetEls = getMoveInTargetEls.call(self);

    // 不是无限画布
    if (!infinite) {
      if (moveInTargetEls.complete.length > 0) {
        // 可以放置
        self.cloneEl.style.cursor = 'pointer';
      } else {
        // 不可以放
        self.cloneEl.style.cursor = 'not-allowed';
      }

      self.cloneEl.style.left = `${left}px`;
      self.cloneEl.style.top = `${top}px`;
    } else {
      if (self.boundaryDetectionHandler) {
        cancelAnimationFrame(self.boundaryDetectionHandler);
        self.boundaryDetectionHandler = null;
      }

      if (self.ismovecanput) {
        // 是无限画布
        const { boundaryDetection } = moveInTargetEls;
        const { rect } = boundaryDetection[0];

        const condition = {
          left: false,
          right: false,
          top: false,
          bottom: false,
        };

        if (left < rect.left || left + self.cloneElWidth > rect.right) {
          if (left < rect.left) {
            self.cloneEl.style.left = `${rect.left}px`;
            condition.left = true;
          }

          if (left + self.cloneElWidth > rect.right) {
            self.cloneEl.style.left = `${rect.right - self.cloneElWidth}px`;
            condition.right = true;
          }
        } else {
          self.cloneEl.style.left = `${left}px`;
        }

        if (top < rect.top || top + self.cloneElHeight > rect.bottom) {
          if (top < rect.top) {
            self.cloneEl.style.top = `${rect.top}px`;
            condition.top = true;
          }

          if (top + self.cloneElHeight > rect.bottom) {
            self.cloneEl.style.top = `${rect.bottom - self.cloneElHeight}px`;
            condition.bottom = true;
          }
        } else {
          self.cloneEl.style.top = `${top}px`;
        }

        if (condition.left || condition.right || condition.top || condition.bottom) {
          if (onBoundaryDetection) {
            /**
             * 传入对象
             * 加入targetEls参数
             */
            onBoundaryDetection({
              condition,
              scroll: boundaryDetectionScroll.bind(self),
              targetEls: self.targetEls,
            });
          }
        }
      } else {
        if (moveInTargetEls.complete.length > 0) {
          // 可以放置
          self.ismovecanput = true;
          self.cloneEl.style.cursor = 'pointer';
        } else {
          // 不可以放
          self.cloneEl.style.cursor = 'not-allowed';
        }

        self.cloneEl.style.left = `${left}px`;
        self.cloneEl.style.top = `${top}px`;
      }
    }
  }

  onContainerMouseleave() {
    const self = this;
    if (!self.isdown) return false;
    goBack.call(self, self.sourceEl, self.targetEls);
  }

  /**
   * refresh
   */
  refresh() {
    for (let i = 0; i < this.sourceEls.length; i++) {
      const sourceEl = this.sourceEls[i];
      const sourceHandlerEntry = this.sourceEventHanlder.get(sourceEl);
      for (const p in sourceHandlerEntry) {
        sourceEl.removeEventListener(p, sourceHandlerEntry[p]);
      }
    }
    this.sourceEls = this.el.querySelectorAll(`.${selectorPrefix}source`);
    this.targetEls = this.el.querySelectorAll(`.${selectorPrefix}target`);
    initDragSourceEvent.call(this);
  }

  /**
   * setScale
   * @param {SelectOptions} - scale
   */
  setScale(scale) {
    this.scale = scale;
  }

  /**
   * setDisable
   * @param {Boolean} - disable
   */
  setDisable(disable) {
    this.disable = disable;
  }
}

/**
 * DroppableFactory
 */
const DroppableFactory = {
  /**
   * 创建一个Droppable
   * @param {HtmlElement} - el
   * @param {Object} - config
   * @return {Droppable} - Droppable
   */
  create(el, config) {
    return new Droppable(el, config);
  },
};

export default DroppableFactory;
