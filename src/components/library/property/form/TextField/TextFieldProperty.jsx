import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import Number from '../../propertyfield/number/Number';
import Checkbox from '../../propertyfield/checkbox/Checkbox';
import InputTypeSelect from '../../propertyfield/inputtypeselect/InputTypeSelect';
import ToolTip from '../../propertyfield/tooltip/ToolTip';

import './TextFieldProperty.less';

const selectorPrefix = 'TextFieldProperty';

/**
 * TextFieldProperty
 * @class TextFieldProperty
 * @classdesc TextFieldProperty
 */
class TextFieldProperty extends React.PureComponent {
  /**
   * getConfig
   * @return {*[]}
   */
  getConfig() {
    const { shape } = this.props;

    const {
      tooltip = '',
      type = 'text',
      placeholder = '',
      maxlength = 50,
      autofocus = false,
      readonly = false,
      disabled = false,
      required = false,
      value = '',
    } = shape.getProperty().prop;

    return [
      {
        key: 'Interaction',
        name: 'Interaction',
        Component: null,
      },
      {
        key: 'ToolTip',
        name: 'ToolTip',
        Component: (
          <ToolTip
            value={tooltip}
            onChange={(value) => {
              const {prop} = shape.getProperty();
              prop.tooltip = value;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },

      {
        key: 'type',
        name: 'type',
        Component: (
          <InputTypeSelect
            value={type}
            onChange={(v) => {
              const {prop} = shape.getProperty();
              prop.type = v;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
      {
        key: 'value',
        name: 'value',
        Component: (
          <ToolTip
            value={value}
            onChange={(v) => {
              const {prop} = shape.getProperty();
              prop.value = v;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
      {
        key: 'placeholder',
        name: 'placeholder',
        Component: (
          <ToolTip
            value={placeholder}
            onChange={(v) => {
              const {prop} = shape.getProperty();
              prop.placeholder = v;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
      {
        key: 'maxlength',
        name: 'maxlength',
        Component: (
          <Number
            value={maxlength}
            onChange={(v) => {
              const {prop} = shape.getProperty();
              prop.maxlength = v;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },

      {
        key: 'autofocus',
        name: 'autofocus',
        Component: (
          <Checkbox
            label="autofocus"
            value={autofocus}
            onChange={(v) => {
              const {prop} = shape.getProperty();
              prop.autofocus = v;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
      {
        key: 'readonly',
        name: 'readonly',
        Component: (
          <Checkbox
            label="readonly"
            value={readonly}
            onChange={(v) => {
              const {prop} = shape.getProperty();
              prop.readonly = v;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
      {
        key: 'disabled',
        name: 'disabled',
        Component: (
          <Checkbox
            label="disabled"
            value={disabled}
            onChange={(v) => {
              const {prop} = shape.getProperty();
              prop.disabled = v;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
      {
        key: 'required',
        name: 'required',
        Component: (
          <Checkbox
            label="required"
            value={required}
            onChange={(v) => {
              const {prop} = shape.getProperty();
              prop.required = v;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
    ];
  }

  render() {
    const { children } = this.props;

    return <div className={selectorPrefix}>{children(this.getConfig())}</div>;
  }
}

TextFieldProperty.propTypes = {
  shape: PropTypes.object,
};

export default ComponentPropertyHOC(TextFieldProperty);
