import React from 'react';
import PropTypes from 'prop-types';

import { TableContext } from './Context';
import { Immutable } from '../../../util/CTMobile-UI-Util';
import TablePagin from './TablePagin';

import './Table.less';


const selectorPrefix = 'CT-UI-Table';

/**
 * Table
 * @class Table
 * @classdesc Table
 */
class Table extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // 选中行的rowKey
      selectedRowKey: props.rowSelection && props.rowSelection.selectedRowKey ?
        props.rowSelection.selectedRowKey :
        '',
      // 选中列的columnKey
      selectedColumnKey: props.columnSelection && props.columnSelection.selectedColumnKey ?
        props.columnSelection.selectedColumnKey :
        '',

      // 分页数据
      pagin: {
        page: 1,
        pageSize: 10,
      },
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.rowSelection && props.rowSelection.selectedRowKey) {
  //     return {
  //       selectedRowKey: props.rowSelection.selectedRowKey,
  //     };
  //   } else {
  //     return null;
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.rowSelection &&
      nextProps.rowSelection.selectedRowKey &&
      nextProps.columnSelection &&
      nextProps.columnSelection.selectedColumnKey
    ) {
      this.setState({
        selectedRowKey: nextProps.rowSelection.selectedRowKey,
        selectedColumnKey: nextProps.columnSelection.selectedColumnKey,
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

  /**
   * onCellClick
   * @param {Object} - cellData
   */
  onCellClick(cellData) {
    const { cellSelection } = this.props;
    if (cellSelection && cellSelection.onChange) {
      cellSelection.onChange(cellData);
    }
  }

  /**
   * onColumnClick
   * @param {String} - key
   */
  onColumnClick(key) {
    const {
      columns = [],
      columnSelection,
    } = this.props;

    this.setState({
      selectedColumnKey: key,
    });

    if (columnSelection && columnSelection.onChange) {
      columnSelection.onChange(Immutable.cloneDeep(columns.find(t => t.key === key)));
    }
  }

  /**
   * renderHeader
   * @return {ReactElement}
   */
  renderHeader() {
    const { isDisplayHead = true } = this.props;
    return (
      isDisplayHead ?
        (<div className={`${selectorPrefix}-Header`}>{this.renderHeaderInner()}</div>)
        : null
    );
  }

  /**
   * renderBody
   * @return {ReactElement}
   */
  renderBody() {
    const { columnLock = false, bodyHeight } = this.props;
    return (
      <div
        className={`${selectorPrefix}-Body`}
        style={{ height: (columnLock && bodyHeight) ? bodyHeight : 'auto' }}
      >
        {this.renderBodyInner()}
      </div>
    );
  }

  /**
   * renderPagin
   * @return {ReactElement}
   */
  renderPagin() {
    const { pagin, data } = this.props;
    const {
      pagin: {
        page,
        pageSize,
      },
    } = this.state;

    return pagin ? (
      <TablePagin
        total={data.length}
        page={page}
        pageSize={pageSize}
        onPre={() => {
          const clonePagin = Immutable.cloneDeep(this.state.pagin);
          clonePagin.pagin.page--;
          this.setState({
            pagin: clonePagin,
          });
        }}
        onNext={() => {
          const clonePagin = Immutable.cloneDeep(this.state.pagin);
          clonePagin.pagin.page++;
          this.setState({
            pagin: clonePagin,
          });
        }}
        onQuickJumperKeyDown={(targetPage) => {
          const clonePagin = Immutable.cloneDeep(this.state.pagin);
          clonePagin.pagin.page = targetPage;
          this.setState({
            pagin: clonePagin,
          });
        }}
        onSizeChanger={(e) => {
          const v = window.parseInt(e.target.value);
          const clonePagin = Immutable.cloneDeep(this.state.pagin);
          clonePagin.pageSize = v;
          const pageCount = window.parseInt(data.length / v) + data.length % v;
          if (clonePagin.page > pageCount) {
            clonePagin.page = pageCount;
          }
          this.setState({
            pagin: clonePagin,
          });
        }}
      />
    ) : null;
  }

  /**
   * renderHeaderInner
   * @return {Array}
   */
  renderHeaderInner() {
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
    const { columns = []} = this.props;
    const { selectedColumnKey = '' } = this.state;

    const rels = [];
    columns.forEach(({ title, key, align = 'center', width }) => {
      const props = {
        key,
        className: `${selectorPrefix}-Header-Item ${!width || width === 'auto' ? 'auto' : ''} align-${align} ${selectedColumnKey === key ? 'active' : ''}`,
        onClickCapture: () => {
          this.onColumnClick(key);
        },
      };

      if (width && width !== 'auto' && !width.endsWith('%')) {
        props.style = {
          width: `${width}px`,
        };
      }

      rels.push(
        <div {...props}>
          {title}
        </div>
      );
    });
    return rels;
  }

  /**
   * renderRow
   * @param {Object} - rowData
   * @param {SelectOptions} - index
   * @return {Array<ReactElement>}
   */
  renderRow({ rowData, index }) {
    const { columns = [], rowKey } = this.props;
    const { selectedRowKey } = this.state;
    return (
      <div
        key={rowData[rowKey]}
        className={`${selectorPrefix}-Body-Row ${selectedRowKey === rowData[rowKey] ? 'Selected' : ''}`}
        onClickCapture={() => {
          console.log('rowClick');
          this.onRowClick(Immutable.cloneDeep(rowData));
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

    const props = {
      key,
      className: `${selectorPrefix}-Cell ${!width || width === 'auto' ? 'auto' : ''} align-${align}`,
      onClick: () => {
        this.onCellClick(Immutable.cloneDeep(rowData[dataIndex] ? rowData[dataIndex] : {}));
      },
    };

    if (width && width !== 'auto' && !width.endsWith('%')) {
      props.style = {
        width: `${width}px`,
      };
    }

    return (
      <div {...props}>
        {
          render ?
            render(rowData, rowData[dataIndex], index, dataIndex) :
            rowData[dataIndex]
        }
      </div>
    );
  }

  /**
   * renderBodyInner
   * @return {Array<ReactElement>[]}
   */
  renderBodyInner() {
    const { data = [], pagin = false } = this.props;
    const {
      pagin: {
        page,
        pageSize,
      },
    } = this.state;

    let target = data;
    if (pagin) {
      const startIndex = (page - 1) * pageSize;
      target = data.slice(startIndex, startIndex + pageSize);
    }

    return target.map((rowData, index) => this.renderRow({ rowData, index }));
  }

  render() {
    const { columnLock = false } = this.props;
    return (
      <TableContext.Provider
        value={{
          props: this.props,
          state: this.state,
        }}
      >
        <div className={`${selectorPrefix}`}>
          <div className={`${selectorPrefix}-Inner ${columnLock ? 'columnLock' : ''}`}>
            {this.renderHeader()}
            {this.renderBody()}
          </div>
          {this.renderPagin()}
        </div>
      </TableContext.Provider>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
      key: PropTypes.string,
      render: PropTypes.func,
      align: PropTypes.oneOf([
        'center',
        'left',
        'right',
      ]),
      width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      dataIndex: PropTypes.string,
    })
  ),
  data: PropTypes.array,
  pagin: PropTypes.bool,
  rowKey: PropTypes.string,
  columnLock: PropTypes.bool,
  bodyHeight: PropTypes.string,
  rowSelection: PropTypes.shape({
    selectedRowKey: PropTypes.string,
    onChange: PropTypes.func,
    onUnChange: PropTypes.func,
  }),
  cellSelection: PropTypes.shape({
    onChange: PropTypes.func,
  }),
  columnSelection: PropTypes.shape({
    selectedColumnKey: PropTypes.string,
    onChange: PropTypes.func,
  }),
  isDisplayHead: PropTypes.bool,
  onEditorModify: PropTypes.func,
};

export default Table;
