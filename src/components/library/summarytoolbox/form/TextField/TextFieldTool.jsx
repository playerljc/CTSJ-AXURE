import React from 'react';
import PropTypes from 'prop-types';
import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';
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

export default SummaryToolBaseHOC(TextFieldTool, {
  groupKey: 'form',
  componentKey: 'TextField',
});
