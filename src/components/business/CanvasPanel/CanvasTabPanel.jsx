import React from 'react';
import PropTypes from 'prop-types';
import './CanvasTabPanel.less';

const selectorPrefix = 'CanvasTabPanel';

export { selectorPrefix };

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

  render() {
    const { activeKey, pageId } = this.props;
    return (
      <div
        className={`${selectorPrefix} ${activeKey === pageId ? 'ct-droppable-target' : ''}`}
        data-pageid={pageId}
      >
        <div
          className={`${selectorPrefix}-Scroll ${activeKey === pageId ? 'ct-drag ct-resizeable' : ''}`}
          data-pageid={pageId}
          id={pageId}
        />
      </div>
    );
  }
}

CanvasTabPanel.defaultProps = {
  activeKey: '',
  pageId: '',
};

CanvasTabPanel.propTypes = {
  activeKey: PropTypes.string,
  pageId: PropTypes.string,
  getInstance: PropTypes.func,
};

export default CanvasTabPanel;
