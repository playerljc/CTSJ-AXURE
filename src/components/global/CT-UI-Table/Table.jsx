import React from 'react';
import PropTypes from 'prop-types';
import { TableContext } from './Context';

import './Table.less';

const selectorPrefix = 'CT-UI-Table';

/**
 * Table
 * @class Table
 * @classdesc Table
 */
class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // 选中行的rowKey
      selectedRowKey: props.rowSelection && props.rowSelection.selectedRowKey ?
        props.rowSelection.selectedRowKey :
        '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rowSelection && nextProps.rowSelection.selectedRowKey) {
      this.setState({
        selectedRowKey: nextProps.rowSelection.selectedRowKey,
      });
    }
  }

  /**
   * rowData
   * @param {Object} - rowData
   */
  onRowClick(rowData) {
    const { rowSelection, rowKey } = this.props;
    const selectedRowKey = rowData[rowKey];
    this.setState({
      selectedRowKey: this.state.selectedRowKey === selectedRowKey ? '' : selectedRowKey,
    }, () => {
      if (this.state.selectedRowKey) {
        if (rowSelection && rowSelection.onChange) {
          rowSelection.onChange(rowData[rowKey]);
        }
      } else if (rowSelection && rowSelection.onUnChange) {
        rowSelection.onUnChange(rowData[rowKey]);
      }
    });
  }

  renderHeader() {
    /**
     * columns
     * ColumnItem {
     *   title: <ReactElement || String>
     *   key: <String>
     *   align: <String> [left | center | right]
     *   dataIndex: <String>
     *   width: <String>
     *   render: <Function(record)>
     * }
     * @type {Array<ColumnItem>}
     */
    const { columns = [] } = this.props;
    const rels = [];
    columns.forEach(({ title, key, align = 'center', width }) => {
      rels.push(
        <div
          key={key}
          className={`${selectorPrefix}-Header-Item ${!width || width === 'auto' ? 'auto' : ''} align-${align}`}
        >
          {title}
        </div>
      );
    });
    return rels;
  }

  /**
   * renderRow
   * @param {Object} - rowData
   * @param {Number} - index
   * @return {Array<ReactElement>}
   */
  renderRow({ rowData, index }) {
    const { columns = [], rowKey } = this.props;
    const { selectedRowKey } = this.state;
    return (
      <div
        key={rowData[rowKey]}
        className={`${selectorPrefix}-Body-Row ${selectedRowKey === rowData[rowKey] ? 'Selected' : ''}`}
        onClick={() => {
          this.onRowClick(rowData);
        }}
      >{
        columns.map(column => this.renderCell({ rowData, column, index }))
      }
      </div>
    );
  }

  /**
   * renderCell
   * @param {Object} - cellData
   * @param {Object} - column
   * @param {number} - index
   * @return {ReactElement}
   */
  renderCell({ rowData, column, index }) {
    const { key, render, align = 'center', width, dataIndex } = column;

    return (
      <div
        key={key}
        className={`${selectorPrefix}-Cell ${!width || width === 'auto' ? 'auto' : ''} align-${align}`}
      >
        {
          render ?
            render(rowData, rowData[dataIndex], index, dataIndex) :
            rowData[dataIndex]
        }
      </div>
    );
  }

  /**
   * renderBody
   * @return {Array<ReactElement>[]}
   */
  renderBody() {
    const { data = [] } = this.props;
    return data.map((rowData, index) => this.renderRow({ rowData, index }));
  }

  render() {
    const { columnLock = false, bodyHeight, isDisplayHead = true } = this.props;
    return (
      <TableContext.Provider value={this.props}>
        <div className={`${selectorPrefix} ${columnLock ? 'columnLock' : ''}`}>
          {isDisplayHead ? (<div className={`${selectorPrefix}-Header`}>{this.renderHeader()}</div>) : null}
          <div
            className={`${selectorPrefix}-Body`}
            style={{ height: (columnLock && bodyHeight) ? bodyHeight : 'auto' }}
          >
            {this.renderBody()}
          </div>
        </div>
      </TableContext.Provider>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  pagin: PropTypes.bool,
  rowKey: PropTypes.string,
  columnLock: PropTypes.bool,
  bodyHeight: PropTypes.string,
  rowSelection: PropTypes.object,
  isDisplayHead: PropTypes.bool,
  onEditorModify: PropTypes.func,
};

export default Table;
