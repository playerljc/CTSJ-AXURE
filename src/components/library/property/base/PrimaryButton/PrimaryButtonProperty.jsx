import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import Text from '../../propertyfield/text/Text';
import CheckBox from '../../propertyfield/checkbox/Checkbox';
import ToolTip from '../../propertyfield/tooltip/ToolTip';

import './PrimaryButtonProperty.less';

const selectorPrefix = 'PrimaryButtonProperty';

/**
 * PrimaryButtonProperty
 * @class PrimaryButtonProperty
 * @classdesc PrimaryButtonProperty
 */
class PrimaryButtonProperty extends React.PureComponent {
  /**
   * getConfig
   * @return {*[]}
   */
  getConfig() {
    const {
      shape,
    } = this.props;

    const {
      text,
      tooltip,
      disabled,
    } = shape.getProperty().prop;

    return [
      {
        key: 'Interaction',
        name: 'Interaction',
        Component: null,
      },
      {
        key: 'Text',
        name: 'Text',
        Component: (
          <Text
            value={text}
            onChange={(value) => {
              const prop = shape.getProperty().prop;
              prop.text = value;
              shape.setPropertyByProps('prop', prop);
            }}
          />
        ),
      },
      {
        key: 'disabled',
        name: 'disabled',
        Component: (
          <CheckBox
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

PrimaryButtonProperty.propTypes = {
  shape: PropTypes.object,
};

export default ComponentPropertyHOC(PrimaryButtonProperty);
