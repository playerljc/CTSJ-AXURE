import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

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
        <div className={`${selectorPrefix}-base-h2`}>H2</div>
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

export default ComponentToolBaseHOC(H2Tool, {
  groupKey: 'base',
  componentKey: 'H2',
});
