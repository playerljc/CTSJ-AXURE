import React from 'react';
import PropTypes from 'prop-types';

import ComponentPropertyHOC from '../../ComponentPropertyHOC';

import Text from '../../propertyfield/text/Text';
import ToolTip from '../../propertyfield/tooltip/ToolTip';

import './H2Property.less';

const selectorPrefix = 'H2Property';

/**
 * H2Property
 * @class H2Property
 * @classdesc H2Property
 */
class H2Property extends React.PureComponent {
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

H2Property.propTypes = {
  shape: PropTypes.object,
};

export default ComponentPropertyHOC(H2Property);
