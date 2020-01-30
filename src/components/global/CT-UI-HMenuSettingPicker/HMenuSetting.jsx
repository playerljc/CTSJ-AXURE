import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';

import { Immutable } from '../../../util/CTMobile-UI-Util';
import TableTextFieldEditor from '../CT-UI-Table/TableTextFieldEditor';
import Table from '../CT-UI-Table/Table';
import Modal from '../CT-UI-Modal/modal';

import './HMenuSetting.less';


const selectorPrefix = 'CT-UI-HMenuSetting';

/**
 * HMenuSetting
 * @class HMenuSetting
 * @classdesc HMenuSetting
 */
class HMenuSetting extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedColumnKey: '',
      columns: this.cloneColumns(props.value.columns),
    };

    this.initColumnToolConfig();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
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
          const { columns = []} = this.state;
          this.addColumn({
            name: 'NewColumn',
            index: columns.length,
          });
        },
      },
      // 左侧加列
      {
        key: 'addLeftColumn',
        className: () => `fa fa-outdent ${this.columnToolConfig.find(t => t.key === 'addLeftColumn').disable() ? 'disable' : ''}`,
        title: 'add left column',
        onClick: () => {
          const disabled = this.columnToolConfig.find(t => t.key === 'addLeftColumn').disable();
          if (disabled) return false;

          const { selectedColumnKey = '', columns = []} = this.state;
          const index = columns.findIndex(t => t.key === selectedColumnKey);
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
        className: () => `fa fa-indent ${this.columnToolConfig.find(t => t.key === 'addRightColumn').disable() ? 'disable' : ''}`,
        title: 'add right column',
        onClick: () => {
          const disabled = this.columnToolConfig.find(t => t.key === 'addRightColumn').disable();
          if (disabled) return false;

          const { selectedColumnKey = '', columns = []} = this.state;
          const index = columns.findIndex(t => t.key === selectedColumnKey);
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
        className: () => `fa fa-window-close ${this.columnToolConfig.find(t => t.key === 'removeColumn').disable() ? 'disable' : ''}`,
        title: 'remove column',
        onClick: () => {
          const disabled = this.columnToolConfig.find(t => t.key === 'removeColumn').disable();
          if (disabled) return false;

          const { selectedColumnKey = '', columns = []} = this.state;
          const index = columns.findIndex(t => t.key === selectedColumnKey);
          const columnsClone = this.cloneColumns();
          columnsClone.splice(index, 1);

          this.setState({
            columns: columnsClone,
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
        className: () => `fa fa-arrow-left ${this.columnToolConfig.find(t => t.key === 'moveLeftColumn').disable() ? 'disable' : ''}`,
        title: 'move left column',
        onClick: () => {
          const disabled = this.columnToolConfig.find(t => t.key === 'moveLeftColumn').disable();
          if (disabled) return false;

          const { selectedColumnKey = '', columns = []} = this.state;
          const index = columns.findIndex(t => t.key === selectedColumnKey);
          const columnsClone = this.cloneColumns();

          const t = columnsClone[index - 1];
          columnsClone[index - 1] = columnsClone[index];
          columnsClone[index] = t;
          this.setState({
            columns: columnsClone,
          });
        },
        disable: () => {
          const { selectedColumnKey = '', columns = []} = this.state;
          if (!selectedColumnKey) return true;
          else {
            const index = columns.findIndex(t => t.key === selectedColumnKey);
            if (index === 0) return true;
            else return false;
          }
        },
      },
      // 列右移动
      {
        key: 'moveRightColumn',
        className: () => `fa fa-arrow-right ${this.columnToolConfig.find(t => t.key === 'moveRightColumn').disable() ? 'disable' : ''}`,
        title: 'move right column',
        onClick: () => {
          const disabled = this.columnToolConfig.find(t => t.key === 'moveRightColumn').disable();
          if (disabled) return false;

          const { selectedColumnKey = '', columns = []} = this.state;
          const index = columns.findIndex(t => t.key === selectedColumnKey);
          const columnsClone = this.cloneColumns();

          const t = columnsClone[index + 1];
          columnsClone[index + 1] = columnsClone[index];
          columnsClone[index] = t;
          this.setState({
            columns: columnsClone,
          });
        },
        disable: () => {
          const { selectedColumnKey = '', columns = []} = this.state;
          if (!selectedColumnKey) return true;
          else {
            const index = columns.findIndex(t => t.key === selectedColumnKey);
            if (index === columns.length - 1) return true;
            else return false;
          }
        },
      },
      // 列的对其方式
      {
        key: 'columnAlign',
        className: () => `fa fa-align-justify ${this.columnToolConfig.find(t => t.key === 'columnAlign').disable() ? 'disable' : ''}`,
        title: 'column align',
        onClick: () => {
          const disabled = this.columnToolConfig.find(t => t.key === 'columnAlign').disable();
          if (disabled) return false;

          const { zIndex } = this.props;

          const { selectedColumnKey = '', columns = []} = this.state;
          const index = columns.findIndex(t => t.key === selectedColumnKey);
          const columnsClone = this.cloneColumns();

          Modal.promptSelect({
            content: 'column align',
            defaultValue: columnsClone[index].align,
            required: false,
            data: [{ label: 'left', value: 'left' }, { label: 'center', value: 'center' }, { label: 'right', value: 'right' }],
            zIndex: zIndex + 10,
            success: (columnAlign) => {
              return new Promise((resolve) => {
                columnsClone[index].align = columnAlign;
                this.setState({
                  columns: columnsClone,
                }, () => { resolve(); });
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
        className: () => `fa fa-th ${this.columnToolConfig.find(t => t.key === 'columnWidth').disable() ? 'disable' : ''}`,
        title: 'column width',
        onClick: () => {
          const disabled = this.columnToolConfig.find(t => t.key === 'columnWidth').disable();
          if (disabled) return false;

          const { zIndex } = this.props;

          const { selectedColumnKey = '', columns = []} = this.state;
          const index = columns.findIndex(t => t.key === selectedColumnKey);
          const columnsClone = this.cloneColumns();

          Modal.prompt({
            content: 'column width',
            defaultValue: columnsClone[index].width,
            zIndex: zIndex + 10,
            required: false,
            success: (columnWidth) => {
              return new Promise((resolve) => {
                columnsClone[index].width = columnWidth;
                this.setState({
                  columns: columnsClone,
                }, () => { resolve(); });
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
          onClick={() => { onClick(); }}
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
    const cloneColumns = Immutable.cloneDeep(columns.map(({ render, ...other }) => {
      return other;
    }));

    return cloneColumns.map((t) => {
      return Object.assign(t, {
        render: (record, rowValue, rowIndex, dataIndex) => {
          return (
            <TableTextFieldEditor
              type="text"
              value={rowValue}
              index={rowIndex}
              dataIndex={dataIndex}
            />);
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
                />);
            },
          });
          this.setState({
            columns,
          }, () => {
            resolve();
          });
        });
      },
    });
  }

  /**
   * getTableColumnsConfig
   * @return {Array<ColumnConfig>}
   * */
  getTableColumnsConfig() {
    const {
      columns = [],
    } = this.state;

    return columns;
  }

  getTableColumnSelection() {
    const {
      selectedColumnKey,
    } = this.state;

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
    return Immutable.cloneDeep(Object.assign(this.state, {
      columns: this.state.columns.map(({ render, ...other }) => other),
    }));
  }

  render() {
    const props = {
      rowKey: 'id',
      columns: this.getTableColumnsConfig(),
      columnSelection: this.getTableColumnSelection(),
    };

    return (
      <div className={`${selectorPrefix}`}>
        <div className={`${selectorPrefix}-ColumnTool`}>
          {this.renderColumnTool()}
        </div>

        <div className={`${selectorPrefix}-Inner`}>
          <Table
            {...props}
          />
        </div>
      </div>
    );
  }
}

HMenuSetting.propTypes = {
  value: PropTypes.object,
  zIndex: PropTypes.number,
};

export default HMenuSetting;
