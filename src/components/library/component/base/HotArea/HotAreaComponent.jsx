import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './HotAreaComponent.less';

/**
 * HotAreaComponent
 * @class HotAreaComponent
 * @classdesc HotAreaComponent
 */
class HotAreaComponent extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
    } = this.props;
    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey}`}
      />
    );
  }
}

HotAreaComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

HotAreaComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(HotAreaComponent, {
  groupKey: 'base',
  componentKey: 'HotArea',
}));
