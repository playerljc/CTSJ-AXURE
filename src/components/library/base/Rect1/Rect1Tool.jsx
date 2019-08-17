import React from 'react';
import PropTypes from 'prop-types';
import Droppable from '../../DroppableHOC';
import './Rect1Tool.less';

/**
 * Rect1
 * @class Rect1Tool
 * @classdesc Rect1
 */
class Rect1Tool extends React.Component {
  render() {
    const { name = '' } = this.props;
    return (
      <div style={{ border: '1px solid' }}>{name}</div>
    );
  }
}

Rect1Tool.defaultProps = {
  name: '',
};

Rect1Tool.propTypes = {
  name: PropTypes.string,
};

export default Droppable(Rect1Tool, {
  groupKey: 'base',
  componentKey: 'Rect1',
});
