import uuid from 'uuid/v1';

import ClipBoard from '../../../../util/ClipBoard';
import Emitter from '../../../../util/Emitter';
import Actions from '../../../../util/Actions';
import KeyBoard from '../../../../util/KeyBoard';
import { Immutable } from '../../../../util/CTMobile-UI-Util';

import ShapeModel from '../../../../model/ShapeModel';

const pageIns = Symbol();

/**
 * CanvasTabPanelKeyBoard
 * @class CanvasTabPanelKeyBoard
 * @classdesc 页面的KeyBoard管理
 */
class CanvasTabPanelKeyBoard {
  constructor(page) {
    this[pageIns] = page;

    this.keyBoardMap = new Map([
      [['Ctrl', 'v'], ::this.onCtrlV],
      [['Ctrl', 'a'], ::this.onCtrlA],
    ]);
  }

  /**
   * bindKeyBoard
   */
  bindKeyBoard() {
    const entrys = this.keyBoardMap.entries();
    for (const [key, handler] of entrys) {
      KeyBoard.on(key, handler);
    }
  }

  /**
   * unBindKeyBoard
   */
  unBindKeyBoard() {
    const entrys = this.keyBoardMap.entries();
    for (const [key, handler] of entrys) {
      KeyBoard.off(key, handler);
    }
  }

  /**
   * onCtrlV
   * @return {boolean}
   */
  onCtrlV() {
    const pageId = this[pageIns].getPageId();
    // console.log('Ctrl + V:', pageId);
    const clipBoardData = ClipBoard.get(pageId);
    if (!clipBoardData || clipBoardData.length === 0) return false;

    Emitter.trigger(
      Actions.components.business.canvaspanel.paste,
      Immutable.cloneDeep(clipBoardData.map(t => Object.assign(t, { componentId: uuid() })))
    );
  }

  /**
   * onCtrlA
   */
  onCtrlA() {
    // console.log('Ctrl + a');
    // const els = this.innerEl.querySelectorAll(`.${DRSPREFIX}`);
    const pageId = this[pageIns].getPageId();
    const ids = ShapeModel.getShapesByPage(pageId).map(shape => shape.getEl().getAttribute('id'));
    Emitter.trigger(
      Actions.components.business.canvaspanel.selectall,
      ids
    );
  }
}

export default CanvasTabPanelKeyBoard;
