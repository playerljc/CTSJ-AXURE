import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';

import './TableComponent.less';

/**
 * TableComponent
 * @class TableComponent
 * @classdesc TableComponent
 */
class TableComponent extends React.PureComponent {
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
      >Table
      </div>
    );
  }
}

TableComponent.defaultProps = {
  selectorPrefix: '',
  groupKey: '',
  componentKey: '',
};

TableComponent.propTypes = {
  groupKey: PropTypes.string,
  componentKey: PropTypes.string,
  selectorPrefix: PropTypes.string,
};

export default ComponentBaseHOC(DRSHOC(TableComponent, {
  groupKey: 'menutable',
  componentKey: 'Table',
}));
