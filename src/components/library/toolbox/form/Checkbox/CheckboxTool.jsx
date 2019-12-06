import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

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
      <React.Fragment>
        <div className={`${selectorPrefix}-form-Checkbox fa fa-custom-checkbox`} />
      </React.Fragment>
    );
  }
}

CheckboxTool.defaultProps = {
  selectorPrefix: '',
};

CheckboxTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(CheckboxTool, {
  groupKey: 'form',
  componentKey: 'Checkbox',
});
