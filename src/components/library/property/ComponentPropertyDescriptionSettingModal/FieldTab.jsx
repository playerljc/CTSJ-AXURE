import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

import TableTextFieldEditor from '../../../global/CT-UI-Table/TableTextFieldEditor';
import { Immutable } from '../../../../util/CTMobile-UI-Util';
import { Select, TextArea } from '../../../global/CT-UI-Form';
import DescriptionField from '../DescriptionField';
import Table from '../../../global/CT-UI-Table/Table';
import { selectPrefix } from './ComponentPropertyDescriptionSettingModal';

import './FieldTab.less';

/**
 * FieldTab
 * @class FieldTab
 * @classdesc FieldTab
 */
class FieldTab extends React.PureComponent {
  /**
   * constructor
   * @param {Object} - props
   */
  constructor(props) {
    super(props);

    this.state = {
      // 自定义字段添加
      fieldSelectValue: '',
      // field的数据
      data: props.data,
      // field表格的当前选中行rowKey
      selectedRowKey: '',
      // 右侧Select类型Options的值
      selectOptionsValue: '',
    };

    this.onAddField = this.onAddField.bind(this);
    this.onUpField = this.onUpField.bind(this);
    this.onDownField = this.onDownField.bind(this);
    this.onDeleteField = this.onDeleteField.bind(this);
    this.onEditorModify = this.onEditorModify.bind(this);
    this.onSelectOptionsValueChange = this.onSelectOptionsValueChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
    });
  }

  /**
   * getTableColumnsConfig
   * @return {Array<ColumnConfig>}
   * */
  getTableColumnsConfig() {
    return [{
      title: 'Field',
      key: 'Field',
      align: 'left',
      dataIndex: 'name',
      render: (record, value, index, dataIndex) => {
        return (
          <TableTextFieldEditor
            type="text"
            value={value}
            index={index}
            dataIndex={dataIndex}
          />);
      },
    }, {
      title: 'Type',
      key: 'Type',
      align: 'left',
      dataIndex: 'type',
    }];
  }

  /**
   * onAddField
   * @param {Event} - e
   */
  onAddField(e) {
    const { onAddField } = this.props;
    const id = uuidv1();
    const data = [...this.state.data];
    data.push({
      id,
      name: 'newField',
      type: e.target.value,
    });

    this.setState({
      fieldSelectValue: e.target.value,
      data,
      selectedRowKey: id,
    }, () => {
      if (onAddField) {
        onAddField(Immutable.cloneDeep(data));
      }
    });
  }

  /**
   * onUpFiled
   * 上移
   */
  onUpField() {
    const { selectedRowKey, data = [] } = this.state;

    let index;
    if (!selectedRowKey) {
      return false;
    } else {
      index = data.findIndex(t => t.id === selectedRowKey);
      if (index === 0) {
        return false;
      }
    }

    const cloneData = [...data];
    const curTemp = cloneData[index];
    cloneData[index] = cloneData[index - 1];
    cloneData[index - 1] = curTemp;
    this.setState({
      data: cloneData,
    });
  }

  /**
   * onDownField
   * 下移
   */
  onDownField() {
    const { selectedRowKey, data = [] } = this.state;
    let index;
    if (!selectedRowKey) {
      return false;
    } else {
      index = data.findIndex(t => t.id === selectedRowKey);
      if (index === data.length - 1) {
        return false;
      }
    }

    const cloneData = [...data];
    const curTemp = cloneData[index];
    cloneData[index] = cloneData[index + 1];
    cloneData[index + 1] = curTemp;
    this.setState({
      data: cloneData,
    });
  }

  /**
   * onDeleteField
   * 删除
   */
  onDeleteField() {
    const { onDeleteField } = this.props;
    const { selectedRowKey, data = [] } = this.state;
    if (!selectedRowKey) return false;

    const index = data.findIndex(t => t.id === selectedRowKey);
    if (index === -1) {
      return false;
    }

    const deleteField = data[index];

    const cloneData = [...data];
    cloneData.splice(index, 1);
    this.setState({
      data: cloneData,
      selectedRowKey: '',
    }, () => {
      if (onDeleteField) {
        onDeleteField({
          field: Immutable.cloneDeep(cloneData),
          fieldId: deleteField.id,
        });
      }
    });
  }

  /**
   * onEditorModify
   * @param {String} - value
   * @param {Number} - index
   * @param {String} - dataIndex
   */
  onEditorModify({ value, index, dataIndex }) {
    const data = [...this.state.data];
    data[index][dataIndex] = value;
    this.setState({
      data,
    });
  }

  /**
   * onSelectOptionsValueChange
   * @param {Event} - e
   */
  onSelectOptionsValueChange(e) {
    const index = this.getSelectRowIndex();
    const value = e.target.value;
    const cloneData = [...this.state.data];

    if (index !== -1) {
      cloneData[index].options = value.split('\n');
    }

    const state = {
      selectOptionsValue: value,
    };

    if (index !== -1) {
      state.data = cloneData;
    }

    this.setState(state);
  }

  /**
   * getRowSelection
   * @return {Object}
   */
  getRowSelection() {
    const { selectedRowKey } = this.state;
    return {
      selectedRowKey,
      onChange: (key) => {
        this.setState({
          selectedRowKey: key,
        }, () => {
          const type = this.getSelectRowProperty('type');

          let selectOptionsValue = '';
          if (type === 'select') {
            const options = this.getSelectRowProperty('options');
            selectOptionsValue = options.join('\n');
          }

          this.setState({
            selectOptionsValue,
          });
        });
      },
      onUnChange: () => {
        this.setState({
          selectedRowKey: '',
          selectOptionsValue: '',
        });
      },
    };
  }

  /**
   * renderUpFieldClass
   * @return {String}
   */
  renderUpFieldClass() {
    const { selectedRowKey, data = [] } = this.state;
    let className = '';
    if (!selectedRowKey) {
      className = 'Disable';
    } else {
      const index = data.findIndex(t => t.id === selectedRowKey);
      if (index === 0) {
        className = 'Disable';
      }
    }
    return className;
  }

  /**
   * renderDownFieldClass
   */
  renderDownFieldClass() {
    const { selectedRowKey, data = [] } = this.state;
    let className = '';
    if (!selectedRowKey) {
      className = 'Disable';
    } else {
      const index = data.findIndex(t => t.id === selectedRowKey);
      if (index === data.length - 1) {
        className = 'Disable';
      }
    }
    return className;
  }

  /**
   * renderDeleteFieldClass
   */
  renderDeleteFieldClass() {
    const { selectedRowKey } = this.state;
    return !selectedRowKey ? 'Disable' : '';
  }

  /**
   * getSelectRowProperty
   * @param {String} - property
   * @return {String}
   */
  getSelectRowProperty(property) {
    const { selectedRowKey, data = [] } = this.state;
    const entry = data.find(t => t.id === selectedRowKey);
    if (entry) {
      return entry[property];
    } else {
      return '';
    }
  }

  /**
   * getSelectRowIndex
   * @return {Number}
   */
  getSelectRowIndex() {
    const { selectedRowKey, data = [] } = this.state;
    return data.findIndex(t => t.id === selectedRowKey);
  }

  /**
   * getData
   * @return {Array}
   */
  getData() {
    return Immutable.cloneDeep(this.state.data);
  }

  render() {
    const {
      fieldSelectValue,
      data = [],
      selectOptionsValue = '',
    } = this.state;
    return (
      <div className={`${selectPrefix}-FieldTab`}>
        {/* 自定义字段 */}
        <fieldset className={`${selectPrefix}-FieldTab-FieldSet`}>
          <legend>Custom Field</legend>
          {/* Field 添加的选择范围 */}
          <div className={`${selectPrefix}-FieldTab-FieldSet-ToolBar g-flex horizontal vcenter`}>
            <div className="g-flex-auto">
              <Select
                style={{ height: 30 }}
                value={fieldSelectValue}
                onChange={this.onAddField}
              >
                {DescriptionField.map(({ name, type }, index) => <option key={index + 1} value={type}>{name}</option>)}
              </Select>
            </div>
            <span
              className={`g-flex-fixed fa fa-long-arrow-up UpFieldBtn ${this.renderUpFieldClass()}`}
              onClick={this.onUpField}
            />
            <span
              className={`g-flex-fixed fa fa-long-arrow-down DownFieldBtn ${this.renderDownFieldClass()}`}
              onClick={this.onDownField}
            />
            <span
              className={`g-flex-fixed fa fa-times DeleteFieldBtn ${this.renderDeleteFieldClass()}`}
              onClick={this.onDeleteField}
            />
          </div>

          {/* 已添加的Field */}
          <Table
            columns={this.getTableColumnsConfig()}
            data={data}
            rowKey="id"
            rowSelection={this.getRowSelection()}
            onEditorModify={this.onEditorModify}
          />
        </fieldset>

        {/* 编辑 */}
        <fieldset className={`${selectPrefix}-FieldTab-FieldSet`}>
          <legend>Editor: {this.getSelectRowProperty('name')}</legend>
          <div>
            <TextArea
              style={{ resize: 'none', height: 200 }}
              disabled={this.getSelectRowProperty('type') !== 'select'}
              value={selectOptionsValue}
              onChange={this.onSelectOptionsValueChange}
              onKeyDownCapture={(e) => { e.stopPropagation(); }}
            />
          </div>
        </fieldset>
      </div>
    );
  }
}

FieldTab.defaultProps = {
  data: [],
};

FieldTab.propTypes = {
  data: PropTypes.array,
  onAddField: PropTypes.func,
  onDeleteField: PropTypes.func,
};

export default FieldTab;
