import React from 'react';
import PropTypes from 'prop-types';
import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';
import './TextAreaTool.less';

/**
 * TextArea
 * @class TextAreaTool
 * @classdesc TextArea
 */
class TextAreaTool extends React.Component {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-form-textarea fa fa-textarea`} />
      </React.Fragment>
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
