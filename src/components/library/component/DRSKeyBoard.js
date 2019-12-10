import { KEYBOARD_FAST_STEP } from '../../../util/Constant';
import KeyBoard from '../../../util/KeyBoard';

const drsIns = Symbol();

/**
 * DRSKeyBoard
 * @class DRSKeyBoard
 * @classdesc DRS的键盘管理
 */
class DRSKeyBoard {
  constructor(drs) {
    this[drsIns] = drs;

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
    console.log('arrowUp');
    this[drsIns].arrowDetail('top');
  }

  /**
   * onArrowDown
   */
  onArrowDown() {
    console.log('arrowDown');
    this[drsIns].arrowDetail('bottom');
  }

  /**
   * onArrowLeft
   */
  onArrowLeft() {
    console.log('arrowLeft');
    this[drsIns].arrowDetail('left');
  }

  /**
   * onArrowRight
   */
  onArrowRight() {
    console.log('arrowRight');
    this[drsIns].arrowDetail('right');
  }

  /**
   * onCtrlArrowUp
   */
  onCtrlArrowUp() {
    console.log('ctrlArrowUp');
    this[drsIns].arrowDetail('top', KEYBOARD_FAST_STEP);
  }

  /**
   * onCtrlArrowDown
   */
  onCtrlArrowDown() {
    console.log('ctrlArrowDown');
    this[drsIns].arrowDetail('bottom', KEYBOARD_FAST_STEP);
  }

  /**
   * onCtrlArrowLeft
   */
  onCtrlArrowLeft() {
    console.log('ctrlArrowLeft');
    this[drsIns].arrowDetail('left', KEYBOARD_FAST_STEP);
  }

  /**
   * onCtrlArrowRight
   */
  onCtrlArrowRight() {
    console.log('ctrlArrowRight');
    this[drsIns].arrowDetail('right', KEYBOARD_FAST_STEP);
  }

  /**
   * onRepeatArrowUp
   */
  onRepeatArrowUp() {
    console.log('repeatArrowUp');
    this[drsIns].arrowDetail('top');
  }

  /**
   * onRepeatArrowDown
   */
  onRepeatArrowDown() {
    console.log('repeatArrowDown');
    this[drsIns].arrowDetail('bottom');
  }

  /**
   * onRepeatArrowLeft
   */
  onRepeatArrowLeft() {
    console.log('repeatArrowLeft');
    this[drsIns].arrowDetail('left');
  }

  /**
   * onRepeatArrowRight
   */
  onRepeatArrowRight() {
    console.log('repeatArrowRight');
    this[drsIns].arrowDetail('right');
  }

  /**
   * onRepeatCtrlArrowUp
   */
  onRepeatCtrlArrowUp() {
    console.log('repeatCtrlArrowUp');
    this[drsIns].arrowDetail('top', KEYBOARD_FAST_STEP);
  }

  /**
   * onRepeatCtrlArrowDown
   */
  onRepeatCtrlArrowDown() {
    console.log('repeatCtrlArrowDown');
    this[drsIns].arrowDetail('bottom', KEYBOARD_FAST_STEP);
  }

  /**
   * onRepeatCtrlArrowLeft
   */
  onRepeatCtrlArrowLeft() {
    console.log('repeatCtrlArrowLeft');
    this[drsIns].arrowDetail('left', KEYBOARD_FAST_STEP);
  }

  /**
   * onRepeatCtrlArrowRight
   */
  onRepeatCtrlArrowRight() {
    console.log('repeatCtrlArrowRight');
    this[drsIns].arrowDetail('right', KEYBOARD_FAST_STEP);
  }

  /**
   * onCtrlC
   */
  onCtrlC() {
    console.log('CtrlC');
    this[drsIns].copy();
  }

  /**
   * onDelete
   */
  onDelete() {
    console.log('Delete');
    this[drsIns].deleteSelf();
  }

  /**
   * onBackapace
   */
  onBackapace() {
    console.log('Backapace');
    this[drsIns].deleteSelf();
  }

  /**
   * onCtrl
   */
  onCtrl() {
    console.log('Ctrl');
  }
}

export default DRSKeyBoard;
