import React from 'react';
import PropTypes from 'prop-types';
import ComponentBase from '../../ComponentBaseHOC';
import Drag from '../../DragResizeHOC';
import './Rect3Component.less';

/**
 * Rect3Component
 * @class Rect3Component
 * @classdesc Rect3Component
 */
class Rect3Component extends React.Component {
  render() {
    const { selectorPrefix, groupKey, componentKey } = this.props;
    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`} />
    );
  }
}

Rect3Component.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

Rect3Component.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBase(Drag(Rect3Component, {
  groupKey: 'base',
  componentKey: 'Rect3',
}));
