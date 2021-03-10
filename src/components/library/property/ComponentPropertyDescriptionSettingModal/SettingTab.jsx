import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

import TableTextFieldEditor from '../../../global/CT-UI-Table/TableTextFieldEditor';
import Table from '../../../global/CT-UI-Table/Table';
import { Select } from '../../../global/CT-UI-Form';

import { Immutable } from '../../../../util/CTMobile-UI-Util';

import { selectPrefix } from './ComponentPropertyDescriptionSettingModal';

import './SettingTab.less';

/**
 * SettingTab
 * @class SettingTab
 * @classdesc SettingTab
 */
class SettingTab extends React.Component {
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

  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     groupData: props.data.group,
  //     fieldData: props.data.field,
  //   };
  // }

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
    return [
      {
        title: 'GroupName',
        key: 'GroupName',
        align: 'left',
        dataIndex: 'name',
        render: (record, value, index, dataIndex) => {
          return (
            <TableTextFieldEditor type="text" value={value} index={index} dataIndex={dataIndex} />
          );
        },
      },
    ];
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
   * @param {SelectOptions} - index
   * @param {String} - dataIndex
   */
  onEditorModify({ value, index, dataIndex }) {
    const data = Immutable.cloneDeep(this.state.groupData);
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
    const data = Immutable.cloneDeep(this.state.groupData);
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
    }
      index = groupData.findIndex((t) => t.id === groupTableSelectedRowKey);
      if (index === 0) {
        return false;
      }


    const cloneData = Immutable.cloneDeep(groupData);
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
    }
      index = groupData.findIndex((t) => t.id === groupTableSelectedRowKey);
      if (index === groupData.length - 1) {
        return false;
      }


    const cloneData = Immutable.cloneDeep(groupData);
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

    const index = groupData.findIndex((t) => t.id === groupTableSelectedRowKey);
    if (index === -1) {
      return false;
    }

    const cloneData = Immutable.cloneDeep(groupData);
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
      const index = groupData.findIndex((t) => t.id === groupTableSelectedRowKey);
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
      const index = groupData.findIndex((t) => t.id === groupTableSelectedRowKey);
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
    return [
      {
        title: 'FieldName',
        key: 'FieldName',
        align: 'left',
        dataIndex: 'name',
      },
      {
        title: 'FieldType',
        key: 'FieldType',
        align: 'left',
        dataIndex: 'type',
      },
    ];
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
    const { type } = fieldData.find((t) => t.id === fieldId);
    const { fields = [], index: groupIndex } = this.getActiveGroupFields();
    const cloneData = Immutable.cloneDeep(fields);
    cloneData.push({
      id: uuidv1(),
      fieldId,
      value: type === 'select' ? [] : '',
    });

    if (groupIndex !== -1) {
      groupData[groupIndex].fields = cloneData;
      this.setState({
        groupData,
        fieldSelectValue: fieldId,
      });
    }
  }

  getActiveGroupFields() {
    const { groupTableSelectedRowKey = '', groupData = [] } = this.state;
    const index = !groupTableSelectedRowKey
      ? -1
      : groupData.findIndex((t) => t.id === groupTableSelectedRowKey);
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
      const index = fields.findIndex((t) => t.id === fieldTableSelectedRowKey);
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
      const index = fields.findIndex((t) => t.id === fieldTableSelectedRowKey);
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
    } if (!fieldTableSelectedRowKey) {
      return false;
    }
      const { fields = [], index: groupIndex } = this.getActiveGroupFields();
      index = fields.findIndex((t) => t.id === fieldTableSelectedRowKey);
      if (index === 0) {
        return false;
      }
        const cloneData = Immutable.cloneDeep(fields);
        const curTemp = cloneData[index];
        cloneData[index] = cloneData[index - 1];
        cloneData[index - 1] = curTemp;
        groupData[groupIndex].fields = cloneData;
        this.setState({
          groupData,
        });


  }

  onDownField() {
    const { fieldTableSelectedRowKey, groupTableSelectedRowKey = '', groupData = [] } = this.state;
    let index;

    if (!groupTableSelectedRowKey) {
      return false;
    } if (!fieldTableSelectedRowKey) {
      return false;
    }
      const { fields = [], index: groupIndex } = this.getActiveGroupFields();
      index = fields.findIndex((t) => t.id === fieldTableSelectedRowKey);
      if (index === fields.length - 1) {
        return false;
      }
        const cloneData = Immutable.cloneDeep(fields);
        const curTemp = cloneData[index];
        cloneData[index] = cloneData[index + 1];
        cloneData[index + 1] = curTemp;
        groupData[groupIndex].fields = cloneData;
        this.setState({
          groupData,
        });


  }

  onDeleteField() {
    const { fieldTableSelectedRowKey, groupTableSelectedRowKey = [], groupData = [] } = this.state;
    if (!groupTableSelectedRowKey) return false;
    if (!fieldTableSelectedRowKey) return false;

    const { fields = [], index: groupIndex } = this.getActiveGroupFields();

    const index = fields.findIndex((t) => t.id === fieldTableSelectedRowKey);
    if (index === -1) {
      return false;
    }
      const cloneData = Immutable.cloneDeep(fields);
      cloneData.splice(index, 1);
      groupData[groupIndex].fields = cloneData;
      this.setState({
        groupData,
        fieldTableSelectedRowKey: '',
      });

  }

  getFields() {
    const { fieldData = [] } = this.state;
    const { fields = [] } = this.getActiveGroupFields();
    return fields.map((t) => {
      const { name, type } = fieldData.find((ft) => ft.id === t.fieldId);
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
    const { fieldData = [] } = this.state;

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
    const { groupData = [], fieldSelectValue = '' } = this.state;

    const fields = this.getFields();
    const selectFieldOptions = this.getSelectFieldOptions();
    const { name } = this.getActiveGroupFields();

    return (
      <div className={`${selectPrefix}-SettingTab`}>
        {/* 组的维护 */}
        <fieldset className={`${selectPrefix}-SettingTab-GroupSet`}>
          <legend>CustomSetting</legend>
          <div className={`${selectPrefix}-SettingTab-GroupSet-ToolBar g-flex horizontal vcenter`}>
            <span className="g-flex-fixed fa fa-plus AddGroupBtn" onClick={this.onAddGroup} />
            <span
              className={`g-flex-fixed fa fa-long-arrow-alt-up UpGroupBtn ${this.renderUpGroupClass()}`}
              onClick={this.onUpGroup}
            />
            <span
              className={`g-flex-fixed fa fa-long-arrow-alt-down DownGroupBtn ${this.renderDownGroupClass()}`}
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
          <div
            className={`${selectPrefix}-SettingTab-GroupFieldsSet-ToolBar g-flex horizontal vcenter`}
          >
            <div className="g-flex-auto">
              <Select
                style={{ height: 30 }}
                value={fieldSelectValue}
                onChange={this.onSelectField}
                onSelect={this.onSelectField}
              >
                {selectFieldOptions.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>
            <span
              className={`g-flex-fixed fa fa-long-arrow-alt-up UpFieldBtn ${this.renderUpFieldClass()}`}
              onClick={this.onUpField}
            />
            <span
              className={`g-flex-fixed fa fa-long-arrow-alt-down DownFieldBtn ${this.renderDownFieldClass()}`}
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

export default SettingTab;
