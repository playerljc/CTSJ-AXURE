import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './H3Component.less';

/**
 * H3Component
 * @class H3Component
 * @classdesc H3Component
 */
class H3Component extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
    } = this.props;
    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey}`}
      >Tertiary title
      </div>
    );
  }
}

H3Component.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

H3Component.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(H3Component, {
  groupKey: 'base',
  componentKey: 'H3',
}));
