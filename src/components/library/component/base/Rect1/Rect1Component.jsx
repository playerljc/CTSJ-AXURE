import React from 'react';
import PropTypes from 'prop-types';
import ComponentBaseHOC from '../../ComponentBaseHOC';
import DragResizeHOC from '../../DragResizeHOC';
import './Rect1Component.less';

/**
 * Rect1Component
 * @class Rect1Component
 * @classdesc Rect1Component
 */
class Rect1Component extends React.Component {
  render() {
    const { selectorPrefix, groupKey, componentKey } = this.props;
    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`} />
    );
  }
}

Rect1Component.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

Rect1Component.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DragResizeHOC(Rect1Component, {
  groupKey: 'base',
  componentKey: 'Rect1',
}));
