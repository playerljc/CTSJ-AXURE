import React from 'react';
import PropTypes from 'prop-types';
import Droppable from '../../DroppableHOC';
import './Rect3Tool.less';

/**
 * Rect3
 * @class Rect3Tool
 * @classdesc Rect3
 */
class Rect3Tool extends React.Component {
  render() {
    const { name = '' } = this.props;
    return (
      <div>{name}</div>
    );
  }
}

Rect3Tool.defaultProps = {
  name: '',
};

Rect3Tool.propTypes = {
  name: PropTypes.string,
};

export default Droppable(Rect3Tool, {
  groupKey: 'base',
  componentKey: 'Rect3',
});
