import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';

import KeyBoard from '../../../../util/KeyBoard';
import ClipBoard from '../../../../util/ClipBoard';
import Actions from '../../../../util/Actions';
import Emitter from '../../../../util/Emitter';
import { Immutable } from '../../../../util/CTMobile-UI-Util';
import {
  DRSSELECTORPREFIX,
  DROPPABLESELECTORPREFIX,
} from '../../../../util/Constant';

import './CanvasTabPanel.less';

const selectorPrefix = 'CanvasTabPanel';

export { selectorPrefix };

/**
 * CanvasTabPanel
 */
class CanvasTabPanel extends React.Component {
  constructor(props) {
    super(props);

    this.keyBoardMap = new Map([
      [['Ctrl', 'v'], this.onCtrlV],
    ]);
  }

  componentDidMount() {
    const { getInstance } = this.props;
    if (getInstance) {
      getInstance(this);
    }
  }

  /**
   * getPageId
   * @return {String}
   */
  getPageId() {
    const { pageId } = this.props;
    return pageId;
  }

  /**
   * setActiveShape
   * @param {Shape} shape
   */
  setActiveShape(shape) {
    this.activeShape = shape;
  }

  /**
   * getActiveShape
   * @return {Shape}
   */
  getActiveShape() {
    return this.activeShape;
  }

  /**
   * getDRSClassName
   * @return {string}
   */
  getDRSClassName() {
    return DRSSELECTORPREFIX.join(' ');
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

  onCtrlV = () => {
    const { pageId } = this.props;
    console.log('Ctrl + V:', pageId);
    const clipBoardData = ClipBoard.get(pageId);
    if (!clipBoardData || clipBoardData.length === 0) return false;

    Emitter.trigger(
      Actions.components.business.canvaspanel.paste,
      Immutable.cloneDeep(clipBoardData.map(t => Object.assign(t, { componentId: uuid() })))
    );
  };

  render() {
    const { activePageId, pageId } = this.props;
    return (
      <div
        className={`${selectorPrefix} ${activePageId === pageId ? `${DROPPABLESELECTORPREFIX}-target` : ''}`}
        data-pageid={pageId}
      >
        <div
          className={`${selectorPrefix}-Scroll ${activePageId === pageId ? this.getDRSClassName() : ''}`}
          data-pageid={pageId}
          id={pageId}
        />
      </div>
    );
  }
}

CanvasTabPanel.defaultProps = {
  activePageId: '',
  pageId: '',
  property: {},
};

CanvasTabPanel.propTypes = {
  activePageId: PropTypes.string,

  // page的name
  name: PropTypes.string,
  // page的id
  pageId: PropTypes.string,
  // page的属性
  property: PropTypes.object,

  getInstance: PropTypes.func,
};

export default CanvasTabPanel;
