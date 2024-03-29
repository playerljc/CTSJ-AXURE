import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './HMenuTool.less';

/**
 * HMenuTool
 * @class HMenuTool
 * @classdesc HMenuTool
 */
class HMenuTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-menutable-HMenu FontAwesome`}>&#xe69f;</div>
      </>
    );
  }
}

HMenuTool.defaultProps = {
  selectorPrefix: '',
};

HMenuTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(HMenuTool, {
  groupKey: 'menutable',
  componentKey: 'HMenu',
});
