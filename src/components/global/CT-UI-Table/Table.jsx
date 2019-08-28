import React from 'react';
import PropTypes from 'prop-types';

import './Table.less';

const selectorPrefix = 'CT-UI-Table';

/**
 * Table
 * @class Table
 * @classdesc Table
 */
class Table extends React.Component {
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
   * @return {Array<ReactElement>}
   */
  renderRow(rowData) {
    const { columns = [], rowKey } = this.props;
    return (
      <div
        key={rowData[rowKey]}
        className={`${selectorPrefix}-Body-Row`}
      >{
        columns.map((column, index) => this.renderCell({ rowData, column, index }))
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
    debugger
    return (
      <div
        key={key}
        className={`${selectorPrefix}-Cell ${!width || width === 'auto' ? 'auto' : ''} align-${align}`}
      >
        {
          render ?
          render(Object.assign({}, rowData), Object.assign({}, rowData[dataIndex])) :
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
    return data.map(rowData => this.renderRow(rowData));
  }

  render() {
    const { columnLock = false, bodyHeight } = this.props;
    return (
      <div className={`${selectorPrefix} ${columnLock ? 'columnLock' : ''}`}>
        <div className={`${selectorPrefix}-Header`}>{this.renderHeader()}</div>
        <div
          className={`${selectorPrefix}-Body`}
          style={{ height: (columnLock && bodyHeight) ? bodyHeight : 'auto' }}
        >
          {this.renderBody()}
        </div>
      </div>
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
};

export default Table;
