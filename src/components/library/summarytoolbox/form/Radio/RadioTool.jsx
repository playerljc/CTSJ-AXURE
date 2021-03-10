import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

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
      <>
        <div className={`${selectorPrefix}-form-Radio FontAwesome`}>&#xe631;</div>
      </>
    );
  }
}

RadioTool.defaultProps = {
  selectorPrefix: '',
};

RadioTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(RadioTool, {
  groupKey: 'form',
  componentKey: 'Radio',
});
