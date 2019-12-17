import React from 'react';
import PropTypes from 'prop-types';

import ComponentBaseHOC from '../../ComponentBaseHOC';
import DRSHOC from '../../DRSHOC';
import Table from '../../../../global/CT-UI-Table/Table';

import './TableComponent.less';
import {Immutable} from "../../../../../util/CTMobile-UI-Util";

/**
 * TableComponent
 * @class TableComponent
 * @classdesc TableComponent
 */
class TableComponent extends React.PureComponent {
  getColumns() {
    const {
      property: {
        prop: {
          table: {
            showNumber = true,
            columns,
          },
        },
      },
    } = this.props;

    if (showNumber) {
      const cloneColumns = Immutable.cloneDeep(columns);
      cloneColumns.unshift({
        key: '_number',
        title: 'number',
        dataIndex: '',
        width: '20px',
        align: 'center',
        render: (record, rowValue, rowIndex) => {
          return (rowIndex + 1);
        },
      });
      return cloneColumns;
    } else {
      return columns;
    }
  }

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
    };

    return (
      <div
        className={`${selectorPrefix}-${groupKey}-${componentKey}`}
        title={tooltip}
      >
        <Table
          {...props}
          columns={this.getColumns()}
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
