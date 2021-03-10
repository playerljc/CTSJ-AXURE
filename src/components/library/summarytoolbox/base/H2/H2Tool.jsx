import React from 'react';
import PropTypes from 'prop-types';

import SummaryToolBaseHOC from '../../SummaryToolBaseHOC';

import './H2Tool.less';

/**
 * H2Tool
 * @class H2Tool
 * @classdesc H2Tool
 */
class H2Tool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <React.Fragment>
        <div className={`${selectorPrefix}-base-H2`}>H2</div>
      </React.Fragment>
    );
  }
}

H2Tool.defaultProps = {
  selectorPrefix: '',
};

H2Tool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default SummaryToolBaseHOC(H2Tool, {
  groupKey: 'base',
  componentKey: 'H2',
});
