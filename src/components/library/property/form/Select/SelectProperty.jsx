import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import Checkbox from '../../propertyfield/checkbox/Checkbox';
import ToolTip from '../../propertyfield/tooltip/ToolTip';
import SelectOptions from '../../propertyfield/selectoptions/SelectOptions';

import './SelectProperty.less';

const selectorPrefix = 'SelectProperty';

/**
 * SelectProperty
 * @class SelectProperty
 * @classdesc SelectProperty
 */
class SelectProperty extends React.PureComponent {
  /**
   * getConfig
   * @return {*[]}
   */
  getConfig() {
    const {
      shape,
    } = this.props;

    const {
      tooltip = '',
      placeholder = '',
      disabled = false,
      required = false,
      value = '',
      data = [],
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
              const prop = shape.getProperty().prop;
              prop.tooltip = value;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
      {
        key: 'listitem',
        name: 'listitem',
        Component: (
          <SelectOptions
            value={{
              value,
              data,
            }}
            onChange={({ value: v, data: d }) => {
              const prop = shape.getProperty().prop;
              prop.value = v;
              prop.data = d;
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
              const prop = shape.getProperty().prop;
              prop.placeholder = v;
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
              const prop = shape.getProperty().prop;
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
              const prop = shape.getProperty().prop;
              prop.required = v;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
    ];
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <div className={selectorPrefix}>
        {children(this.getConfig())}
      </div>
    );
  }
}

SelectProperty.propTypes = {
  shape: PropTypes.object,
};

export default ComponentPropertyHOC(SelectProperty);
