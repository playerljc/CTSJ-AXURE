import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

import './RadioTool.less';

/**
 * Radio
 * @class RadioTool
 * @classdesc Radio
 */
class RadioTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-form-Radio fa fa-custom-radio`} />
      </React.Fragment>
    );
  }
}

RadioTool.defaultProps = {
  selectorPrefix: '',
};

RadioTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(RadioTool, {
  groupKey: 'form',
  componentKey: 'Radio',
});
