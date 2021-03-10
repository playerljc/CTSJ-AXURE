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
      property: {
        prop: { text },
      },
      style: { alignStyle },
    } = this.props;

    return (
      <div className={`${selectorPrefix}-${groupKey}-${componentKey}`} style={alignStyle}>
        <span className={`${selectorPrefix}-${groupKey}-${componentKey}-inner`} />
        {text}
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
  style: PropTypes.object,
};

export default ComponentBaseHOC(
  DRSHOC(HlineComponent, {
    groupKey: 'base',
    componentKey: 'Hline',
  }),
);
