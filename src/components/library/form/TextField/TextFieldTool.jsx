import React from 'react';
import PropTypes from 'prop-types';
import Droppable from '../../DroppableHOC';
import './TextFieldTool.less';

/**
 * TextField
 * @class TextFieldTool
 * @classdesc TextField
 */
class TextFieldTool extends React.Component {
  render() {
    const { name = '' } = this.props;
    return (
      <div>{name}</div>
    );
  }
}

TextFieldTool.defaultProps = {
  name: '',
};

TextFieldTool.propTypes = {
  name: PropTypes.string,
};

export default Droppable(TextFieldTool, {
  groupKey: 'form',
  componentKey: 'TextField',
});
