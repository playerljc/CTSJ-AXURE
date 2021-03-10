import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './LinkButtonTool.less';

/**
 * LinkButtonTool
 * @class LinkButtonTool
 * @classdesc LinkButtonTool
 */
class LinkButtonTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-base-LinkButton`}>BUTTON</div>
      </>
    );
  }
}

LinkButtonTool.defaultProps = {
  selectorPrefix: '',
};

LinkButtonTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(LinkButtonTool, {
  groupKey: 'base',
  componentKey: 'LinkButton',
});
