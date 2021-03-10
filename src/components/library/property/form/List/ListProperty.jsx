import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import Checkbox from '../../propertyfield/checkbox/Checkbox';
import ToolTip from '../../propertyfield/tooltip/ToolTip';
import Number from '../../propertyfield/number/Number';
import SelectOptions from '../../propertyfield/selectoptions/SelectOptions';

import './ListProperty.less';

const selectorPrefix = 'ListProperty';

/**
 * ListProperty
 * @class ListProperty
 * @classdesc ListProperty
 */
class ListProperty extends React.PureComponent {
  /**
   * getConfig
   * @return {*[]}
   */
  getConfig() {
    const { shape } = this.props;

    const {
      tooltip = '',
      placeholder = '',
      disabled = false,
      required = false,
      value = '',
      size = 20,
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
            onChange={(v) => {
              const {prop} = shape.getProperty();
              prop.tooltip = v;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
      {
        key: 'size',
        name: 'size',
        Component: (
          <Number
            value={size}
            onChange={(v) => {
              const {prop} = shape.getProperty();
              prop.size = v;
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
              const {prop} = shape.getProperty();
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
              const {prop} = shape.getProperty();
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

ListProperty.propTypes = {
  shape: PropTypes.object,
};

export default ComponentPropertyHOC(ListProperty);
