import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';
import Table from '../../../../global/CT-UI-Table/Table';

import './TableComponent.less';

/**
 * TableComponent
 * @class TableComponent
 * @classdesc TableComponent
 */
class TableComponent extends React.PureComponent {
  render() {
    const {
      selectorPrefix,
      groupKey,
      componentKey,
      property: {
        prop: {
          tooltip = '',
          table: {
            data,
            columns,
            isDisplayHead,
            pagin,
            // columnLock,
            // bodyHeight,
          },
        },
      },
    } = this.props;

    const props = {
      rowKey: 'id',
      pagin,
      isDisplayHead,
      data,
      columns,
    };

    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey}`}
      >
        <Table
          {...props}
        />
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
