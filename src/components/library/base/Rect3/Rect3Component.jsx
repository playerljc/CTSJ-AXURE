import React from 'react';
import PropTypes from 'prop-types';
import ComponentBase from '../../ComponentBaseHOC';
import Drag from '../../DragHOC';
import './Rect3Component.less';

/**
 * Rect3Component
 * @class Rect3Component
 * @classdesc Rect3Component
 */
class Rect3Component extends React.Component {
  render() {
    return (
      <div>Rect3Component</div>
    );
  }
}

Rect3Component.defaultProps = {
  groupKey: '',
  componentKey: '',
};

Rect3Component.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
};

export default ComponentBase(Drag(Rect3Component, {
  groupKey: 'base',
  componentKey: 'Rect3',
}));
