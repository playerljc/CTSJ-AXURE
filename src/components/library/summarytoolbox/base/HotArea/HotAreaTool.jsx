import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './HotAreaTool.less';

/**
 * HotArea
 * @class HotAreaTool
 * @classdesc HotArea
 */
class HotAreaTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-base-hotarea`}>
          <div className={`${selectorPrefix}-base-hotarea-top`} />
          <div className={`${selectorPrefix}-base-hotarea-arrow FontAwesome`}>&#xe6a2;</div>
        </div>
      </React.Fragment>
    );
  }
}

HotAreaTool.defaultProps = {
  selectorPrefix: '',
};

HotAreaTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(HotAreaTool, {
  groupKey: 'base',
  componentKey: 'HotArea',
});
