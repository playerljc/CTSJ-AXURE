import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { getMaxLevelNumber } from './ComponentBaseHOC';

import KeyBoard from '../../../util/KeyBoard';
import ClipBoard from '../../../util/ClipBoard';
import { Immutable } from '../../../util/CTMobile-UI-Util';
import {
  DRSITEMSELECTORPREFIX,
  KEYBOARD_NORMAL_STEP,
  KEYBOARD_FAST_STEP,
  DRSPREFIX,
} from '../../../util/Constant';

import ShapeModel from '../../../model/ShapeModel';

import './DRSHOC.less';

const selectorPrefix = DRSPREFIX;

/**
 * DRSHOC
 * @param {React.Component} Component
 * @param {String} - groupKey
 * @param {String} - componentKey
 * @return {React.Component}
 */
export default (Component, { groupKey, componentKey }) => {
  class DRSHOC extends React.Component {
    /**
     * constructor
     * @param {Object} - props
     */
    constructor(props) {
      super(props);

      this.keyBoardMap = new Map([
        [['ArrowUp'], this.onArrowUp],

        [['ArrowDown'], this.onArrowDown],

        [['ArrowLeft'], this.onArrowLeft],

        [['ArrowRight'], this.onArrowRight],

        [['Ctrl', 'ArrowUp'], this.onCtrlArrowUp],

        [['Ctrl', 'ArrowDown'], this.onCtrlArrowDown],

        [['Ctrl', 'ArrowLeft'], this.onCtrlArrowLeft],

        [['Ctrl', 'ArrowRight'], this.onCtrlArrowRight],


        [['Shift', 'ArrowUp'], this.onCtrlArrowUp],

        [['Shift', 'ArrowDown'], this.onCtrlArrowDown],

        [['Shift', 'ArrowLeft'], this.onCtrlArrowLeft],

        [['Shift', 'ArrowRight'], this.onCtrlArrowRight],


        [['Repeat', 'ArrowUp'], this.onRepeatArrowUp],

        [['Repeat', 'ArrowDown'], this.onRepeatArrowDown],

        [['Repeat', 'ArrowLeft'], this.onRepeatArrowLeft],

        [['Repeat', 'ArrowRight'], this.onRepeatArrowRight],


        [['Repeat', 'Ctrl', 'ArrowUp'], this.onRepeatCtrlArrowUp],

        [['Repeat', 'Ctrl', 'ArrowDown'], this.onRepeatCtrlArrowDown],

        [['Repeat', 'Ctrl', 'ArrowLeft'], this.onRepeatCtrlArrowLeft],

        [['Repeat', 'Ctrl', 'ArrowRight'], this.onRepeatCtrlArrowRight],


        [['Repeat', 'Shift', 'ArrowUp'], this.onRepeatCtrlArrowUp],

        [['Repeat', 'Shift', 'ArrowDown'], this.onRepeatCtrlArrowDown],

        [['Repeat', 'Shift', 'ArrowLeft'], this.onRepeatCtrlArrowLeft],

        [['Repeat', 'Shift', 'ArrowRight'], this.onRepeatCtrlArrowRight],


        [['Ctrl', 'c'], this.onCtrlC],

        [['Delete'], this.onDelete],

        [['Backspace'], this.onBackapace],

        [['Ctrl', 'Control'], this.onCtrl],
      ]);

      this.state = {
        active: false,
        rangeSelectActive: false,
        property: Object.assign({}, props.property),
      };
    }

    /**
     * componentWillUnmount
     */
    componentWillUnmount() {
      this.unBindKeyBoard();
    }

    /**
     * active
     * 这个Active是带有可以Resizeable的操作,正常节点的Active
     */
    active() {
      // 注册当前Shape的KeyBoard操作
      this.bindKeyBoard();
      this.setState({
        active: true,
      });
    }

    /**
     * unActive
     * 正常节点的unActive
     */
    unActive() {
      // 解除当前Shape的KeyBoard操作
      this.unBindKeyBoard();
      this.setState({
        active: false,
      });
    }

    /**
     * rangeSelectActive
     * 这个reangeSelectActive不带有Resizeable操作
     */
    rangeSelectActive() {
      this.setState({
        rangeSelectActive: true,
      });
    }

    /**
     * unRangeSelectActive
     */
    unRangeSelectActive() {
      this.setState({
        rangeSelectActive: false,
      });
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
     * getComponentId
     * @return {String}
     */
    getComponentId() {
      const { componentId } = this.props;
      return componentId;
    }

    /**
     * getEL
     * @return {HTMLElement}
     */
    getEl() {
      return this.el;
    }

    /**
     * renderActiveIndicatorPointer
     */
    renderActiveIndicatorPointer() {
      return (
        <React.Fragment>
          <span className={`${selectorPrefix}-indicator-pointer top`} />
          <span className={`${selectorPrefix}-indicator-pointer bottom`} />
          <span className={`${selectorPrefix}-indicator-pointer left`} />
          <span className={`${selectorPrefix}-indicator-pointer right`} />
          <span className={`${selectorPrefix}-indicator-pointer lefttop`} />
          <span className={`${selectorPrefix}-indicator-pointer leftbottom`} />
          <span className={`${selectorPrefix}-indicator-pointer righttop`} />
          <span className={`${selectorPrefix}-indicator-pointer rightbottom`} />
        </React.Fragment>
      );
    }

    /**
     * getProperty
     * @return {Object}
     */
    getProperty() {
      return Object.assign({}, this.state.property);
    }

    /**
     * 根据propertyName设置Property的值
     * @param {String} - propertyName
     * @param {Object} - propertyValue
     */
    setPropertyByProps(propertyName, propertyValue) {
      const property = { ...this.state.property };
      property[propertyName] = propertyValue;
      this.setState({
        property,
      });
    }

    /**
     * getDRSClassName
     * @return {String}
     */
    getDRSClassName() {
      return DRSITEMSELECTORPREFIX.join(' ');
    }

    /**
     * getActiveClassName
     * @return {String}
     */
    getActiveClassName() {
      const { rangeSelectActive = false, active = false } = this.state;
      return active || rangeSelectActive ? 'active' : '';
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
     * arrowDetail
     * @param {String} - direction [top,bottom,left,right]
     * @param {Number} - step
     */
    arrowDetail(direction, step = KEYBOARD_NORMAL_STEP) {
      const styleKey = (direction === 'top' || direction === 'bottom') ? 'top' : 'left';
      const styleUpperKey = styleKey.charAt(0).toUpperCase() + styleKey.substring(1);

      if (direction === 'left' || direction === 'top') {
        if (this.el[`offset${styleUpperKey}`] - step < 0) {
          this.el.style[styleKey] = '0';
        } else {
          this.el.style[styleKey] = `${this.el[`offset${styleUpperKey}`] - step}px`;
        }
      } else {
        this.el.style[styleKey] = `${this.el[`offset${styleUpperKey}`] + step}px`;
      }

      const { pageid: pageId } = this.el.dataset;
      const pageEl = document.getElementById(pageId).parentElement;
      const elRect = this.el.getBoundingClientRect();
      const pageRect = pageEl.getBoundingClientRect();

      if (direction === 'left' || direction === 'top') {
        if (elRect[direction] <= pageRect[direction]) {
          if (pageEl[`scroll${styleUpperKey}`] > 0) {
            pageEl[`scroll${styleUpperKey}`] -= (pageRect[direction] - elRect[direction]);
          }
        }
      } else if (elRect[direction] >= pageRect[direction]) {
        pageEl[`scroll${styleUpperKey}`] += (elRect[direction] - pageRect[direction]);
      }
    }

    /**
     * deleteSelf
     */
    deleteSelf() {
      const { pageId, componentId } = this.props;
      const result = ReactDOM.unmountComponentAtNode(this.getEl().parentElement);
      if (result) {
        ShapeModel.removeShapeByPage(ShapeModel.getShape({ pageId, componentId }));
      }
    }

    /**
     * onArrowUp
     */
    onArrowUp = () => {
      console.log('arrowUp');
      this.arrowDetail('top');
    };

    /**
     * onArrowDown
     */
    onArrowDown = () => {
      console.log('arrowDown');
      this.arrowDetail('bottom');
    };

    /**
     * onArrowLeft
     */
    onArrowLeft = () => {
      console.log('arrowLeft');
      this.arrowDetail('left');
    };

    /**
     * onArrowRight
     */
    onArrowRight = () => {
      console.log('arrowRight');
      this.arrowDetail('right');
    };

    /**
     * onCtrlArrowUp
     */
    onCtrlArrowUp = () => {
      console.log('ctrlArrowUp');
      this.arrowDetail('top', KEYBOARD_FAST_STEP);
    };

    /**
     * onCtrlArrowDown
     */
    onCtrlArrowDown = () => {
      console.log('ctrlArrowDown');
      this.arrowDetail('bottom', KEYBOARD_FAST_STEP);
    };

    /**
     * onCtrlArrowLeft
     */
    onCtrlArrowLeft = () => {
      console.log('ctrlArrowLeft');
      this.arrowDetail('left', KEYBOARD_FAST_STEP);
    };

    /**
     * onCtrlArrowRight
     */
    onCtrlArrowRight = () => {
      console.log('ctrlArrowRight');
      this.arrowDetail('right', KEYBOARD_FAST_STEP);
    };

    /**
     * onRepeatArrowUp
     */
    onRepeatArrowUp = () => {
      console.log('repeatArrowUp');
      this.arrowDetail('top');
    };

    /**
     * onRepeatArrowDown
     */
    onRepeatArrowDown = () => {
      console.log('repeatArrowDown');
      this.arrowDetail('bottom');
    };

    /**
     * onRepeatArrowLeft
     */
    onRepeatArrowLeft = () => {
      console.log('repeatArrowLeft');
      this.arrowDetail('left');
    };

    /**
     * onRepeatArrowRight
     */
    onRepeatArrowRight = () => {
      console.log('repeatArrowRight');
      this.arrowDetail('right');
    };

    /**
     * onRepeatCtrlArrowUp
     */
    onRepeatCtrlArrowUp = () => {
      console.log('repeatCtrlArrowUp');
      this.arrowDetail('top', KEYBOARD_FAST_STEP);
    };

    /**
     * onRepeatCtrlArrowDown
     */
    onRepeatCtrlArrowDown = () => {
      console.log('repeatCtrlArrowDown');
      this.arrowDetail('bottom', KEYBOARD_FAST_STEP);
    };

    /**
     * onRepeatCtrlArrowLeft
     */
    onRepeatCtrlArrowLeft = () => {
      console.log('repeatCtrlArrowLeft');
      this.arrowDetail('left', KEYBOARD_FAST_STEP);
    };

    /**
     * onRepeatCtrlArrowRight
     */
    onRepeatCtrlArrowRight = () => {
      console.log('repeatCtrlArrowRight');
      this.arrowDetail('right', KEYBOARD_FAST_STEP);
    };

    /**
     * onCtrlC
     */
    onCtrlC = () => {
      console.log('CtrlC');
      const { pageId } = this.props;
      const { property } = this.state;
      const el = this.getEl();
      ClipBoard.set(pageId, [{
        groupKey,
        componentKey,
        pageId,
        // componentId: uuid(),
        property: Immutable.cloneDeep(property),
        left: el.offsetLeft,
        top: el.offsetTop,
        width: el.offsetWidth,
        height: el.offsetHeight,
        active: true,
      }]);
    };

    /**
     * onDelete
     */
    onDelete = () => {
      console.log('Delete');
      this.deleteSelf();
    };

    /**
     * onBackapace
     */
    onBackapace = () => {
      console.log('Backapace');
      this.deleteSelf();
    };

    /**
     * onCtrl
     */
    onCtrl = () => {
      console.log('Ctrl');
    };

    /**
     * render
     * @return {ReactElement}
     */
    render() {
      const { number = 1, pageId = '', componentId = '' } = this.props;
      const { property: { style: { width, height } } } = this.state;
      const { active = false } = this.state;
      return (
        <div
          ref={(el) => {
            this.el = el;
          }}
          className={`${selectorPrefix} ${this.getDRSClassName()} ${this.getActiveClassName()}`}
          style={{
            zIndex: active ? getMaxLevelNumber() : number,
            width: `${width}px`,
            height: `${height}px`,
          }}
          data-groupkey={groupKey}
          data-componentkey={componentKey}
          data-pageid={pageId}
          data-componentid={componentId}
        >
          {active ? this.renderActiveIndicatorPointer() : null}
          <Component
            {...this.state}
            selectorPrefix={selectorPrefix}
            groupKey={groupKey}
            componentKey={componentKey}
            ref={(ins) => {
              this.ins = ins;
            }}
          />
        </div>
      );
    }
  }

  DRSHOC.defaultProps = {
    number: 1,
    pageId: '',
    componentId: '',
    property: {},
  };

  DRSHOC.propTypes = {
    // z-index的层级
    number: PropTypes.number,
    // 页面的id
    pageId: PropTypes.string,
    // 组件的id
    componentId: PropTypes.string,
    // 组件的属性数据
    property: PropTypes.object,
  };

  return DRSHOC;
};
