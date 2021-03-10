const rangeSelectMap = new Map();

/**
 * RangeSelectManager
 * @class RangeSelectManager
 * @classdesc RangeSelectManager
 */
const RangeSelectManager = {
  /**
   * set
   * @param pageId
   * @param rangeSelect
   */
  set(pageId, rangeSelect) {
    rangeSelectMap.set(pageId, rangeSelect);
  },

  /**
   * get
   * @return {RangeSelect}
   * @param pageId
   */
  get(pageId) {
    return rangeSelectMap.get(pageId);
  },

  /**
   * delete
   * @param pageId
   */
  delete(pageId) {
    rangeSelectMap.delete(pageId);
  },
};

export default RangeSelectManager;
