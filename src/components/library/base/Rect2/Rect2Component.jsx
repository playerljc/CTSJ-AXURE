import React from 'react';
import PropTypes from 'prop-types';
import ComponentBase from '../../ComponentBaseHOC';
import Drag from '../../DragHOC';
import './Rect2Component.less';

/**
 * Rect2Component
 * @class Rect2Component
 * @classdesc Rect2Component
 */
class Rect2Component extends React.Component {
  render() {
    return (
      <div>Rect2Component</div>
    );
  }
}

Rect2Component.defaultProps = {
  groupKey: '',
  componentKey: '',
};

Rect2Component.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
};

export default ComponentBase(Drag(Rect2Component, {
  groupKey: 'base',
  componentKey: 'Rect2',
}));
