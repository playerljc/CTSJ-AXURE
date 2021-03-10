import activePageManager from './ActivePageManager';

/**
 * ActivePageKeyBoardBind
 * @class ActivePageKeyBoardBind
 * @classdesc ActivePageKeyBoardBind
 */
const ActivePageKeyBoardBind = {
  /**
   * bindKeyBoard
   * @param {String} - pageId
   */
  bindKeyBoard(pageId) {
    const activePage = activePageManager.getPage(pageId);
    if (activePage) {
      activePage.bindKeyBoard();
    }
  },

  /**
   * unBindKeyBoard
   * @param {String} - pageId
   */
  unBindKeyBoard(pageId) {
    const activePage = activePageManager.getPage(pageId);
    if (activePage) {
      activePage.unBindKeyBoard();
    }
  },
};

export default ActivePageKeyBoardBind;
