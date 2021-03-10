import React from 'react';
import PropTypes from 'prop-types';

import { Input, Select } from '../../global/CT-UI-Form';
import Modal from '../../global/CT-UI-Modal/modal';
import { create } from '../../global/CT-UI-Form/form';
import { getMaxLevelNumber } from '../component/ComponentBaseHOC';
import ComponentPropertyDescriptionSettingModal from './ComponentPropertyDescriptionSettingModal/ComponentPropertyDescriptionSettingModal';

import Actions from '../../../util/Actions';
import Emitter from '../../../util/Emitter';
import { Immutable } from '../../../util/CTMobile-UI-Util';
import StringUtil from '../../../util/StringUtil';

import './ComponentPropertyDescriptionTab.less';

const selectorPrefix = 'ComponentPropertyDescriptionTab';

/**
 * 属性的说明
 * ComponentPropertyDescriptionTab
 * @class ComponentPropertyDescriptionTab
 * @classdesc ComponentPropertyDescriptionTab
 */
class ComponentPropertyDescriptionTab extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onOpenCustomProperty = this.onOpenCustomProperty.bind(this);

    const { shape } = this.props;

    const property = Immutable.cloneDeep(shape.getProperty().description);
    const { group = [] } = property;

    this.state = {
      property,
      groupSelectValue: group.length !== 0 ? group[0].id : '',
    };
  }

  /**
   * renderGroupSelect
   * @return {<Select>}
   */
  renderGroupSelect() {
    const {
      property: { group = [] },
      groupSelectValue,
    } = this.state;
    return (
      <Select onChange={this.onGroupSelectChange} value={groupSelectValue}>
        {group.map((g) => {
          const { name = '', id = '' } = g;
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
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

    const {
      property: { group = [] },
    } = this.state;

    if (group.length === 0) return null;

    const curGroup = group.find((t) => t.id === groupSelectValue);
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
    const {
      property: { field = [] },
    } = this.state;
    const fieldEntry = field.find((t) => t.id === fieldId);
    if (!fieldEntry) return null;

    const { type } = fieldEntry;

    const fieldElement = this[`render${StringUtil.captureName(type)}Field`](groupId, fieldConfig);

    const { id = '' } = fieldConfig;
    const { name = '' } = fieldEntry;
    return (
      <div key={id} className={`${selectorPrefix}-Fields-FieldWrap`}>
        <div className={`${selectorPrefix}-Fields-Field-Name`}>{name}</div>
        {fieldElement}
      </div>
    );
  }

  /**
   * renderTextField
   * @param groupId
   * @param id
   * @param value
   * @return {ReactElement}
   */
  renderTextField(groupId, { id, value }) {
    const { form } = this.props;
    const FiledComponent = form.createField(Input, id);
    return (
      <FiledComponent
        type="text"
        value={value}
        onChange={(e) => {
          this.propertyChange({ groupId, fieldId: id, value: { value: e.target.value } });
        }}
      />
    );
  }

  /**
   * renderNumberField
   * @param groupId
   * @param id
   * @param value
   * @return {ReactElement}
   */
  renderNumberField(groupId, { id, value }) {
    const { form } = this.props;
    const FiledComponent = form.createField(Input, id);
    return (
      <FiledComponent
        type="number"
        value={value}
        onChange={(e) => {
          this.propertyChange({ groupId, fieldId: id, value: { value: e.target.value } });
        }}
      />
    );
  }

  /**
   * renderDateField
   * @param groupId
   * @param id
   * @param value
   * @return {ReactElement}
   */
  renderDateField(groupId, { id, value }) {
    const { form } = this.props;
    const FiledComponent = form.createField(Input, id);
    return (
      <FiledComponent
        type="date"
        value={value}
        onChange={(e) => {
          this.propertyChange({ groupId, fieldId: id, value: { value: e.target.value } });
        }}
      />
    );
  }

  /**
   * renderSelectField
   * @param groupId
   * @param id
   * @param value
   * @param options
   * @return {ReactElement}
   */
  renderSelectField(groupId, { id, fieldId, value = '' }) {
    const { form } = this.props;
    const {
      property: { field = [] },
    } = this.state;
    const FiledComponent = form.createField(Select, id);

    let options = [];
    const fieldEntry = field.find((t) => t.id === fieldId);
    if (fieldEntry) {
      options = fieldEntry.options || [];
    }

    return (
      <FiledComponent
        multiple={false}
        value={value}
        onChange={(e) => {
          this.propertyChange({ groupId, fieldId: id, value: { value: e.target.value } });
        }}
      >
        {options.map((t, index) => (
          <option key={index + 1} value={t}>
            {t}
          </option>
        ))}
      </FiledComponent>
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
    const property = Immutable.cloneDeep(this.state.property);
    const { group = [] } = property;
    const groupEntry = group.find((t) => t.id === groupId);
    if (groupEntry) {
      const fieldEntry = groupEntry.fields.find((t) => t.id === fieldId);
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

  /**
   * onOpenCustomProperty
   * */
  onOpenCustomProperty() {
    const { property } = this.state;
    const modal = Modal.open({
      title: 'Component Description Fields and Configuration',
      zIndex: window.parseInt(getMaxLevelNumber()) + 1,
      component: (
        <ComponentPropertyDescriptionSettingModal
          property={Immutable.cloneDeep(property)}
          ref={(ins) => {
            this.propertyDescriptionSettingIns = ins;
          }}
        />
      ),
      yscroll: false,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            // 获取改变的数据
            const data = this.propertyDescriptionSettingIns.getData();
            // 更新shape数据
            const { shape } = this.props;
            shape.setPropertyByProps('description', data);
            this.setState(
              {
                property: data,
              },
              () => {
                Modal.close(modal);
              },
            );
          },
        },
        {
          text: 'cancel',
          handler: () => {
            Modal.close(modal);
          },
        },
      ],
    });
  }

  render() {
    this.props.form.clear();
    return (
      <div className={`${selectorPrefix}`}>
        {/* 组的选择Select */}
        <div className={`${selectorPrefix}-GroupSelect`}>{this.renderGroupSelect()}</div>

        <div className={`${selectorPrefix}-Tool`}>
          <span onClick={this.onOpenCustomProperty}>customProperty</span>
          <span>clearAll</span>
        </div>

        <div className={`${selectorPrefix}-Fields`}>{this.renderFields()}</div>
      </div>
    );
  }
}

ComponentPropertyDescriptionTab.propTypes = {
  form: PropTypes.object,
  shape: PropTypes.object,
};

export default create(ComponentPropertyDescriptionTab);
