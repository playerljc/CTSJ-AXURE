import React from 'react';
import PropTypes from 'prop-types';
import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';
import './TextAreaTool.less';

/**
 * TextArea
 * @class TextAreaTool
 * @classdesc TextArea
 */
class TextAreaTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-form-textarea FontAwesome`}>&#xe62f;</div>
      </>
    );
  }
}

TextAreaTool.defaultProps = {
  selectorPrefix: '',
};

TextAreaTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(TextAreaTool, {
  groupKey: 'form',
  componentKey: 'TextArea',
});
