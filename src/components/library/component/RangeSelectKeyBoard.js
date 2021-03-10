import KeyBoard from '../../../util/KeyBoard';
import { KEYBOARD_FAST_STEP } from '../../../util/Constant';

const rangeSelectIns = Symbol();

/**
 * RangeSelectKeyBoard
 * @class RangeSelectKeyBoard
 * @classdesc RangeSelect的KeyBoard管理
 */
class RangeSelectKeyBoard {
  constructor(rangeSelect) {
    this[rangeSelectIns] = rangeSelect;

    this.keyBoardMap = new Map([
      [['ArrowUp'], ::this.onArrowUp],

      [['ArrowDown'], ::this.onArrowDown],

      [['ArrowLeft'], ::this.onArrowLeft],

      [['ArrowRight'], ::this.onArrowRight],

      [['Ctrl', 'ArrowUp'], ::this.onCtrlArrowUp],

      [['Ctrl', 'ArrowDown'], ::this.onCtrlArrowDown],

      [['Ctrl', 'ArrowLeft'], ::this.onCtrlArrowLeft],

      [['Ctrl', 'ArrowRight'], ::this.onCtrlArrowRight],

      [['Shift', 'ArrowUp'], ::this.onCtrlArrowUp],

      [['Shift', 'ArrowDown'], ::this.onCtrlArrowDown],

      [['Shift', 'ArrowLeft'], ::this.onCtrlArrowLeft],

      [['Shift', 'ArrowRight'], ::this.onCtrlArrowRight],

      [['Repeat', 'ArrowUp'], ::this.onRepeatArrowUp],

      [['Repeat', 'ArrowDown'], ::this.onRepeatArrowDown],

      [['Repeat', 'ArrowLeft'], ::this.onRepeatArrowLeft],

      [['Repeat', 'ArrowRight'], ::this.onRepeatArrowRight],

      [['Repeat', 'Ctrl', 'ArrowUp'], ::this.onRepeatCtrlArrowUp],

      [['Repeat', 'Ctrl', 'ArrowDown'], ::this.onRepeatCtrlArrowDown],

      [['Repeat', 'Ctrl', 'ArrowLeft'], ::this.onRepeatCtrlArrowLeft],

      [['Repeat', 'Ctrl', 'ArrowRight'], ::this.onRepeatCtrlArrowRight],

      [['Repeat', 'Shift', 'ArrowUp'], ::this.onRepeatCtrlArrowUp],

      [['Repeat', 'Shift', 'ArrowDown'], ::this.onRepeatCtrlArrowDown],

      [['Repeat', 'Shift', 'ArrowLeft'], ::this.onRepeatCtrlArrowLeft],

      [['Repeat', 'Shift', 'ArrowRight'], ::this.onRepeatCtrlArrowRight],

      [['Ctrl', 'c'], ::this.onCtrlC],

      [['Delete'], ::this.onDelete],

      [['Backspace'], ::this.onBackapace],

      [['Ctrl', 'Control'], ::this.onCtrl],
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
   * onArrowUp
   */
  onArrowUp() {
    // console.log('arrowUp');
    this[rangeSelectIns].arrowDetail('top');
  }

  /**
   * onArrowDown
   */
  onArrowDown() {
    // console.log('arrowDown');
    this[rangeSelectIns].arrowDetail('bottom');
  }

  /**
   * onArrowLeft
   */
  onArrowLeft() {
    // console.log('arrowLeft');
    this[rangeSelectIns].arrowDetail('left');
  }

  /**
   * onArrowRight
   */
  onArrowRight() {
    // console.log('arrowRight');
    this[rangeSelectIns].arrowDetail('right');
  }

  /**
   * onCtrlArrowUp
   */
  onCtrlArrowUp() {
    // console.log('ctrlArrowUp');
    this[rangeSelectIns].arrowDetail('top', KEYBOARD_FAST_STEP);
  }

  /**
   * onCtrlArrowDown
   */
  onCtrlArrowDown() {
    // console.log('ctrlArrowDown');
    this[rangeSelectIns].arrowDetail('bottom', KEYBOARD_FAST_STEP);
  }

  /**
   * onCtrlArrowLeft
   */
  onCtrlArrowLeft() {
    // console.log('ctrlArrowLeft');
    this[rangeSelectIns].arrowDetail('left', KEYBOARD_FAST_STEP);
  }

  /**
   * onCtrlArrowRight
   */
  onCtrlArrowRight() {
    // console.log('ctrlArrowRight');
    this[rangeSelectIns].arrowDetail('right', KEYBOARD_FAST_STEP);
  }

  /**
   * onRepeatArrowUp
   */
  onRepeatArrowUp() {
    // console.log('repeatArrowUp');
    this[rangeSelectIns].arrowDetail('top');
  }

  /**
   * onRepeatArrowDown
   */
  onRepeatArrowDown() {
    // console.log('repeatArrowDown');
    this[rangeSelectIns].arrowDetail('bottom');
  }

  /**
   * onRepeatArrowLeft
   */
  onRepeatArrowLeft() {
    // console.log('repeatArrowLeft');
    this[rangeSelectIns].arrowDetail('left');
  }

  /**
   * onRepeatArrowRight
   */
  onRepeatArrowRight() {
    // console.log('repeatArrowRight');
    this[rangeSelectIns].arrowDetail('right');
  }

  /**
   * onRepeatCtrlArrowUp
   */
  onRepeatCtrlArrowUp() {
    // console.log('repeatCtrlArrowUp');
    this[rangeSelectIns].arrowDetail('top', KEYBOARD_FAST_STEP);
  }

  /**
   * onRepeatCtrlArrowDown
   */
  onRepeatCtrlArrowDown() {
    // console.log('repeatCtrlArrowDown');
    this[rangeSelectIns].arrowDetail('bottom', KEYBOARD_FAST_STEP);
  }

  /**
   * onRepeatCtrlArrowLeft
   */
  onRepeatCtrlArrowLeft() {
    // console.log('repeatCtrlArrowLeft');
    this[rangeSelectIns].arrowDetail('left', KEYBOARD_FAST_STEP);
  }

  /**
   * onRepeatCtrlArrowRight
   */
  onRepeatCtrlArrowRight() {
    // console.log('repeatCtrlArrowRight');
    this[rangeSelectIns].arrowDetail('right', KEYBOARD_FAST_STEP);
  }

  /**
   * onCtrlC
   */
  onCtrlC() {
    // console.log('CtrlC');
    this[rangeSelectIns].copy();
  }

  /**
   * onDelete
   */
  onDelete() {
    // console.log('Delete');
    this[rangeSelectIns].deleteSelf();
  }

  /**
   * onBackapace
   */
  onBackapace() {
    // console.log('Backapace');
    this[rangeSelectIns].deleteSelf();
  }

  /**
   * onCtrl
   */
  onCtrl() {
    // console.log('Ctrl');
  }
}

export default RangeSelectKeyBoard;
