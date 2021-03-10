import activePageManager from './ActivePageManager';

/**
 * ActivePageMouseWheelBind
 * @class ActivePageMouseWheelBind
 * @classdesc ActivePageMouseWheelBind
 */
const ActivePageMouseWheelBind = {
  /**
   * bindMouseWheel
   * @param pageId
   */
  bindMouseWheel(pageId) {
    const activePage = activePageManager.getPage(pageId);
    if (activePage) {
      activePage.bindMouseWheel();
    }
  },

  /**
   * unBindMouseWheel
   * @param pageId
   */
  unBindMouseWheel(pageId) {
    const activePage = activePageManager.getPage(pageId);
    if (activePage) {
      activePage.unBindMouseWheel();
    }
  },
};

export default ActivePageMouseWheelBind;
