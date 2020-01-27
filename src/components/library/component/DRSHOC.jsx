import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ShapeModel from '../../../model/ShapeModel';

import ClipBoard from '../../../util/ClipBoard';
import Emitter from '../../../util/Emitter';
import Actions from '../../../util/Actions';
import { Immutable } from '../../../util/CTMobile-UI-Util';
import {
  DRSITEMSELECTORPREFIX,
  KEYBOARD_NORMAL_STEP,
  DRSPREFIX,
} from '../../../util/Constant';

import DRSKeyBoard from './DRSKeyBoard';
import DRSStyle from './DRSStyle';

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

      this.drsKeyBoard = new DRSKeyBoard(this);
      this.drsStyle = new DRSStyle();

      this.isUnmount = false;

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
      this.isUnmount = true;
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
      if (this.isUnmount) return false;

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
      if (this.state.rangeSelectActive) return false;

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
      if (this.isUnmount || !this.state.rangeSelectActive) return false;

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
     * getAttribute
     * @return {String}
     */
    getAttribute() {
      const { attribute } = this.props;
      return attribute;
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
      this.drsKeyBoard.bindKeyBoard();
    }

    /**
     * unBindKeyBoard
     */
    unBindKeyBoard() {
      this.drsKeyBoard.unBindKeyBoard();
    }

    /**
     * arrowDetail
     * @param {String} - direction [top,bottom,left,right]
     * @param {SelectOptions} - step
     */
    arrowDetail(direction, step = KEYBOARD_NORMAL_STEP) {
      const styleKey = (direction === 'top' || direction === 'bottom') ? 'top' : 'left';
      const styleUpperKey = styleKey.charAt(0).toUpperCase() + styleKey.substring(1);

      // if (direction === 'left' || direction === 'top') {
      //   if (this.el[`offset${styleUpperKey}`] - step < 0) {
      //     this.el.style[styleKey] = '0';
      //   } else {
      //     this.el.style[styleKey] = `${this.el[`offset${styleUpperKey}`] - step}px`;
      //   }
      // } else {
      //   this.el.style[styleKey] = `${this.el[`offset${styleUpperKey}`] + step}px`;
      // }

      let value;
      if (direction === 'left' || direction === 'top') {
        if (this.el[`offset${styleUpperKey}`] - step < 0) {
          value = '0';
        } else {
          value = `${this.el[`offset${styleUpperKey}`] - step}`;
        }
      } else {
        value = `${this.el[`offset${styleUpperKey}`] + step}`;
      }

      const style = this.getProperty().style;
      style.position[styleKey] = window.parseInt(value);
      this.setPropertyByProps('style', style, () => {
        const {
          pageid: pageId,
          componentid: componentId,
        } = this.el.dataset;
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

        Emitter.trigger(Actions.components.library.component.stylechange, {
          pageId,
          componentId,
        });
      });
    }

    /**
     * deleteSelf
     */
    deleteSelf() {
      if (!this.getEl()) return false;

      const { pageId, componentId } = this.props;
      const result = ReactDOM.unmountComponentAtNode(this.getEl().parentElement);
      if (result) {
        ShapeModel.removeShapeByPage(ShapeModel.getShape({ pageId, componentId }));
      }

      Emitter.trigger(Actions.components.business.canvaspanel.removeshape, { pageId, componentId });
    }

    /**
     * copy
     */
    copy() {
      const { pageId, attribute } = this.props;
      const { property } = this.state;
      const el = this.getEl();
      ClipBoard.set(pageId, [{
        groupKey,
        componentKey,
        attribute,
        pageId,
        // componentId: uuid(),
        property: Immutable.cloneDeep(property),
        left: el.offsetLeft,
        top: el.offsetTop,
        width: el.offsetWidth,
        height: el.offsetHeight,
        active: true,
      }]);
    }

    /**
     * render
     * @return {ReactElement}
     */
    render() {
      const {
        pageId = '',
        componentId = '',
        attribute,
      } = this.props;

      const {
        active = false,
      } = this.state;

      const stateClone = Immutable.cloneDeep(this.state);

      return (
        <div
          ref={(el) => {
            this.el = el;
          }}
          className={`${selectorPrefix} ${this.getDRSClassName()} ${this.getActiveClassName()}`}
          style={this.drsStyle.getStyle(stateClone)}
          data-groupkey={groupKey}
          data-componentkey={componentKey}
          data-pageid={pageId}
          data-componentid={componentId}
          data-attribute={attribute}
          id={componentId}
        >
          {active ? this.renderActiveIndicatorPointer() : null}
          <Component
            {...this.state}
            style={{
              style: this.drsStyle.getStyle(stateClone),
              boxShadowStyle: this.drsStyle.getBoxShadowStyle(stateClone),
              borderStyle: this.drsStyle.getBorderStyle(stateClone),
              borderRadiusStyle: this.drsStyle.getBorderRadiusStyle(stateClone),
              fontFamilyStyle: this.drsStyle.getFontFamilyStyle(stateClone),
              alignStyle: this.drsStyle.getAlignStyle(stateClone),
            }}
            selectorPrefix={selectorPrefix}
            groupKey={groupKey}
            componentKey={componentKey}
            attribute={attribute}
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
