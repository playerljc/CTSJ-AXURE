/**
 * RangeSelectManager
 * @class RangeSelectManager
 * @classdesc RangeSelectManager
 */
class RangeSelectManager {
  constructor() {
    this.rangeSelectMap = new Map();
  }

  /**
   * set
   * @param {String} - pageId
   * @param {RangeSelect} - rangeSelect
   */
  set(pageId, rangeSelect) {
    this.rangeSelectMap.set(pageId, rangeSelect);
  }

  /**
   * get
   * @param {String} - pageId
   * @return {RangeSelect}
   */
  get(pageId) {
    return this.rangeSelectMap.get(pageId);
  }

  /**
   * delete
   * @param {String} - pageId
   */
  delete(pageId) {
    this.rangeSelectMap.delete(pageId);
  }
}

export default RangeSelectManager;
