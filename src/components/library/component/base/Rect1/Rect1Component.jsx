import React from 'react';
import PropTypes from 'prop-types';
import ComponentBaseHOC, { getMaxLevelNumber } from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';
import './Rect1Component.less';

/**
 * Rect1Component
 * @class Rect1Component
 * @classdesc Rect1Component
 */
class Rect1Component extends React.PureComponent {
  /**
   * getStyle
   * @return {Object}
   */
  getStyle() {
    const {
      property: {
        style: {
          fill: {
            backgroundColor,
          },
        },
      },
    } = this.props;

    return {
      backgroundColor,
    };
  }

  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
    } = this.props;
    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey}`}
        style={this.getStyle()}
      />
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
};

export default ComponentBaseHOC(DRSHOC(Rect1Component, {
  groupKey: 'base',
  componentKey: 'Rect1',
}));
