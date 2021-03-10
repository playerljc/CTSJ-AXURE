import React from 'react';
import PropTypes from 'prop-types';
import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';
import './TextFieldTool.less';

/**
 * TextField
 * @class TextFieldTool
 * @classdesc TextField
 */
class TextFieldTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-form-textfield FontAwesome`}>&#xe619;</div>
      </>
    );
  }
}

TextFieldTool.defaultProps = {
  selectorPrefix: '',
};

TextFieldTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(TextFieldTool, {
  groupKey: 'form',
  componentKey: 'TextField',
});
