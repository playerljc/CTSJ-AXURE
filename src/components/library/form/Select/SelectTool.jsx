import React from 'react';
import PropTypes from 'prop-types';
import Droppable from '../../ComponentToolBaseHOC';
import './SelectTool.less';

/**
 * Select
 * @class SelectTool
 * @classdesc Select
 */
class SelectTool extends React.Component {
  render() {
    const { name = '' } = this.props;
    return (
      <div>{name}</div>
    );
  }
}

SelectTool.defaultProps = {
  name: '',
};

SelectTool.propTypes = {
  name: PropTypes.string,
};

export default Droppable(SelectTool, {
  groupKey: 'form',
  componentKey: 'Select',
});
