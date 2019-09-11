/**
 * ActivePageKeyBoardBind
 * @class ActivePageKeyBoardBind
 * @classdesc ActivePageKeyBoardBind
 */
class ActivePageKeyBoardBind {
  constructor(activePageManager) {
    this.activePageManager = activePageManager;
  }

  /**
   * bindKeyBoard
   * @param {String} - pageId
   */
  bindKeyBoard(pageId) {
    const activePage = this.activePageManager.getPage(pageId);
    if (activePage) {
      activePage.bindKeyBoard();
    }
  }

  /**
   * unBindKeyBoard
   * @param {String} - pageId
   */
  unBindKeyBoard(pageId) {
    const activePage = this.activePageManager.getPage(pageId);
    if (activePage) {
      activePage.unBindKeyBoard();
    }
  }
}

export default ActivePageKeyBoardBind;
