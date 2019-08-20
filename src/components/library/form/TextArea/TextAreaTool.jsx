import React from 'react';
import PropTypes from 'prop-types';
import Droppable from '../../ComponentToolBaseHOC';
import './TextAreaTool.less';

/**
 * TextArea
 * @class TextAreaTool
 * @classdesc TextArea
 */
class TextAreaTool extends React.Component {
  render() {
    const { name = '' } = this.props;
    return (
      <div>{name}</div>
    );
  }
}

TextAreaTool.defaultProps = {
  name: '',
};

TextAreaTool.propTypes = {
  name: PropTypes.string,
};

export default Droppable(TextAreaTool, {
  groupKey: 'form',
  componentKey: 'TextArea',
});
