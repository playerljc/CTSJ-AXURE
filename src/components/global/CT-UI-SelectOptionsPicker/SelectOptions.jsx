import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';

import { Immutable } from '../../../util/CTMobile-UI-Util';
import Table from '../CT-UI-Table/Table';
import TableTextFieldEditor from '../CT-UI-Table/TableTextFieldEditor';

import './SelectOptions.less';

const selectorPrefix = 'CT-UI-SelectOptionsPicker';

/**
 * SelectOptions
 * @class SelectOptions
 * @classdesc SelectOptions
 */
class SelectOptions extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      data: props.data,
      selectedRowKey: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
      data: nextProps.data,
      selectedRowKey: nextProps.value,
    });
  }

  /**
   * getTableColumnsConfig
   * @return {Array<ColumnConfig>}
   * */
  getTableColumnsConfig() {
    const { value } = this.state;

    return [
      {
        title: '',
        key: 'checked',
        align: 'left',
        dataIndex: 'checked',
        width: '50px',
        render: (record) => {
          return (
            <input
              type="checkbox"
              checked={value === record.value}
              onChange={(e) => {
                const checked = e.target.checked;
                this.setState({
                  value: checked ? record.value : '',
                });
              }}
            />
          );
        },
      },
      {
        title: '',
        key: 'label',
        align: 'left',
        dataIndex: 'label',
        render: (record, rowValue, index, dataIndex) => {
          return (
            <TableTextFieldEditor
              type="text"
              value={rowValue}
              index={index}
              dataIndex={dataIndex}
            />
          );
        },
      },
    ];
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
   * getUpDisable
   * @return {Boolean}
   */
  getUpDisable() {
    const { selectedRowKey, data } = this.state;

    if (!selectedRowKey) return true;

    return data.findIndex(({ value }) => selectedRowKey === value) === 0;
  }

  /**
   * getDownDisable
   * @return {Boolean}
   */
  getDownDisable() {
    const { selectedRowKey, data } = this.state;

    if (!selectedRowKey) return true;

    return data.findIndex(({ value }) => selectedRowKey === value) === data.length - 1;
  }

  /**
   * getValue
   * @return {Object}
   */
  getValue() {
    return Immutable.cloneDeep(this.state);
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
   * onAdd
   */
  onAdd() {
    const { selectedRowKey } = this.state;

    const value = uuid();
    const data = Immutable.cloneDeep(this.state.data);

    const index = data.findIndex(({ value: v }) => v === selectedRowKey);
    data.splice(index + 1, 0, {
      label: 'NewItem',
      value,
    });

    this.setState({
      selectedRowKey: value,
      data,
    });
  }

  /**
   * onUp
   */
  onUp() {
    const disabled = this.getUpDisable();
    if (disabled) return false;

    const { selectedRowKey } = this.state;

    const data = Immutable.cloneDeep(this.state.data);
    const index = data.findIndex(({ value: v }) => v === selectedRowKey);

    const t = data[index - 1];
    data[index - 1] = data[index];
    data[index] = t;

    this.setState({
      data,
    });
  }

  /**
   * onDown
   */
  onDown() {
    const disabled = this.getDownDisable();
    if (disabled) return false;

    const { selectedRowKey } = this.state;

    const data = Immutable.cloneDeep(this.state.data);
    const index = data.findIndex(({ value: v }) => v === selectedRowKey);

    const t = data[index + 1];
    data[index + 1] = data[index];
    data[index] = t;

    this.setState({
      data,
    });
  }

  /**
   * onDeleteRow
   */
  onDeleteRow() {
    const { value, selectedRowKey } = this.state;

    if (!selectedRowKey) return false;

    const data = Immutable.cloneDeep(this.state.data);
    const index = data.findIndex(({ value: v }) => v === selectedRowKey);
    const preValue = data[index].value;
    data.splice(index, 1);
    this.setState({
      value: value === preValue ? '' : value,
      data,
      selectedRowKey: '',
    });
  }

  /**
   * onDeleteAll
   */
  onDeleteAll() {
    this.setState({
      data: [],
      selectedRowKey: '',
      value: '',
    });
  }

  render() {
    const { data = [] } = this.state;

    return (
      <div className={`${selectorPrefix}`}>
        <div className={`${selectorPrefix}-Tool`}>
          <span className="fa fa-plus" onClick={::this.onAdd} />
          <span
            className={`fa fa-long-arrow-alt-up ${this.getUpDisable() ? 'disable' : ''}`}
            onClick={::this.onUp}
          />
          <span
            className={`fa fa-long-arrow-alt-down ${this.getDownDisable() ? 'disable' : ''}`}
            onClick={::this.onDown}
          />
          <span className="fa fa-times" onClick={::this.onDeleteRow} />
          <span className="fa fa-times-circle" onClick={::this.onDeleteAll} />
        </div>

        <div className={`${selectorPrefix}-Inner`}>
          <Table
            columns={this.getTableColumnsConfig()}
            data={data}
            rowKey="value"
            rowSelection={this.getTableRowSelection()}
            onEditorModify={::this.onEditorModify}
            isDisplayHead={false}
          />
        </div>
      </div>
    );
  }
}

SelectOptions.propTypes = {
  value: PropTypes.string,
  data: PropTypes.array,
};

export default SelectOptions;
