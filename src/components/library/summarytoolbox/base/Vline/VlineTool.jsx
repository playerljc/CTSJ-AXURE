import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './VlineTool.less';

/**
 * VlineTool
 * @class VlineTool
 * @classdesc VlineTool
 */
class VlineTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-base-Vline`} >
          <span className={`${selectorPrefix}-base-Vline-inner`} />
        </div>
      </React.Fragment>
    );
  }
}

VlineTool.defaultProps = {
  selectorPrefix: '',
};

VlineTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(VlineTool, {
  groupKey: 'base',
  componentKey: 'Vline',
});
