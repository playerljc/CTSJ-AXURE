import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './Rect1Component.less';

/**
 * Rect1Component
 * @class Rect1Component
 * @classdesc Rect1Component
 */
class Rect1Component extends React.PureComponent {
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
        {text}
      </div>
    );
  }
}

Rect1Component.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

Rect1Component.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
  style: PropTypes.object,
};

export default ComponentBaseHOC(
  DRSHOC(Rect1Component, {
    groupKey: 'base',
    componentKey: 'Rect1',
  }),
);
