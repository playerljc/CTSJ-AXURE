import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './H1Component.less';

/**
 * H1Component
 * @class H1Component
 * @classdesc H1Component
 */
class H1Component extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
      property: {
        prop: {
          text,
        },
      },
      style: {
        alignStyle,
      },
    } = this.props;

    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey}`}
        style={alignStyle}
      >
        {text}
      </div>
    );
  }
}

H1Component.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

H1Component.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
  style: PropTypes.object,
};

export default ComponentBaseHOC(DRSHOC(H1Component, {
  groupKey: 'base',
  componentKey: 'H1',
}));
