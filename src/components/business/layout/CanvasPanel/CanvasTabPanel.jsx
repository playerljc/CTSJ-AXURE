import React from 'react';
import PropTypes from 'prop-types';
import './CanvasTabPanel.less';

const selectorPrefix = 'CanvasTabPanel';

export { selectorPrefix };

const dragSelectorPrefix = 'ct-drag';
const resizeableSelectorPrefix = 'ct-resizeable';
const selectableSelectorPrefix = 'ct-selectable';
const droppableSelectorPrefix = 'ct-droppable';

const drsSelectorPrefix = [
  dragSelectorPrefix, resizeableSelectorPrefix, selectableSelectorPrefix,
];

/**
 * CanvasTabPanel
 */
class CanvasTabPanel extends React.Component {
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
    return drsSelectorPrefix.join(' ');
  }

  render() {
    const { activePageId, pageId } = this.props;
    return (
      <div
        className={`${selectorPrefix} ${activePageId === pageId ? `${droppableSelectorPrefix}-target` : ''}`}
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
