import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Input, Select } from '../../global/CT-UI-Form';
import { create } from '../../global/CT-UI-Form/form';
import Actions from '../../../util/Actions';
import Emitter from '../../../util/Emitter';

import './ComponentPropertyDescriptionTab.less';

const selectorPrefix = 'ComponentPropertyDescriptionTab';

/**
 * 属性的说明
 * ComponentPropertyDescriptionTab
 * @class ComponentPropertyDescriptionTab
 * @classdesc ComponentPropertyDescriptionTab
 */
class ComponentPropertyDescriptionTab extends React.Component {
  constructor(props) {
    super(props);

    const { property: { group = [] } } = this.props;

    this.state = {
      groupSelectValue: group.length !== 0 ? group[0].id : '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { property: { group = [] } } = nextProps;
    this.setState({
      groupSelectValue: group.length !== 0 ? group[0].id : '',
    });
  }

  /**
   * renderGroupSelect
   * @return {<Select>}
   */
  renderGroupSelect() {
    const { property: { group = [] } } = this.props;
    const { groupSelectValue } = this.state;
    return (
      <Select
        onChange={this.onGroupSelectChange}
        value={groupSelectValue}
      >
        {group.map((g) => {
          const { name = '', id = '' } = g;
          return (<option key={id} value={id}>{name}</option>);
        })}
      </Select>
    );
  }

  /**
   * renderFields
   * @return {Array<ReactElement>}
   */
  renderFields() {
    const { groupSelectValue = '' } = this.state;

    if (!groupSelectValue) return null;

    const { property: { group = [] } } = this.props;

    if (group.length === 0) return null;

    const curGroup = group.find(t => t.id === groupSelectValue);
    if (!curGroup) return null;

    const fieldElementArr = [];
    const { fields = [], id } = curGroup;
    fields.forEach((t) => {
      fieldElementArr.push(this.renderField(id, t));
    });
    return fieldElementArr;
  }

  /**
   * renderField
   * @param {String} - groupId
   * @param {Object} - fieldConfig
   */
  renderField(groupId, fieldConfig) {
    const { fieldId } = fieldConfig;
    const { property: { field = [] } } = this.props;
    const fieldEntry = field.find(t => t.id === fieldId);
    if (!fieldEntry) return null;

    const { type } = fieldEntry;

    let fieldElement = null;
    switch (type) {
      case 'text':
        fieldElement = this.renderTextField(groupId, fieldConfig, fieldEntry);
        break;
      case 'number':
        fieldElement = this.renderNumberField(groupId, fieldConfig, fieldEntry);
        break;
      case 'date':
        fieldElement = this.renderDateField(groupId, fieldConfig, fieldEntry);
        break;
      case 'select':
        fieldElement = this.renderSelectField(groupId, fieldConfig, fieldEntry);
        break;
      default:
        break;
    }

    return fieldElement;
  }

  /**
   * renderTextField
   * @param groupId
   * @param id
   * @param value
   * @param name
   * @return {ReactElement}
   */
  renderTextField(groupId, { id, value }, { name = '' }) {
    const { form } = this.props;
    const FiledComponent = form.createField(Input, id);
    return (
      <div key={id}>
        <div>{name}</div>
        <FiledComponent
          type="text"
          value={value}
          onChange={(e) => {
            this.propertyChange({ groupId, fieldId: id, value: { value: e.target.value } });
          }}
        />
      </div>
    );
  }

  /**
   * renderNumberField
   * @param groupId
   * @param id
   * @param value
   * @param name
   * @return {ReactElement}
   */
  renderNumberField(groupId, { id, value }, { name = '' }) {
    const { form } = this.props;
    const FiledComponent = form.createField(Input, id);
    return (
      <div key={id}>
        <div>{name}</div>
        <FiledComponent
          type="number"
          value={value}
          onChange={(e) => {
            this.propertyChange({ groupId, fieldId: id, value: { value: e.target.value } });
          }}
        />
      </div>
    );
  }

  /**
   * renderDateField
   * @param groupId
   * @param id
   * @param value
   * @param name
   * @return {ReactElement}
   */
  renderDateField(groupId, { id, value }, { name = '' }) {
    const { form } = this.props;
    const FiledComponent = form.createField(Input, id);
    return (
      <div key={id}>
        <div>{name}</div>
        <FiledComponent
          type="date"
          value={value}
          onChange={(e) => {
            this.propertyChange({ groupId, fieldId: id, value: { value: e.target.value } });
          }}
        />
      </div>
    );
  }

  /**
   * renderSelectField
   * @param groupId
   * @param id
   * @param value
   * @param options
   * @param name
   * @return {ReactElement}
   */
  renderSelectField(groupId, { id, value = '', options = [] }, { name = '' }) {
    const { form } = this.props;
    const FiledComponent = form.createField(Select, id);

    return (
      <div key={id}>
        <div>{name}</div>
        <FiledComponent
          multiple={false}
          defaultValue={value}
          onChange={(e) => {
            this.propertyChange({ groupId, fieldId: id, value: { value: e.target.value } });
          }}
        >
          {options.map((t, index) => (<option key={index + 1} value={t}>{t}</option>))}
        </FiledComponent>
      </div>
    );
  }

  /**
   * propertyChange
   * @param {String} - groupId 组id
   * @param {String} - fieldId 字段id
   * @param {Object} - value 更新的值
   */
  propertyChange({ groupId, fieldId, value }) {
    const { shape } = this.props;
    const property = { ...this.props.property };
    const { group = [] } = property;
    const groupEntry = group.find(t => t.id === groupId);
    if (groupEntry) {
      const fieldEntry = groupEntry.fields.find(t => t.id === fieldId);
      if (fieldEntry) {
        Object.assign(fieldEntry, value);
        shape.setPropertyByProps('description', property);
        Emitter.trigger(Actions.components.library.component.propertychange);
      }
    }
  }

  /**
   * onGroupSelectChange
   * @param {String} - value
   */
  onGroupSelectChange = (e) => {
    this.setState({
      groupSelectValue: e.target.value,
    });
  };

  render() {
    this.props.form.clear();
    return (
      <div className={`${selectorPrefix}`}>

        {/* 组的选择Select */}
        <div className={`${selectorPrefix}-GroupSelect`}>
          {this.renderGroupSelect()}
        </div>

        <div className={`${selectorPrefix}-Tool`}>
          <a>customProperty</a>
          <a>clearAll</a>
        </div>

        <div className={`${selectorPrefix}-Fields`}>
          {this.renderFields()}
        </div>

      </div>
    );
  }
}

ComponentPropertyDescriptionTab.propTypes = {
  property: PropTypes.object,
  shape: PropTypes.object,
};

export default create(ComponentPropertyDescriptionTab);
