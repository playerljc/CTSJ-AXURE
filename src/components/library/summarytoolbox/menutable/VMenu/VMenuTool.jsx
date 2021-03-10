import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './VMenuTool.less';

/**
 * VMenuTool
 * @class VMenuTool
 * @classdesc VMenuTool
 */
class VMenuTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-menutable-VMenu FontAwesome`}>&#xe62a;</div>
      </>
    );
  }
}

VMenuTool.defaultProps = {
  selectorPrefix: '',
};

VMenuTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(VMenuTool, {
  groupKey: 'menutable',
  componentKey: 'VMenu',
});
