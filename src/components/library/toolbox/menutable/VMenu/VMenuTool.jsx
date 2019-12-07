import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

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
      <React.Fragment>
        <div className={`${selectorPrefix}-menutable-VMenu fa fa-custom-caidan`} />
      </React.Fragment>
    );
  }
}

VMenuTool.defaultProps = {
  selectorPrefix: '',
};

VMenuTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(VMenuTool, {
  groupKey: 'menutable',
  componentKey: 'VMenu',
});
