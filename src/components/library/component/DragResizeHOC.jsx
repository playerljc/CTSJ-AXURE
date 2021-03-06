import React from 'react';
import PropTypes from 'prop-types';
import { getMaxLevelNumber } from './ComponentBaseHOC';
import './DragResizeHOC.less';

const selectorPrefix = 'ct-axure-shape';
const dragItemSelectorPrefix = 'ct-drag-item';
const resizeItemSelectorPrefix = 'ct-resizeable-item';

/**
 * DragResizeHOC
 * @param {React.Component} Component
 * @param {String} - groupKey
 * @param {String} - componentKey
 * @return {React.Component}
 */
export default (Component, { groupKey, componentKey }) => {
  class DragResizeHOC extends React.Component {
    /**
     * constructor
     * @param {Object} - props
     */
    constructor(props) {
      super(props);
      this.state = {
        active: false,
        property: Object.assign({}, props.property),
      };
    }

    /**
     * active
     */
    active() {
      this.setState({
        active: true,
      });
    }

    /**
     * unActive
     */
    unActive() {
      this.setState({
        active: false,
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
     * render
     * @return {ReactElement}
     */
    render() {
      const { number = 1, pageId = '', componentId = '' } = this.props;
      const { property: { style: { width, height } } } = this.state;
      const { active = false } = this.state;
      return (
        <div
          ref={(el) => { this.el = el; }}
          className={`${selectorPrefix} ${dragItemSelectorPrefix} ${resizeItemSelectorPrefix} ${active ? 'active' : ''}`}
          style={{ zIndex: active ? getMaxLevelNumber() : number, width: `${width}px`, height: `${height}px` }}
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
            ref={(ins) => { this.ins = ins; }}
          />
        </div>
      );
    }
  }

  DragResizeHOC.defaultProps = {
    number: 1,
    pageId: '',
    componentId: '',
    property: {},
  };

  DragResizeHOC.propTypes = {
    // z-index的层级
    number: PropTypes.number,
    // 页面的id
    pageId: PropTypes.string,
    // 组件的id
    componentId: PropTypes.string,
    // 组件的属性数据
    property: PropTypes.object,
  };

  return DragResizeHOC;
};
