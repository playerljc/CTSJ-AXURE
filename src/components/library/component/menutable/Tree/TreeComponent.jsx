import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './TreeComponent.less';

/**
 * TreeComponent
 * @class TreeComponent
 * @classdesc TreeComponent
 */
class TreeComponent extends React.PureComponent {
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
      >Tree
      </div>
    );
  }
}

TreeComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

TreeComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(TreeComponent, {
  groupKey: 'menutable',
  componentKey: 'Tree',
}));
