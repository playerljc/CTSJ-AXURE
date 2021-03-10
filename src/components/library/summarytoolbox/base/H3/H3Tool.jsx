import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './H3Tool.less';

/**
 * H3Tool
 * @class H3Tool
 * @classdesc H3Tool
 */
class H3Tool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-base-H3`}>H3</div>
      </React.Fragment>
    );
  }
}

H3Tool.defaultProps = {
  selectorPrefix: '',
};

H3Tool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(H3Tool, {
  groupKey: 'base',
  componentKey: 'H3',
});
