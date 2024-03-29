import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

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

export default ComponentToolBaseHOC(HMenuTool, {
  groupKey: 'menutable',
  componentKey: 'HMenu',
});
