/*
 * groupkey
 * componentKey
 * pageId
 *
 * property
 *
 * left
 * top
 * width
 * height
 *
 * */

const map = new Map();

/**
 * 全局只有一个ClipBoard，也可以说是Page的ClipBoard
 * ClipBoard的值是一个Array<> ,Array中的item是
 * {
 *   groupkey: 由el获取
 *   componentKey: 由el获取
 *   pageId: 由el获取
 *   property: 有Shape获取
 *
 *   left: 由el获取
 *   top: 由el获取
 *   width: 由el获取
 *   height: 由el获取
 *
 *   active: 是否要激活当前节点
 * }
 */
export default {
  /**
   * set
   * @param {String} - pageId
   * @param {Array<Object>} - entry
   */
  set(pageId, entry) {
    map.set(pageId, entry);
  },
  /**
   * get
   * @param {String} - pageId
   * @return - {Array<Object>}
   */
  get(pageId) {
    return map.get(pageId);
  },
  /**
   * delete
   * @param {String} - pageId
   */
  delete(pageId) {
    map.delete(pageId);
  },
  /**
   * clear
   */
  clear() {
    map.clear();
  },
};
