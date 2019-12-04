import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './EllipseComponent.less';

/**
 * EllipseComponent
 * @class EllipseComponent
 * @classdesc EllipseComponent
 */
class EllipseComponent extends React.PureComponent {
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

EllipseComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

EllipseComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(EllipseComponent, {
  groupKey: 'base',
  componentKey: 'Ellipse',
}));
