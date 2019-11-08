import React from 'react';
import PropTypes from 'prop-types';
import './CanvasTabPanelProperty.less';

const selectorPrefix = 'CanvasTabPanelProperty';

/**
 * CanvasTabPanelProperty
 */
class CanvasTabPanelProperty extends React.PureComponent {
  render() {
    return (
      <div className={`${selectorPrefix}`} >{this.props.page.getPageId()}</div>
    );
  }
}

CanvasTabPanelProperty.defaultProps = {
  page: null,
};

CanvasTabPanelProperty.propTypes = {
  page: PropTypes.object,
};

export default CanvasTabPanelProperty;
