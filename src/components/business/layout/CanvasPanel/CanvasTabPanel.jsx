import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';

import KeyBoard from '../../../../util/KeyBoard';
import ClipBoard from '../../../../util/ClipBoard';
import MouseWheel from '../../../../util/MouseWheel';
import Actions from '../../../../util/Actions';
import Emitter from '../../../../util/Emitter';
import { Immutable } from '../../../../util/CTMobile-UI-Util';
import {
  DRSSELECTORPREFIX,
  DROPPABLESELECTORPREFIX,
  DRSPREFIX,
} from '../../../../util/Constant';

import ShapeModel from '../../../../model/ShapeModel';

import './CanvasTabPanel.less';

const selectorPrefix = 'CanvasTabPanel';

export { selectorPrefix };

// 缩放的数组
/**
 * 400% 4
 * 350% 3.5
 * 300% 3
 * 250% 2.5
 * 200% 2
 * 150% 1.5
 * 125% 1.25
 * 100% 1
 * 80%  0.8
 * 65%  0.65
 * 50%  0.5
 * 33%  0.33
 * 25%  0.25
 * 10%  0.1
 */
const scaleCollection = [
  4,
  3.5,
  3,
  2.5,
  2,
  1.5,
  1.25,
  1,
  0.8,
  0.65,
  0.5,
  0.33,
  0.25,
  0.1,
];

/**
 * CanvasTabPanel
 */
class CanvasTabPanel extends React.Component {
  constructor(props) {
    super(props);

    this.keyBoardMap = new Map([
      [['Ctrl', 'v'], this.onCtrlV],
      [['Ctrl', 'a'], this.onCtrlA],
    ]);

    this.scaleIndex = 7;

    this.onMouseWheel = this.onMouseWheel.bind(this);
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
   * getPageName
   * @return {String}
   */
  getPageName() {
    const { name } = this.props;
    return name;
  }

  /**
   * getPageProperty
   * @return {Object}
   */
  getPageProperty() {
    const { property } = this.props;
    return Immutable.cloneDeep(property);
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

  /**
   * bindMouseWheel
   */
  bindMouseWheel() {
    MouseWheel.on(this.onMouseWheel);
  }

  /**
   * unBindMouseWheel
   */
  unBindMouseWheel() {
    MouseWheel.off(this.onMouseWheel);
  }

  /**
   * onCtrlV
   * @return {boolean}
   */
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

  /**
   * onCtrlA
   */
  onCtrlA = () => {
    console.log('Ctrl + a');
    // const els = this.innerEl.querySelectorAll(`.${DRSPREFIX}`);
    const { pageId } = this.props;
    const els = ShapeModel.getShapesByPage(pageId).map(shape => shape.getEl());
    Emitter.trigger(
      Actions.components.business.canvaspanel.selectall,
      els
    );
  };

  /**
   * onMouseWheel
   * @param {String} - direction [top | bottom]
   */
  onMouseWheel({
    direction,
  }) {
    if (direction === 'top') {
      if (this.scaleIndex !== 0) {
        this.scaleIndex--;
      }
    } else if (direction === 'bottom') {
      if (this.scaleIndex !== scaleCollection.length - 1) {
        this.scaleIndex++;
      }
    }

    const scale = this.getScale();
    this.innerEl.style.transform = `scale(${scale})`;
    Emitter.trigger(Actions.components.business.canvaspanel.mousewheel, scale);
  }

  /**
   * getScale
   * @return {number}
   */
  getScale() {
    return scaleCollection[this.scaleIndex];
  }

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
          ref={(el) => {
            this.innerEl = el;
          }}
        />
      </div>
    );
  }
}

CanvasTabPanel.defaultProps = {
  activePageId: '',
  name: '',
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
