import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './VMenuComponent.less';

/**
 * VMenuComponent
 * @class VMenuComponent
 * @classdesc VMenuComponent
 */
class VMenuComponent extends React.PureComponent {
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
    const { selectorPrefix, groupKey, componentKey } = this.props;
    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey}`}
        style={this.getStyle()}
      >VMenu
      </div>
    );
  }
}

VMenuComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

VMenuComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(VMenuComponent, {
  groupKey: 'menutable',
  componentKey: 'VMenu',
}));
