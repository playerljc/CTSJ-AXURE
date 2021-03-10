import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';

import { Immutable } from '../../../util/CTMobile-UI-Util';
import TableTextFieldEditor from '../CT-UI-Table/TableTextFieldEditor';
import Table from '../CT-UI-Table/Table';
import Input from '../CT-UI-Form/input';
import Modal from '../CT-UI-Modal/modal';

import './TableSetting.less';

const selectorPrefix = 'CT-UI-TableSettingPicker';

/**
 * TableSetting
 * @class TableSetting
 * @classdesc 表格的设置
 */
class TableSetting extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...props.value,
      selectedRowKey: '',
      selectedColumnKey: '',
      columns: this.cloneColumns(props.value.columns),
    };

    this.initColumnToolConfig();
    this.initRowToolConfig();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.value,
      selectedRowKey: '',
      selectedColumnKey: '',
      columns: this.cloneColumns(nextProps.value.columns),
    });
  }

  /**
   * initColumnToolConfig
   */
  initColumnToolConfig() {
    this.columnToolConfig = [
      // 添加列
      {
        key: 'addColumn',
        className: () => 'fa fa-plus',
        title: 'add column',
        onClick: () => {
          const { columns = [] } = this.state;
          this.addColumn({
            name: 'NewColumn',
            index: columns.length,
          });
        },
      },
      // 左侧加列
      {
        key: 'addLeftColumn',
        className: () =>
          `fa fa-outdent ${
            this.columnToolConfig.find((t) => t.key === 'addLeftColumn').disable() ? 'disable' : ''
          }`,
        title: 'add left column',
        onClick: () => {
          const disabled = this.columnToolConfig.find((t) => t.key === 'addLeftColumn').disable();
          if (disabled) return false;

          const { selectedColumnKey = '', columns = [] } = this.state;
          const index = columns.findIndex((t) => t.key === selectedColumnKey);
          this.addColumn({
            name: 'NewColumn',
            index,
          });
        },
        disable: () => {
          const { selectedColumnKey = '' } = this.state;
          return !selectedColumnKey;
        },
      },
      // 右侧加列
      {
        key: 'addRightColumn',
        className: () =>
          `fa fa-indent ${
            this.columnToolConfig.find((t) => t.key === 'addRightColumn').disable() ? 'disable' : ''
          }`,
        title: 'add right column',
        onClick: () => {
          const disabled = this.columnToolConfig.find((t) => t.key === 'addRightColumn').disable();
          if (disabled) return false;

          const { selectedColumnKey = '', columns = [] } = this.state;
          const index = columns.findIndex((t) => t.key === selectedColumnKey);
          this.addColumn({
            name: 'NewColumn',
            index: index + 1,
          });
        },
        disable: () => {
          const { selectedColumnKey = '' } = this.state;
          return !selectedColumnKey;
        },
      },
      // 删除列
      {
        key: 'removeColumn',
        className: () =>
          `fa fa-window-close ${
            this.columnToolConfig.find((t) => t.key === 'removeColumn').disable() ? 'disable' : ''
          }`,
        title: 'remove column',
        onClick: () => {
          const disabled = this.columnToolConfig.find((t) => t.key === 'removeColumn').disable();
          if (disabled) return false;

          const { selectedColumnKey = '', columns = [], data = [] } = this.state;
          const index = columns.findIndex((t) => t.key === selectedColumnKey);
          const columnsClone = this.cloneColumns();
          let dataClone = Immutable.cloneDeep(data);
          columnsClone.splice(index, 1);

          dataClone = dataClone.map((t) => {
            delete t[selectedColumnKey];
            return t;
          });

          this.setState({
            columns: columnsClone,
            data: dataClone,
            selectedColumnKey: '',
          });
        },
        disable: () => {
          const { selectedColumnKey = '' } = this.state;
          return !selectedColumnKey;
        },
      },
      // 列左移动
      {
        key: 'moveLeftColumn',
        className: () =>
          `fa fa-arrow-left ${
            this.columnToolConfig.find((t) => t.key === 'moveLeftColumn').disable() ? 'disable' : ''
          }`,
        title: 'move left column',
        onClick: () => {
          const disabled = this.columnToolConfig.find((t) => t.key === 'moveLeftColumn').disable();
          if (disabled) return false;

          const { selectedColumnKey = '', columns = [] } = this.state;
          const index = columns.findIndex((t) => t.key === selectedColumnKey);
          const columnsClone = this.cloneColumns();

          const t = columnsClone[index - 1];
          columnsClone[index - 1] = columnsClone[index];
          columnsClone[index] = t;
          this.setState({
            columns: columnsClone,
          });
        },
        disable: () => {
          const { selectedColumnKey = '', columns = [] } = this.state;
          if (!selectedColumnKey) return true;
          else {
            const index = columns.findIndex((t) => t.key === selectedColumnKey);
            if (index === 0) return true;
            else return false;
          }
        },
      },
      // 列右移动
      {
        key: 'moveRightColumn',
        className: () =>
          `fa fa-arrow-right ${
            this.columnToolConfig.find((t) => t.key === 'moveRightColumn').disable()
              ? 'disable'
              : ''
          }`,
        title: 'move right column',
        onClick: () => {
          const disabled = this.columnToolConfig.find((t) => t.key === 'moveRightColumn').disable();
          if (disabled) return false;

          const { selectedColumnKey = '', columns = [] } = this.state;
          const index = columns.findIndex((t) => t.key === selectedColumnKey);
          const columnsClone = this.cloneColumns();

          const t = columnsClone[index + 1];
          columnsClone[index + 1] = columnsClone[index];
          columnsClone[index] = t;
          this.setState({
            columns: columnsClone,
          });
        },
        disable: () => {
          const { selectedColumnKey = '', columns = [] } = this.state;
          if (!selectedColumnKey) return true;
          else {
            const index = columns.findIndex((t) => t.key === selectedColumnKey);
            if (index === columns.length - 1) return true;
            else return false;
          }
        },
      },
      // 列的对其方式
      {
        key: 'columnAlign',
        className: () =>
          `fa fa-align-justify ${
            this.columnToolConfig.find((t) => t.key === 'columnAlign').disable() ? 'disable' : ''
          }`,
        title: 'column align',
        onClick: () => {
          const disabled = this.columnToolConfig.find((t) => t.key === 'columnAlign').disable();
          if (disabled) return false;

          const { zIndex } = this.props;

          const { selectedColumnKey = '', columns = [] } = this.state;
          const index = columns.findIndex((t) => t.key === selectedColumnKey);
          const columnsClone = this.cloneColumns();

          Modal.promptSelect({
            content: 'column align',
            defaultValue: columnsClone[index].align,
            required: false,
            data: [
              { label: 'left', value: 'left' },
              { label: 'center', value: 'center' },
              { label: 'right', value: 'right' },
            ],
            zIndex: zIndex + 10,
            success: (columnAlign) => {
              return new Promise((resolve) => {
                columnsClone[index].align = columnAlign;
                this.setState(
                  {
                    columns: columnsClone,
                  },
                  () => {
                    resolve();
                  },
                );
              });
            },
          });
        },
        disable: () => {
          const { selectedColumnKey = '' } = this.state;
          return !selectedColumnKey;
        },
      },
      // 列的宽度
      {
        key: 'columnWidth',
        className: () =>
          `fa fa-th ${
            this.columnToolConfig.find((t) => t.key === 'columnWidth').disable() ? 'disable' : ''
          }`,
        title: 'column width',
        onClick: () => {
          const disabled = this.columnToolConfig.find((t) => t.key === 'columnWidth').disable();
          if (disabled) return false;

          const { zIndex } = this.props;

          const { selectedColumnKey = '', columns = [] } = this.state;
          const index = columns.findIndex((t) => t.key === selectedColumnKey);
          const columnsClone = this.cloneColumns();

          Modal.prompt({
            content: 'column width',
            defaultValue: columnsClone[index].width,
            zIndex: zIndex + 10,
            required: false,
            success: (columnWidth) => {
              return new Promise((resolve) => {
                columnsClone[index].width = columnWidth;
                this.setState(
                  {
                    columns: columnsClone,
                  },
                  () => {
                    resolve();
                  },
                );
              });
            },
          });
        },
        disable: () => {
          const { selectedColumnKey = '' } = this.state;
          return !selectedColumnKey;
        },
      },
    ];
  }

  /**
   * initRowToolConfig
   */
  initRowToolConfig() {
    this.rowToolConfig = [
      // 加行
      {
        key: 'addRow',
        className: () =>
          `fa fa-plus ${
            this.rowToolConfig.find((t) => t.key === 'addRow').disable() ? 'disable' : ''
          }`,
        title: 'add row',
        onClick: () => {
          const disabled = this.rowToolConfig.find((t) => t.key === 'addRow').disable();
          if (disabled) return false;

          const { data = [] } = this.state;
          this.addRow(data.length);
        },
        disable: () => {
          const { columns = [] } = this.state;
          return columns.length === 0;
        },
      },
      // 加行(加多行)
      {
        key: 'addMulitRow',
        className: () =>
          `fa fa-server ${
            this.rowToolConfig.find((t) => t.key === 'addMulitRow').disable() ? 'disable' : ''
          }`,
        title: 'add mulit row',
        onClick: () => {
          const disabled = this.rowToolConfig.find((t) => t.key === 'addMulitRow').disable();
          if (disabled) return false;

          const { zIndex } = this.props;

          Modal.prompt({
            content: 'add mulit row',
            type: 'number',
            defaultValue: 1,
            zIndex: zIndex + 10,
            success: (rowCount) => {
              return new Promise((resolve) => {
                rowCount = window.parseInt(rowCount);
                if (!Number.isNaN(rowCount) && rowCount > 0) {
                  this.appendMulitRow(rowCount).then(() => {
                    resolve();
                  });
                }
              });
            },
          });
        },
        disable: () => {
          const { columns = [] } = this.state;
          return columns.length === 0;
        },
      },
      // 上方加行
      {
        key: 'addLineAbove',
        className: () =>
          `fa fa-server ${
            this.rowToolConfig.find((t) => t.key === 'addLineAbove').disable() ? 'disable' : ''
          }`,
        title: 'add line above',
        onClick: () => {
          const disabled = this.rowToolConfig.find((t) => t.key === 'addLineAbove').disable();
          if (disabled) return false;

          const { selectedRowKey = '', data = [] } = this.state;
          const index = data.findIndex((t) => t.id === selectedRowKey);
          this.addRow(index);
        },
        disable: () => {
          const { selectedRowKey = '' } = this.state;
          return !selectedRowKey;
        },
      },
      // 下方加行
      {
        key: 'addLineBelow',
        className: () =>
          `fa fa-tasks ${
            this.rowToolConfig.find((t) => t.key === 'addLineBelow').disable() ? 'disable' : ''
          }`,
        title: 'add line below',
        onClick: () => {
          const disabled = this.rowToolConfig.find((t) => t.key === 'addLineBelow').disable();
          if (disabled) return false;

          const { selectedRowKey = '', data = [] } = this.state;
          const index = data.findIndex((t) => t.id === selectedRowKey);
          this.addRow(index + 1);
        },
        disable: () => {
          const { selectedRowKey = '' } = this.state;
          return !selectedRowKey;
        },
      },
      // 删除行
      {
        key: 'removeRow',
        className: () =>
          `fa fa-window-close ${
            this.rowToolConfig.find((t) => t.key === 'removeRow').disable() ? 'disable' : ''
          }`,
        title: 'remove row',
        onClick: () => {
          const disabled = this.rowToolConfig.find((t) => t.key === 'removeRow').disable();
          if (disabled) return false;

          const { selectedRowKey = '', data = [] } = this.state;
          const index = data.findIndex((t) => t.id === selectedRowKey);
          const dataClone = Immutable.cloneDeep(data);
          dataClone.splice(index, 1);

          this.setState({
            data: dataClone,
            selectedRowKey: '',
          });
        },
        disable: () => {
          const { selectedRowKey = '' } = this.state;
          return !selectedRowKey;
        },
      },
      // 上移行
      {
        key: 'moveRowUp',
        className: () =>
          `fa fa-arrow-up ${
            this.rowToolConfig.find((t) => t.key === 'moveRowUp').disable() ? 'disable' : ''
          }`,
        title: 'move row up',
        onClick: () => {
          const disabled = this.rowToolConfig.find((t) => t.key === 'moveRowUp').disable();
          if (disabled) return false;

          const { selectedRowKey = '', data = [] } = this.state;
          const index = data.findIndex((t) => t.id === selectedRowKey);
          const dataClone = Immutable.cloneDeep(data);

          const t = dataClone[index - 1];
          dataClone[index - 1] = dataClone[index];
          dataClone[index] = t;
          this.setState({
            data: dataClone,
          });
        },
        disable: () => {
          const { selectedRowKey = '', data = [] } = this.state;
          if (!selectedRowKey) return true;
          else {
            const index = data.findIndex((t) => t.id === selectedRowKey);
            if (index === 0) return true;
            else return false;
          }
        },
      },
      // 下移行
      {
        key: 'moveRowDown',
        className: () =>
          `fa fa-arrow-down ${
            this.rowToolConfig.find((t) => t.key === 'moveRowDown').disable() ? 'disable' : ''
          }`,
        title: 'move row down',
        onClick: () => {
          const disabled = this.rowToolConfig.find((t) => t.key === 'moveRowDown').disable();
          if (disabled) return false;

          const { selectedRowKey = '', data = [] } = this.state;
          const index = data.findIndex((t) => t.id === selectedRowKey);
          const dataClone = Immutable.cloneDeep(data);

          const t = dataClone[index + 1];
          dataClone[index + 1] = dataClone[index];
          dataClone[index] = t;
          this.setState({
            data: dataClone,
          });
        },
        disable: () => {
          const { selectedRowKey = '', data = [] } = this.state;
          if (!selectedRowKey) return true;
          else {
            const index = data.findIndex((t) => t.id === selectedRowKey);
            if (index === data.length - 1) return true;
            else return false;
          }
        },
      },
    ];
  }

  /**
   * renderColumnTool
   * @return {*[]}
   */
  renderColumnTool() {
    return this.columnToolConfig.map(({ key, className, title, onClick }) => {
      return (
        <span
          key={key}
          className={className()}
          title={title}
          onClick={() => {
            onClick();
          }}
        />
      );
    });
  }

  /**
   * renderRowTool
   * @return {*[]}
   */
  renderRowTool() {
    return this.rowToolConfig.map(({ key, className, title, onClick }) => {
      return (
        <span
          key={key}
          className={className()}
          title={title}
          onClick={() => {
            onClick();
          }}
        />
      );
    });
  }

  /**
   * cloneColumns
   * @param {Array} - columns
   * @return {Array}
   */
  cloneColumns(columns = this.state.columns) {
    // const { columns = [] } = this.state;
    const cloneColumns = Immutable.cloneDeep(
      columns.map(({ render, ...other }) => {
        return other;
      }),
    );

    return cloneColumns.map((t) => {
      return Object.assign(t, {
        render: (record, rowValue, rowIndex, dataIndex) => {
          return (
            <TableTextFieldEditor
              type="text"
              value={rowValue}
              index={rowIndex}
              dataIndex={dataIndex}
            />
          );
        },
      });
    });
  }

  /**
   * addColumn
   * @param {String} - name
   * @param {Number} - index
   */
  addColumn({ name, index }) {
    const { zIndex } = this.props;
    Modal.prompt({
      content: 'column name',
      defaultValue: name,
      zIndex: zIndex + 10,
      success: (columnName) => {
        return new Promise((resolve) => {
          const columns = this.cloneColumns();
          let data = Immutable.cloneDeep(this.state.data);
          const id = uuid();
          columns.splice(index, 0, {
            title: columnName,
            key: id,
            align: 'center',
            dataIndex: id,
            render: (record, rowValue, rowIndex, dataIndex) => {
              return (
                <TableTextFieldEditor
                  type="text"
                  value={rowValue}
                  index={rowIndex}
                  dataIndex={dataIndex}
                />
              );
            },
          });

          data = data.map((t) => {
            return Object.assign(t, { [id]: '' });
          });

          this.setState(
            {
              columns,
              data,
            },
            () => {
              resolve();
            },
          );
        });
      },
    });
  }

  /**
   * addRow
   * @param {Number} - index
   */
  addRow(index) {
    const { data = [], columns = [] } = this.state;

    const dataClone = Immutable.cloneDeep(data);

    const rowData = {
      id: uuid(),
    };
    columns.forEach(({ dataIndex }) => {
      rowData[dataIndex] = '';
    });

    dataClone.splice(index, 0, rowData);
    this.setState({
      data: dataClone,
    });
  }

  /**
   * appendMulitRow
   * @param {Number} - rowCount
   * @return {Promise}
   */
  appendMulitRow(rowCount) {
    return new Promise((resolve) => {
      const { data = [], columns = [] } = this.state;

      const dataClone = Immutable.cloneDeep(data);

      const rowData = {};
      columns.forEach(({ dataIndex }) => {
        rowData[dataIndex] = '';
      });

      const addRows = [];
      for (let i = 0; i < rowCount; i++) {
        addRows.push(Object.assign(Immutable.cloneDeep(rowData), { id: uuid() }));
      }

      this.setState(
        {
          data: dataClone.concat(addRows),
        },
        () => {
          resolve();
        },
      );
    });
  }

  /**
   * getTableColumnsConfig
   * @return {Array<ColumnConfig>}
   * */
  getTableColumnsConfig() {
    const { columns = [] } = this.state;

    return columns;
  }

  /**
   * getTableRowSelection
   * @return {Object}
   */
  getTableRowSelection() {
    const { selectedRowKey } = this.state;

    return {
      selectedRowKey,
      onChange: (key) => {
        this.setState({
          selectedRowKey: key,
        });
      },
      onUnChange: () => {
        this.setState({
          selectedRowKey: '',
        });
      },
    };
  }

  /**
   * getTableCellSelection
   * @return {Object}
   */
  getTableCellSelection() {
    return {
      onChange: () => {},
    };
  }

  /**
   * getTableColumnSelection
   * @return {Object}
   */
  getTableColumnSelection() {
    const { selectedColumnKey } = this.state;

    return {
      selectedColumnKey,
      /**
       * onChange
       * 点击了列的某一项
       * @param {Object} - columnItem
       */
      onChange: (columnItem) => {
        this.setState({
          selectedColumnKey: columnItem.key,
        });
      },
    };
  }

  /**
   * getValue
   * @return {Object}
   */
  getValue() {
    return Immutable.cloneDeep(
      Object.assign(this.state, {
        columns: this.state.columns.map(({ render, ...other }) => other),
      }),
    );
  }

  /**
   * onEditorModify
   * @param {String} - value
   * @param {SelectOptions} - index
   * @param {String} - dataIndex
   */
  onEditorModify({ value, index, dataIndex }) {
    const data = Immutable.cloneDeep(this.state.data);
    data[index][dataIndex] = value;
    this.setState({
      data,
    });
  }

  /**
   * onShowNumber
   * @param - {Event}
   */
  onShowNumber(e) {
    this.setState({
      showNumber: e.target.checked,
    });
  }

  /**
   * onShowHeader
   * @param - {Event}
   */
  onShowHeader(e) {
    this.setState({
      isDisplayHead: e.target.checked,
    });
  }

  /**
   * onLoclColumn
   * @param - {Event}
   */
  onLoclColumn(e) {
    this.setState({
      columnLock: e.target.checked,
    });
  }

  /**
   * onBodyHeight
   * @param - {Event}
   */
  onBodyHeight(e) {
    this.setState({
      bodyHeight: e.target.value,
    });
  }

  /**
   * onShowPaging
   * @param - {Event}
   */
  onShowPaging(e) {
    this.setState({
      pagin: e.target.checked,
    });
  }

  render() {
    const { data = [], columnLock, showNumber, isDisplayHead, bodyHeight, pagin } = this.state;

    const props = {
      rowKey: 'id',
      data,
      columns: this.getTableColumnsConfig(),
      rowSelection: this.getTableRowSelection(),
      cellSelection: this.getTableCellSelection(),
      columnSelection: this.getTableColumnSelection(),
      onEditorModify: ::this.onEditorModify,
    };

    return (
      <div className={`${selectorPrefix}`}>
        <div className={`${selectorPrefix}-ToolGlobal`}>
          {/* 是否显示序号 */}
          <div className="g-flex horizontal vcenter">
            <input
              type="checkbox"
              className="g-flex-fixed"
              checked={showNumber}
              onChange={::this.onShowNumber}
            />
            <span className="g-flex-auto">Show Number</span>
          </div>
          {/* 是否显示列头 */}
          <div className="g-flex horizontal vcenter">
            <input
              type="checkbox"
              className="g-flex-fixed"
              checked={isDisplayHead}
              onChange={::this.onShowHeader}
            />
            <span className="g-flex-auto">Show Header</span>
          </div>
          {/* 锁定列 */}
          <div className="g-flex horizontal vcenter">
            <input
              type="checkbox"
              className="g-flex-fixed"
              checked={columnLock}
              onChange={::this.onLoclColumn}
            />
            <Input
              type="number"
              className="g-flex-fixed"
              value={bodyHeight}
              onChange={::this.onBodyHeight}
              disabled={!columnLock}
            />
            <span className="g-flex-auto">Lock Header</span>
          </div>
          {/* 是否显示分页 */}
          <div className="g-flex horizontal vcenter">
            <input
              type="checkbox"
              className="g-flex-fixed"
              checked={pagin}
              onChange={::this.onShowPaging}
            />
            <span className="g-flex-auto">Show Paging</span>
          </div>
        </div>

        <div className={`${selectorPrefix}-ColumnTool`}>{this.renderColumnTool()}</div>

        <div className={`${selectorPrefix}-RowTool`}>{this.renderRowTool()}</div>

        <div className={`${selectorPrefix}-Inner`}>
          <Table {...props} />
        </div>
      </div>
    );
  }
}

TableSetting.propTypes = {
  value: PropTypes.object,
  zIndex: PropTypes.number,
};

export default TableSetting;
