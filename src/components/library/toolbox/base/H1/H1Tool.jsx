import React from 'react';
import PropTypes from 'prop-types';

import ComponentToolBaseHOC from '../../ComponentToolBaseHOC';

import './H1Tool.less';

/**
 * H1Tool
 * @class H1Tool
 * @classdesc H1Tool
 */
class H1Tool extends React.PureComponent {
  render() {
    const { selectorPrefix } = this.props;
    return (
      <>
        <div className={`${selectorPrefix}-base-h1`}>H1</div>
      </>
    );
  }
}

H1Tool.defaultProps = {
  selectorPrefix: '',
};

H1Tool.propTypes = {
  selectorPrefix: PropTypes.string,
};

export default ComponentToolBaseHOC(H1Tool, {
  groupKey: 'base',
  componentKey: 'H1',
});
