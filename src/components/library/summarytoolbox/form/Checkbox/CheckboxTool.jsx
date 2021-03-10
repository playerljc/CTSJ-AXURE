import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './CheckboxTool.less';

/**
 * Checkbox
 * @class CheckboxTool
 * @classdesc Checkbox
 */
class CheckboxTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-form-Checkbox FontAwesome`}>&#xe608;</div>
      </>
    );
  }
}

CheckboxTool.defaultProps = {
  selectorPrefix: '',
};

CheckboxTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(CheckboxTool, {
  groupKey: 'form',
  componentKey: 'Checkbox',
});
