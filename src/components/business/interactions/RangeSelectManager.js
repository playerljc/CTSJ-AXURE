const rangeSelectMap = new Map();

/**
 * RangeSelectManager
 * @class RangeSelectManager
 * @classdesc RangeSelectManager
 */
const RangeSelectManager = {
  /**
   * set
   * @param {String} - pageId
   * @param {RangeSelect} - rangeSelect
   */
  set(pageId, rangeSelect) {
    rangeSelectMap.set(pageId, rangeSelect);
  },

  /**
   * get
   * @param {String} - pageId
   * @return {RangeSelect}
   */
  get(pageId) {
    return rangeSelectMap.get(pageId);
  },

  /**
   * delete
   * @param {String} - pageId
   */
  delete(pageId) {
    rangeSelectMap.delete(pageId);
  },
};

export default RangeSelectManager;
