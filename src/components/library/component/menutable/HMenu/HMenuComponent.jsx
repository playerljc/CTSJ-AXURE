import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './HMenuComponent.less';

/**
 * HMenuComponent
 * @class HMenuComponent
 * @classdesc HMenuComponent
 */
class HMenuComponent extends React.PureComponent {
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
      >HMenu
      </div>
    );
  }
}

HMenuComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

HMenuComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(HMenuComponent, {
  groupKey: 'menutable',
  componentKey: 'HMenu',
}));
