import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

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
        <div className={`${selectorPrefix}-form-submit`}>Submit</div>
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

export default ComponentToolBaseHOC(SubmitTool, {
  groupKey: 'form',
  componentKey: 'Submit',
});
