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
    const { activePageId, pageId } = this.props;
    return (
      <div
        className={`${selectorPrefix} ${activePageId === pageId ? 'ct-droppable-target' : ''}`}
        data-pageid={pageId}
      >
        <div
          className={`${selectorPrefix}-Scroll ${activePageId === pageId ? 'ct-drag ct-resizeable' : ''}`}
          data-pageid={pageId}
          id={pageId}
        >
          <input type="text" />
        </div>
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
  pageId: PropTypes.string,
  property: PropTypes.object,
  getInstance: PropTypes.func,
};

export default CanvasTabPanel;
