import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import Tab from '../../global/CT-UI-Tab/Tab';
import TabPanel from '../../global/CT-UI-Tab/TabPanel';
import Table from '../../global/CT-UI-Table/Table';
import { Select, TextArea } from '../../global/CT-UI-Form';
import DescriptionField from './DescriptionField.json';
import TableTextFieldEditor from '../../global/CT-UI-Table/TableTextFieldEditor';

import { Immutable } from '../../../util/CTMobile-UI-Util';

import './ComponentPropertyDescriptionSettingModal.less';

const selectPrefix = 'ComponentPropertyDescriptionSettingModal';


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


/**
 * SettingTab
 * @class SettingTab
 * @classdesc SettingTab
 */
class SettingTab extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onAddGroup = this.onAddGroup.bind(this);
    this.onUpGroup = this.onUpGroup.bind(this);
    this.onDownGroup = this.onDownGroup.bind(this);
    this.onDeleteGroup = this.onDeleteGroup.bind(this);
    this.onEditorModify = this.onEditorModify.bind(this);

    this.onUpField = this.onUpField.bind(this);
    this.onDownField = this.onDownField.bind(this);
    this.onDeleteField = this.onDeleteField.bind(this);
    this.onSelectField = this.onSelectField.bind(this);

    this.state = {
      // 激活组的id
      groupTableSelectedRowKey: '',
      // 组的数据
      groupData: props.data.group,

      fieldData: props.data.field,
      fieldSelectValue: '',
      fieldTableSelectedRowKey: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      groupData: nextProps.data.group,
      fieldData: nextProps.data.field,
    });
  }

  /**
   * getGroupTableColumnsConfig
   * @return {Array<ColumnConfig>}
   * */
  getGroupTableColumnsConfig() {
    return [{
      title: 'GroupName',
      key: 'GroupName',
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
    }];
  }

  /**
   * getGroupTableRowSelection
   * @return {Object}
   */
  getGroupTableRowSelection() {
    const { groupTableSelectedRowKey } = this.state;
    return {
      selectedRowKey: groupTableSelectedRowKey,
      onChange: (key) => {
        this.setState({
          groupTableSelectedRowKey: key,
        });
      },
      onUnChange: () => {
        this.setState({
          groupTableSelectedRowKey: '',
        });
      },
    };
  }

  /**
   * onEditorModify
   * @param {String} - value
   * @param {Number} - index
   * @param {String} - dataIndex
   */
  onEditorModify({ value, index, dataIndex }) {
    const data = [...this.state.groupData];
    data[index][dataIndex] = value;
    this.setState({
      groupData: data,
    });
  }

  /**
   * onAddGroup
   */
  onAddGroup() {
    const id = uuidv1();
    const data = [...this.state.groupData];
    data.push({
      id,
      name: 'newGroup',
      fields: [],
    });

    this.setState({
      groupData: data,
      groupTableSelectedRowKey: id,
    });
  }

  /**
   * onUpGroup
   */
  onUpGroup() {
    const { groupTableSelectedRowKey, groupData = [] } = this.state;

    let index;
    if (!groupTableSelectedRowKey) {
      return false;
    } else {
      index = groupData.findIndex(t => t.id === groupTableSelectedRowKey);
      if (index === 0) {
        return false;
      }
    }

    const cloneData = [...groupData];
    const curTemp = cloneData[index];
    cloneData[index] = cloneData[index - 1];
    cloneData[index - 1] = curTemp;
    this.setState({
      groupData: cloneData,
    });
  }

  /**
   * onDownGroup
   */
  onDownGroup() {
    const { groupTableSelectedRowKey, groupData = [] } = this.state;
    let index;
    if (!groupTableSelectedRowKey) {
      return false;
    } else {
      index = groupData.findIndex(t => t.id === groupTableSelectedRowKey);
      if (index === groupData.length - 1) {
        return false;
      }
    }

    const cloneData = [...groupData];
    const curTemp = cloneData[index];
    cloneData[index] = cloneData[index + 1];
    cloneData[index + 1] = curTemp;
    this.setState({
      groupData: cloneData,
    });
  }

  /**
   * onDeleteGroup
   */
  onDeleteGroup() {
    const { groupTableSelectedRowKey, groupData = [] } = this.state;
    if (!groupTableSelectedRowKey) return false;

    const index = groupData.findIndex(t => t.id === groupTableSelectedRowKey);
    if (index === -1) {
      return false;
    }

    const cloneData = [...groupData];
    cloneData.splice(index, 1);
    this.setState({
      groupData: cloneData,
      groupTableSelectedRowKey: '',
    });
  }

  /**
   * renderUpGroupClass
   */
  renderUpGroupClass() {
    const { groupTableSelectedRowKey, groupData = [] } = this.state;
    let className = '';
    if (!groupTableSelectedRowKey) {
      className = 'Disable';
    } else {
      const index = groupData.findIndex(t => t.id === groupTableSelectedRowKey);
      if (index === 0) {
        className = 'Disable';
      }
    }
    return className;
  }

  /**
   * renderDownGroupClass
   */
  renderDownGroupClass() {
    const { groupTableSelectedRowKey, groupData = [] } = this.state;
    let className = '';
    if (!groupTableSelectedRowKey) {
      className = 'Disable';
    } else {
      const index = groupData.findIndex(t => t.id === groupTableSelectedRowKey);
      if (index === groupData.length - 1) {
        className = 'Disable';
      }
    }
    return className;
  }

  /**
   * renderDeleteGroupClass
   */
  renderDeleteGroupClass() {
    const { groupTableSelectedRowKey } = this.state;
    return !groupTableSelectedRowKey ? 'Disable' : '';
  }


  /* ---------------------------------------右侧--------------------------------------*/

  getFieldTableColumnsConfig() {
    return [{
      title: 'FieldName',
      key: 'FieldName',
      align: 'left',
      dataIndex: 'name',
    }, {
      title: 'FieldType',
      key: 'FieldType',
      align: 'left',
      dataIndex: 'type',
    }];
  }

  getFieldTableRowSelection() {
    const { fieldTableSelectedRowKey } = this.state;
    return {
      selectedRowKey: fieldTableSelectedRowKey,
      onChange: (key) => {
        this.setState({
          fieldTableSelectedRowKey: key,
        });
      },
      onUnChange: () => {
        this.setState({
          fieldTableSelectedRowKey: '',
        });
      },
    };
  }

  onSelectField(e) {
    const { groupData = [], fieldData = [] } = this.state;
    const fieldId = e.target.value;
    const { type } = fieldData.find(t => t.id === fieldId);
    const { fields = [], index: groupIndex } = this.getActiveGroupFields();
    const cloneData = [...fields];
    cloneData.push({
      id: uuidv1(),
      fieldId,
      value: type === 'select' ? [] : '',
    });
    groupData[groupIndex].fields = cloneData;
    this.setState({
      groupData,
      fieldSelectValue: fieldId,
    });
  }

  getActiveGroupFields() {
    const { groupTableSelectedRowKey = '', groupData = [] } = this.state;
    const index = !groupTableSelectedRowKey ? -1 : groupData.findIndex(t => t.id === groupTableSelectedRowKey);
    return {
      index,
      fields: index === -1 ? [] : groupData[index].fields,
      name: index === -1 ? '' : groupData[index].name,
      id: index === -1 ? '' : groupData[index].id,
    };
  }

  renderUpFieldClass() {
    const { fieldTableSelectedRowKey, groupTableSelectedRowKey = '' } = this.state;
    let className = '';
    if (!groupTableSelectedRowKey) {
      className = 'Disable';
    } else if (!fieldTableSelectedRowKey) {
      className = 'Disable';
    } else {
      const { fields = [] } = this.getActiveGroupFields();
      const index = fields.findIndex(t => t.id === fieldTableSelectedRowKey);
      if (index === 0) {
        className = 'Disable';
      }
    }

    return className;
  }

  renderDownFieldClass() {
    const { fieldTableSelectedRowKey, groupTableSelectedRowKey = '' } = this.state;
    let className = '';
    if (!groupTableSelectedRowKey) {
      className = 'Disable';
    } else if (!fieldTableSelectedRowKey) {
      className = 'Disable';
    } else {
      const { fields = [] } = this.getActiveGroupFields();
      const index = fields.findIndex(t => t.id === fieldTableSelectedRowKey);
      if (index === fields.length - 1) {
        className = 'Disable';
      }
    }
    return className;
  }

  renderDeleteFieldClass() {
    const { fieldTableSelectedRowKey } = this.state;
    return !fieldTableSelectedRowKey ? 'Disable' : '';
  }

  onUpField() {
    const { fieldTableSelectedRowKey, groupTableSelectedRowKey = '', groupData = [] } = this.state;

    let index;
    if (!groupTableSelectedRowKey) {
      return false;
    } else if (!fieldTableSelectedRowKey) {
      return false;
    } else {
      const { fields = [], index: groupIndex } = this.getActiveGroupFields();
      index = fields.findIndex(t => t.id === fieldTableSelectedRowKey);
      if (index === 0) {
        return false;
      } else {
        const cloneData = [...fields];
        const curTemp = cloneData[index];
        cloneData[index] = cloneData[index - 1];
        cloneData[index - 1] = curTemp;
        groupData[groupIndex].fields = cloneData;
        this.setState({
          groupData,
        });
      }
    }
  }

  onDownField() {
    const { fieldTableSelectedRowKey, groupTableSelectedRowKey = '', groupData = [] } = this.state;
    let index;

    if (!groupTableSelectedRowKey) {
      return false;
    } else if (!fieldTableSelectedRowKey) {
      return false;
    } else {
      const { fields = [], index: groupIndex } = this.getActiveGroupFields();
      index = fields.findIndex(t => t.id === fieldTableSelectedRowKey);
      if (index === fields.length - 1) {
        return false;
      } else {
        const cloneData = [...fields];
        const curTemp = cloneData[index];
        cloneData[index] = cloneData[index + 1];
        cloneData[index + 1] = curTemp;
        groupData[groupIndex].fields = cloneData;
        this.setState({
          groupData,
        });
      }
    }
  }

  onDeleteField() {
    const { fieldTableSelectedRowKey, groupTableSelectedRowKey = [], groupData = [] } = this.state;
    if (!groupTableSelectedRowKey) return false;
    if (!fieldTableSelectedRowKey) return false;

    const { fields = [], index: groupIndex } = this.getActiveGroupFields();

    const index = fields.findIndex(t => t.id === fieldTableSelectedRowKey);
    if (index === -1) {
      return false;
    } else {
      const cloneData = [...fields];
      cloneData.splice(index, 1);
      groupData[groupIndex].fields = cloneData;
      this.setState({
        groupData,
        fieldTableSelectedRowKey: '',
      });
    }
  }

  getFields() {
    const { fieldData = [] } = this.state;
    const { fields = [] } = this.getActiveGroupFields();
    return fields.map((t) => {
      const { name, type } = fieldData.find(ft => ft.id === t.fieldId);
      return Object.assign(t, {
        name,
        type,
      });
    });
  }

  /**
   * getSelectFieldOptions
   * file和group
   */
  getSelectFieldOptions() {
    const {
      fieldData = [],
    } = this.state;

    // 当前激活的group的fields
    const { fields = [] } = this.getActiveGroupFields();

    return fieldData.filter(({ id }) => {
      return fields.findIndex(({ fieldId }) => id === fieldId) === -1;
    });
  }

  /**
   * getData
   * @return {Array}
   */
  getData() {
    return Immutable.cloneDeep(this.state.groupData);
  }

  render() {
    const {
      groupData = [],
      fieldSelectValue = '',
    } = this.state;

    const fields = this.getFields();
    const selectFieldOptions = this.getSelectFieldOptions();
    const { name } = this.getActiveGroupFields();

    return (
      <div className={`${selectPrefix}-SettingTab`}>
        {/* 组的维护 */}
        <fieldset className={`${selectPrefix}-SettingTab-GroupSet`}>
          <legend>CustomSetting</legend>
          <div className={`${selectPrefix}-SettingTab-GroupSet-ToolBar g-flex horizontal vcenter`}>
            <span
              className="g-flex-fixed fa fa-plus AddGroupBtn"
              onClick={this.onAddGroup}
            />
            <span
              className={`g-flex-fixed fa fa-long-arrow-up UpGroupBtn ${this.renderUpGroupClass()}`}
              onClick={this.onUpGroup}
            />
            <span
              className={`g-flex-fixed fa fa-long-arrow-down DownGroupBtn ${this.renderDownGroupClass()}`}
              onClick={this.onDownGroup}
            />
            <span
              className={`g-flex-fixed fa fa-times DeleteGroupBtn ${this.renderDeleteGroupClass()}`}
              onClick={this.onDeleteGroup}
            />
          </div>
          <Table
            columns={this.getGroupTableColumnsConfig()}
            data={groupData}
            rowKey="id"
            rowSelection={this.getGroupTableRowSelection()}
            onEditorModify={this.onEditorModify}
            isDisplayHead={false}
          />
        </fieldset>

        {/* 组中的fiels维护 */}
        <fieldset className={`${selectPrefix}-SettingTab-GroupFieldsSet`}>
          <legend>FieldSetting:{name}</legend>
          <div className={`${selectPrefix}-SettingTab-GroupFieldsSet-ToolBar g-flex horizontal vcenter`}>
            <div className="g-flex-auto">
              <Select
                style={{ height: 30 }}
                value={fieldSelectValue}
                onChange={this.onSelectField}
                onSelect={this.onSelectField}
              >
                {selectFieldOptions.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
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
          <Table
            columns={this.getFieldTableColumnsConfig()}
            data={fields}
            rowKey="id"
            rowSelection={this.getFieldTableRowSelection()}
          />
        </fieldset>
      </div>
    );
  }
}

SettingTab.defaultProps = {
  data: [],
};

SettingTab.propTypes = {
  data: PropTypes.object,
};

/**
 * ComponentPropertyDescriptionSettingModal
 * @class ComponentPropertyDescriptionSettingModal
 * @classdesc ComponentPropertyDescriptionSettingModal
 */
class ComponentPropertyDescriptionSettingModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onAddField = this.onAddField.bind(this);
    this.onDeleteField = this.onDeleteField.bind(this);

    this.state = {
      activeKey: 'Field',
      property: props.property,
    };
  }

  onAddField(field) {
    // 在这里进行group引用filed的删减操作
    const property = Immutable.cloneDeep(this.state.property);
    property.field = field;
    this.setState({
      property,
    });
  }

  onDeleteField({ field, fieldId: deleteFieldId }) {
    // 在这里进行group引用filed的删减操作
    const { group = [] } = Immutable.cloneDeep(this.state.property);
    let isUpdate = false;
    group.forEach(({ fields }) => {
      fields.forEach(({ fieldId }, index) => {
        if (deleteFieldId === fieldId) {
          fields.splice(index, 1);
          isUpdate = true;
        }
      });
    });

    if (isUpdate) {
      this.setState({
        property: {
          group,
          field,
        },
      });
    } else {
      this.setState({
        property: {
          field,
        },
      });
    }
  }

  getData() {
    return {
      field: this.fieldTabIns.getData(),
      group: this.settingTabIns.getData(),
    };
  }

  render() {
    const { activeKey, property: { group = [], field = [] } } = this.state;

    return (
      <div className={`${selectPrefix}`}>
        <Tab
          canRemove={false}
          activeKey={activeKey}
          onChange={(key) => {
            this.setState({
              activeKey: key,
            });
          }}
        >
          <TabPanel key="Field" name="Field">
            <FieldTab
              data={field}
              onAddField={this.onAddField}
              onDeleteField={this.onDeleteField}
              ref={(ins) => {
                this.fieldTabIns = ins;
              }}
            />
          </TabPanel>
          <TabPanel key="Setting" name="Setting">
            <SettingTab
              data={{
                group,
                field,
              }}
              ref={(ins) => {
                this.settingTabIns = ins;
              }}
            />
          </TabPanel>
        </Tab>
      </div>
    );
  }
}

ComponentPropertyDescriptionSettingModal.propTypes = {
  property: PropTypes.object,
};

export default ComponentPropertyDescriptionSettingModal;

