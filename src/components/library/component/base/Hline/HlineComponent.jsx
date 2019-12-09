import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './HlineComponent.less';

/**
 * HlineComponent
 * @class HlineComponent
 * @classdesc HlineComponent
 */
class HlineComponent extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
    } = this.props;
    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey}`}
      >
        <span className={`${selectorPrefix}-${groupKey}-${componentKey}-inner`} />
      </div>
    );
  }
}

HlineComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

HlineComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(HlineComponent, {
  groupKey: 'base',
  componentKey: 'Hline',
}));
