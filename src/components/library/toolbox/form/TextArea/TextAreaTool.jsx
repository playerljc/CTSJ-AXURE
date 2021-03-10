import React from 'react';
import PropTypes from 'prop-types';
import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';
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

export default ComponentToolBaseHOC(TextAreaTool, {
  groupKey: 'form',
  componentKey: 'TextArea',
});
