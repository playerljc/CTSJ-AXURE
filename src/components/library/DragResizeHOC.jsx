import React from 'react';
import { getMaxLevelNumber } from './ComponentBaseHOC';
import './DragResizeHOC.less';

const selectorPrefix = 'ct-axure-shape';

/**
 * DragResizeHOC
 * @param {React.Component} Component
 * @param {String} - groupKey
 * @param {String} - componentKey
 * @return {React.Component}
 */
export default (Component, { groupKey, componentKey }) => {
  return class extends React.Component {
    /**
     * constructor
     * @param {Object} - props
     */
    constructor(props) {
      super(props);
      this.state = {
        active: false,
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

    render() {
      const { number = 1, pageId, componentId } = this.props;
      const { active = false } = this.state;
      return (
        <div
          ref={(el) => { this.el = el; }}
          className={`${selectorPrefix} ct-drag-item ct-resizeable-item ${active ? 'active' : ''}`}
          style={{ zIndex: active ? getMaxLevelNumber() : number }}
          data-groupkey={groupKey}
          data-componentkey={componentKey}
          data-pageid={pageId}
          data-componentid={componentId}
        >
          <Component {...this.props} ref={(ins) => { this.ins = ins; }} />
        </div>
      );
    }
  };
};
