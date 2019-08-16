import React from 'react';
import PropTypes from 'prop-types';
import Droppable from '../../Droppable';
import './Rect2Tool.less';

/**
 * Rect2
 * @class Rect2Tool
 * @classdesc Rect2
 */
class Rect2Tool extends React.Component {
  render() {
    const { name = '' } = this.props;
    return (
      <div>{name}</div>
    );
  }
}

Rect2Tool.defaultProps = {
  name: '',
};

Rect2Tool.propTypes = {
  name: PropTypes.string,
};

export default Droppable(Rect2Tool, {
  groupKey: 'base',
  componentKey: 'Rect2',
});
