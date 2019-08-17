import React from 'react';
import PropTypes from 'prop-types';
import ComponentBase from '../../ComponentBaseHOC';
import Drag from '../../DragHOC';
import './Rect1Component.less';

/**
 * Rect1Component
 * @class Rect1Component
 * @classdesc Rect1Component
 */
class Rect1Component extends React.Component {
  render() {
    return (
      <div>Rect1Component</div>
    );
  }
}

Rect1Component.defaultProps = {
  groupKey: '',
  componentKey: '',
};

Rect1Component.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
};

export default ComponentBase(Drag(Rect1Component, {
  groupKey: 'base',
  componentKey: 'Rect1',
}));
