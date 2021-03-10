import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './SubmitTool.less';

/**
 * Submit
 * @class SubmitTool
 * @classdesc Submit
 */
class SubmitTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-form-Submit`}>Submit</div>
      </React.Fragment>
    );
  }
}

SubmitTool.defaultProps = {
  selectorPrefix: '',
};

SubmitTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(SubmitTool, {
  groupKey: 'form',
  componentKey: 'Submit',
});
