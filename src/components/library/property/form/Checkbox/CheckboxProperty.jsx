import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import Checkbox from '../../propertyfield/checkbox/Checkbox';
import ToolTip from '../../propertyfield/tooltip/ToolTip';

import './CheckboxProperty.less';

const selectorPrefix = 'CheckboxProperty';

/**
 * CheckboxProperty
 * @class CheckboxProperty
 * @classdesc CheckboxProperty
 */
class CheckboxProperty extends React.PureComponent {
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
      disabled = false,
      required = false,
      checked = false,
      label = '',
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
        key: 'label',
        name: 'label',
        Component: (
          <ToolTip
            value={label}
            onChange={(v) => {
              const prop = shape.getProperty().prop;
              prop.label = v;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
      {
        key: 'checked',
        name: 'checked',
        Component: (
          <Checkbox
            label="checked"
            value={checked}
            onChange={(v) => {
              const prop = shape.getProperty().prop;
              prop.checked = v;
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

CheckboxProperty.propTypes = {
  shape: PropTypes.object,
};

export default ComponentPropertyHOC(CheckboxProperty);
