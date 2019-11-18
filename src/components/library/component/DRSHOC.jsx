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

import Emitter from '../../../util/Emitter';
import Actions from '../../../util/Actions';

import './DRSHOC.less';

const selectorPrefix = DRSPREFIX;

/**
 * DRSHOC
 * @param {React.PureComponent} Component
 * @param {String} - groupKey
 * @param {String} - componentKey
 * @return {React.PureComponent}
 */
export default (Component, { groupKey, componentKey }) => {
  class DRSHOC extends React.PureComponent {
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
      }, () => {
        Emitter.trigger(Actions.components.library.component.active, {
          pageId: this.getPageId(),
          componentId: this.getComponentId(),
          from: selectorPrefix,
        });
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
      }, () => {
        Emitter.trigger(Actions.components.library.component.unactive, {
          pageId: this.getPageId(),
          componentId: this.getComponentId(),
          from: selectorPrefix,
        });
      });
    }

    /**
     * rangeSelectActive
     * 这个reangeSelectActive不带有Resizeable操作
     */
    rangeSelectActive() {
      this.setState({
        rangeSelectActive: true,
      }, () => {
        Emitter.trigger(Actions.components.library.component.rangeselectactive, {
          pageId: this.getPageId(),
          componentId: this.getComponentId(),
          from: selectorPrefix,
        });
      });
    }

    /**
     * unRangeSelectActive
     */
    unRangeSelectActive() {
      this.setState({
        rangeSelectActive: false,
      }, () => {
        Emitter.trigger(Actions.components.library.component.unrangeselectactive, {
          pageId: this.getPageId(),
          componentId: this.getComponentId(),
          from: selectorPrefix,
        });
      });
    }

    /**
     * isActive
     * @return {boolean}
     */
    isActive() {
      const { active = false } = this.state;
      return active;
    }

    /**
     * isRangeSelectActive
     * @return {boolean}
     */
    isRangeSelectActive() {
      const { rangeSelectActive = false } = this.state;
      return rangeSelectActive;
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
     * getComponentKey
     * @return {String}
     */
    getComponentKey() {
      const { el } = this;
      if (!el) return '';

      const { dataset: { componentkey } } = el;
      return componentkey;
    }

    /**
     * getGroupKey
     * @return {String}
     */
    getGroupKey() {
      const { el } = this;
      if (!el) return '';

      const { dataset: { groupkey } } = el;
      return groupkey;
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
     * @param {Function} -success
     */
    setPropertyByProps(propertyName, propertyValue, success) {
      const property = { ...this.state.property };
      property[propertyName] = propertyValue;
      this.setState({
        property,
      }, () => {
        if (success) {
          success();
        }
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

      Emitter.trigger(Actions.components.business.canvaspanel.removeshape, { pageId, componentId });
    }

    /**
     * getStyle
     * @return {Object}
     */
    getStyle() {
      const {
        active = false,
        property: {
          style: {
            position: {
              left,
              top,
            },
            dimension: {
              width,
              height,
            },
            opacity,
            zIndex,
          },
        },
      } = this.state;

      return Object.assign(
        {
          zIndex: active ? getMaxLevelNumber() : zIndex,
          width: `${width}px`,
          height: `${height}px`,
          left: `${left}px`,
          top: `${top}px`,
          boxShadow: this.getBoxShadowStyle(),
          opacity: opacity / 100,
        },
        this.getBorderStyle(),
        this.getBorderRadiusStyle(),
      );
    }

    /**
     * getBoxShadowStyle
     * @returns {String}
     */
    getBoxShadowStyle() {
      const {
        property: {
          style: {
            shadow: {
              inset,
              outset,
            },
          },
        },
      } = this.state;

      const boxShadow = [];

      if (!inset.disabled) {
        boxShadow.push(`inset ${inset.offsetX}px ${inset.offsetY}px ${inset.blurRadius}px ${inset.spreadRadius}px ${inset.color}`);
      }

      if (!outset.disabled) {
        boxShadow.push(`${outset.offsetX}px ${outset.offsetY}px ${outset.blurRadius}px ${outset.spreadRadius}px ${outset.color}`);
      }

      return boxShadow.join(',');
    }

    /**
     * getBorderStyle
     * @returns {Object}
     */
    getBorderStyle() {
      const {
        property: {
          style: {
            border: {
              borderLeftDisable,
              borderRightDisable,
              borderTopDisable,
              borderBottomDisable,
              borderWidth,
              borderStyle,
              borderColor,
            },
          },
        },
      } = this.state;

      return Object.assign({},
        !borderLeftDisable ? { borderLeft: `${borderWidth}px ${borderStyle} ${borderColor}` } : null,
        !borderRightDisable ? { borderRight: `${borderWidth}px ${borderStyle} ${borderColor}` } : null,
        !borderTopDisable ? { borderTop: `${borderWidth}px ${borderStyle} ${borderColor}` } : null,
        !borderBottomDisable ? { borderBottom: `${borderWidth}px ${borderStyle} ${borderColor}` } : null,
      );
    }

    /**
     * getBorderRadiusStyle
     * @return {Object}
     */
    getBorderRadiusStyle() {
      const {
        property: {
          style: {
            radius: {
              borderLeftTopRadiusDisable,
              borderRightTopRadiusDisable,
              borderLeftBottomRadiusDisable,
              borderRightBottomRadiusDisable,
              radius,
            },
          },
        },
      } = this.state;

      return Object.assign({},
        !borderLeftTopRadiusDisable ? { borderTopLeftRadius: `${radius}px` } : null,
        !borderRightTopRadiusDisable ? { borderTopRightRadius: `${radius}px` } : null,
        !borderLeftBottomRadiusDisable ? { borderBottomLeftRadius: `${radius}px` } : null,
        !borderRightBottomRadiusDisable ? { borderBottomRightRadius: `${radius}px` } : null,
      );
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
      const {
        pageId = '',
        componentId = '',
      } = this.props;

      const {
        active = false,
      } = this.state;

      return (
        <div
          ref={(el) => {
            this.el = el;
          }}
          className={`${selectorPrefix} ${this.getDRSClassName()} ${this.getActiveClassName()}`}
          style={this.getStyle()}
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
    // number: 1,
    pageId: '',
    componentId: '',
    property: {},
  };

  DRSHOC.propTypes = {
    // z-index的层级
    // number: PropTypes.number,
    // 页面的id
    pageId: PropTypes.string,
    // 组件的id
    componentId: PropTypes.string,
    // 组件的属性数据
    property: PropTypes.object,
  };

  return DRSHOC;
};
