import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './HlineTool.less';

/**
 * HlineTool
 * @class HlineTool
 * @classdesc HlineTool
 */
class HlineTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-base-Hline`}>
          <span className={`${selectorPrefix}-base-Hline-inner`} />
        </div>
      </>
    );
  }
}

HlineTool.defaultProps = {
  selectorPrefix: '',
};

HlineTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(HlineTool, {
  groupKey: 'base',
  componentKey: 'Hline',
});
