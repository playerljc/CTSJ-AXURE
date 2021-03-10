import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './TableTool.less';

/**
 * TableTool
 * @class TableTool
 * @classdesc TableTool
 */
class TableTool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-menutable-Table FontAwesome`}>&#xe895;</div>
      </>
    );
  }
}

TableTool.defaultProps = {
  selectorPrefix: '',
};

TableTool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(TableTool, {
  groupKey: 'menutable',
  componentKey: 'Table',
});
