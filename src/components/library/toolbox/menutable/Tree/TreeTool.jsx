import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

import './TreeTool.less';

/**
 * TreeTool
 * @class TreeTool
 * @classdesc TreeTool
 */
class TreeTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-menutable-Tree FontAwesome`}>&#xe61b;</div>
      </React.Fragment>
    );
  }
}

TreeTool.defaultProps = {
  selectorPrefix: '',
};

TreeTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(TreeTool, {
  groupKey: 'menutable',
  componentKey: 'Tree',
});
